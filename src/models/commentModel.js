const db = require('../config/db');

async function createComment(postId, userId, content) {
  const [result] = await db.execute(
    'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
    [postId, userId, content]
  );
  return result.insertId;
}

async function getByPostId(postId) {
  const [rows] = await db.execute(
    'SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? ORDER BY c.created_at',
    [postId]
  );
  return rows;
}

async function findById(id) {
  const [rows] = await db.execute('SELECT * FROM comments WHERE id = ?', [id]);
  return rows[0];
}

async function deleteComment(id) {
  await db.execute('DELETE FROM comments WHERE id = ?', [id]);
}

async function deleteByPostId(postId) {
  await db.execute('DELETE FROM comments WHERE post_id = ?', [postId]);
}

module.exports = { createComment, getByPostId, findById, deleteComment, deleteByPostId };
