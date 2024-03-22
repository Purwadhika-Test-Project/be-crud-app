require("dotenv").config();

import express from "express";
import mysql from "mysql2/promise";
import UserRepository from "./src/gateways/userRepository";
import UserService from "./src/services/userService";
import AuthService from "./src/services/authService";
import ExpressAdapter from "./src/adapters/expressAdapter";
import JwtAdapter from "./src/adapters/jwtAdapter";

const app = express();

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const jwtSecret = process.env.JWT_SECRET;
const jwtAdapter = new JwtAdapter(jwtSecret);
const authService = new AuthService(userRepository, jwtSecret);
const expressAdapter = new ExpressAdapter(app, authService, userService);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
