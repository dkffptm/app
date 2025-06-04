const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');

exports.createComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const commentId = await commentModel.createComment(postId, req.session.userId, content);
    res.status(201).json({ id: commentId });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Not found' });
    if (comment.user_id !== req.session.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await commentModel.deleteComment(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};