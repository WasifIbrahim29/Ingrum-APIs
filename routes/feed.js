const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);


router.get('/poster', feedController.getPoster);

// POST /feed/post
router.post('/post', feedController.createPost);

module.exports = router;