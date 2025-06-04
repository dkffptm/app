const postModel = require('../models/postModel');
const commentModel = require('../models/commentModel');
const likeModel = require('../models/likeModel');

exports.listPosts = async (req, res, next) => {
  try {
    const allowed = [10, 20, 30, 40, 50];
    let limit = parseInt(req.query.limit, 10);
    if (!allowed.includes(limit)) limit = 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;
    const posts = await postModel.getPosts(limit, offset);
    res.json({ page, limit, posts });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    const comments = await commentModel.getByPostId(id);
    post.comments = comments;
    post.like_count = await likeModel.countByPostId(id);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }
    const userId = req.session.userId;
    const postId = await postModel.createPost(userId, title, content);
    res.status(201).json({ id: postId });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.user_id !== req.session.userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await commentModel.deleteByPostId(id);
    await likeModel.deleteByPostId(id);
    await postModel.deletePost(id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};
