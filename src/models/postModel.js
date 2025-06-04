const db = require('../config/db');

async function createPost(userId, title, content) {
  const [result] = await db.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result.insertId;
}

async function getPosts(limit, offset) {
  const [rows] = await db.execute(
    `SELECT p.*, 
            (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count
       FROM posts p
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  return rows;
}

async function findById(id) {
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
}

async function deletePost(id) {
  await db.execute('DELETE FROM posts WHERE id = ?', [id]);
}

module.exports = { createPost, getPosts, findById, deletePost };