const passport = require('passport');
const bcrypt = require('bcrypt');
const {Strategy: LocalStrategy} = require('passport-local');
const db = require('../models');

module.export = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',             // req.body.email
        passwordField: 'password',        // req.body.password
    }, async (userId, password, done) => {
        try {
            const exUser = await db.User.findOne({where: {email}});
            if (!exUser) {            // 사용자가 존재하지 않을때
                return done(null, false, {reason: '존재하지 않는 사용자입니다.'});          //done(에러, 성공, 실패)
            }
            const result = await bcrypt.compare(password, exUser.password);     // 비밀번호 확인
            if (result) {     // 사용자가 존재하고, 비밀번호가 맞으면
                return done(null, exUser);
            } else {
                return done(null, false, { reason: '비밀번호가 틀립니다.' });
            }
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }));
};