require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const jwtSecret = require("./generateJwt");

const UserRepository = require("./src/gateways/userRepository");
const UserService = require("./src/services/userService");
const AuthService = require("./src/services/authService");
const ExpressAdapter = require("./src/adapters/expressAdapters");
const JwtAdapter = require("./src/adapters/jwtAdapters");

async function startServer() {
  const app = express();

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  const userRepository = new UserRepository(db);
  const userService = new UserService(userRepository);
  const jwtAdapter = new JwtAdapter(jwtSecret);
  const authService = new AuthService(userRepository, jwtSecret);
  const expressAdapter = new ExpressAdapter(app, authService, userService);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
