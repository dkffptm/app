# Node.js Bulletin Board API

This project provides a simple JSON API for a bulletin board. It includes
authentication and endpoints to create posts, comments and likes. Sessions use
`express-session` and passwords are hashed with `bcrypt`.

## Setup

1. Create a MySQL database and tables:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

    CREATE TABLE posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_like (post_id, user_id),
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
   ```
2. Copy `.env.example` to `.env` and set database credentials and session secret.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

The authentication routes are available under `/auth`:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`

The board endpoints are under `/posts`:
- `GET /posts` - list posts with pagination (`page` and `limit` query params)
- `GET /posts/:id` - view a single post with comments
- `POST /posts` - create post (auth required)
- `DELETE /posts/:id` - delete post (auth required, also removes comments and likes)
- `POST /posts/:id/comments` - add comment to a post (auth required)
- `DELETE /posts/comments/:id` - delete comment (auth required)
- `POST /posts/:id/likes` - like a post (auth required)
- `DELETE /posts/:id/likes` - remove like (auth required)
