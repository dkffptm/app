const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', postController.listPosts);
router.get('/:id', postController.getPost);
router.post('/', isAuthenticated, postController.createPost);
router.delete('/:id', isAuthenticated, postController.deletePost);

router.post('/:id/comments', isAuthenticated, commentController.createComment);
router.delete('/comments/:id', isAuthenticated, commentController.deleteComment);

router.post('/:id/likes', isAuthenticated, likeController.likePost);
router.delete('/:id/likes', isAuthenticated, likeController.unlikePost);

module.exports = router;