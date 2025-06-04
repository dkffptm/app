# Node.js Bulletin Board API

This project provides a simple JSON API for user registration, login and logout.
It uses MySQL with `mysql2` and stores session information using `express-session`.
Passwords are hashed with `bcrypt`.

## Setup

1. Create a MySQL database and a `users` table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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