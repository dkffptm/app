const db = require('../config/db');

async function createUser(username, password) {
  const [result] = await db.execute(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password]
  );
  return result.insertId;
}

async function findByUsername(username) {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

module.exports = { createUser, findByUsername };