const db = require('../config/db');

async function addLike(postId, userId) {
  await db.execute(
    'INSERT IGNORE INTO likes (post_id, user_id) VALUES (?, ?)',
    [postId, userId]
  );
}

async function removeLike(postId, userId) {
  await db.execute(
    'DELETE FROM likes WHERE post_id = ? AND user_id = ?',
    [postId, userId]
  );
}

async function deleteByPostId(postId) {
  await db.execute('DELETE FROM likes WHERE post_id = ?', [postId]);
}

async function countByPostId(postId) {
  const [rows] = await db.execute('SELECT COUNT(*) AS cnt FROM likes WHERE post_id = ?', [postId]);
  return rows[0].cnt;
}
module.exports = { addLike, removeLike, deleteByPostId, countByPostId };