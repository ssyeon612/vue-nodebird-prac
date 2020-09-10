const express = require('express');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/images', isLoggedIn, (req, res) => {        // 게시글을 작성한다        POST /post

});

router.post('/', isLoggedIn, (req, res) => {

});

module.exports = router;