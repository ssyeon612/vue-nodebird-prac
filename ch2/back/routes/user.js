const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/')

router.post('/', isNotLoggedIn, async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({        //이메일을 담아줌
            where: {
                email: req.body.email,
            },
        });
        if (exUser) {     //이미 회원가입 되어있으면
            // return으로 응답을 한번만 보내는거 잊지 말기
            return res.status(403).json({           // 백엔드에 거절요청을 보냄 (잘못된 요청)
                errorCode: 1,                       // 에러 코드는 개발자가 커스텀 할 수 있음
                message: '이미 회원가입 되어있습니다.',
            });
        }
        await db.User.create({
            email: req.body.email,
            password: hash,                 //db에 저장하기 전에 비밀번호 암호화하기
            nickname: req.body.nickname,
        });
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                return res.json(user);
            })
        })(req, res, next);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

    router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (err) => {      // login의 역할은 session에다가 사용자 정보를 저장해줌 (어떻게? serializeUser)
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {          // 실제 주소는 /usre/logout
    if (req.isAuthenticated()) {
        req.logout();
        req.session.destroy();       // 선택사항
        return res.status(200).send('로그아웃 되었습니다.');
    }
});


module.exports = router;