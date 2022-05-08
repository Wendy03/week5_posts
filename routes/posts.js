const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');

router.get('/', PostsControllers.getPosts);
router.post('/', PostsControllers.createPost);
router.delete('/', PostsControllers.deletePosts);
router.delete('/:id', PostsControllers.deleteOnePost);
router.patch('/:id', PostsControllers.editPost);

module.exports = router;
