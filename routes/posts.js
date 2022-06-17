const express = require('express');
const router = express.Router();
const post = require('../controllers/post/post');
const multer = require('../middlware/multerPost.js');

router.post('/',  post.createPost);
router.get('/',  post.getAllPosts );
router.put('/',  post.updatePost );
router.post('/getPosts',  post.getPostsByUserId );
router.post('/pic', multer.uploadFile);

module.exports = router;