const express = require('express');

const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {     //GET /posts?offset=10&limit=10
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }],
            order: [['createdAt', 'DESC']],
            offset: parseInt(req.query.offset, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        });
        res.json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;