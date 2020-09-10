const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport')
const app = express();

db.sequelize.sync({force: true});             // force: true를 두면 매번 서버를 재시작 할 때마다 테이블을 지웠다가 다시 만듬 (배포시 false로 바꿔주기)
passportConfig();

app.use(morgan('dev'));
app.use(cors('http://localhost:3000'));
app.use(express.json());            //이 코드가 있어야 요청에서 온 json을 parsing 해서 req바디에 넣어준다
app.use(express.urlencoded({extended: false}));                //form에서 action을 통해서 전송을 할때, 그 데이터를 해석해서 req.body에 넣어준다
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.status(200).send("hi backend");
});

app.post('/user', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({        //이메일을 담아줌
            where: {
                email: req.body.email,
            },
        });
        if (exUser) {     //이미 회원가입 되어있으면
            // return으로 응답을 한번만 보내는거 잊지 말기
            return res.status(400).json({           // 백엔드에 거절요청을 보냄 (잘못된 요청)
                errorCode: 1,                       // 에러 코드는 개발자가 커스텀 할 수 있음
                message: '이미 회원가입 되어있습니다.',
            });
        }
        const newUser = await db.User.create({
            email: req.body.email,
            password: hash,                 //db에 저장하기 전에 비밀번호 암호화하기
            nickname: req.body.nickname,
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        return next(err);
    }
});

const user = {
    'dgsdgsdgfsdgsdgf' : 1,
    'asdfsfdfsfsfsfsf': 2,
    'sfsfadfafaffaf' : 3,
};

app.post('/user/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (err) => {      // login의 역할은 session에다가 사용자 정보를 저장해줌 (어떻게? serializeUser)
            if(err){
                console.error(err);
                return next(err);
            }
            return res.json(user);
        })
    })(req, res, next);
});


app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});