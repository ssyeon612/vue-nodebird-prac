const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('./models');
const app = express();

db.sequelize.sync();

app.use(cors('http://localhost:3000'));
app.use(express.json());            //이 코드가 있어야 요청에서 온 json을 parsing 해서 req바디에 넣어준다
app.use(express.urlencoded({extended: false}));                //form에서 action을 통해서 전송을 할때, 그 데이터를 해석해서 req.body에 넣어준다

app.get('/', (req, res) => {
    res.state(200).send("hi backend");
});

app.post('/user', async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            email: req.body.email,
            password: hash,                 //db에 저장하기 전에 비밀번호 암호화하기
            nickname: req.body.nickname,
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});