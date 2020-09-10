const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const app = express();

db.sequelize.sync();             // force: true를 두면 매번 서버를 재시작 할 때마다 테이블을 지웠다가 다시 만듬 (배포시 false로 바꿔주기)
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());            //이 코드가 있어야 요청에서 온 json을 parsing 해서 req바디에 넣어준다
app.use(express.urlencoded({extended: false}));                //form에서 action을 통해서 전송을 할때, 그 데이터를 해석해서 req.body에 넣어준다
app.use(cookie('cookiesecret'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).send("hi backend");
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.post('/post', (req, res) => {
    if (req.isAuthenticated()) {

    }
})

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});