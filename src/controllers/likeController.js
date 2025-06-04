const likeModel = require('../models/likeModel');
const postModel = require('../models/postModel');

exports.likePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    await likeModel.addLike(postId, req.session.userId);
    res.json({ message: 'Liked' });
  } catch (err) {
    next(err);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    await likeModel.removeLike(postId, req.session.userId);
    res.json({ message: 'Unliked' });
  } catch (err) {
    next(err);
  }
};