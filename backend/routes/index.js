const { register, login } = require("../controllers/Users");
const express = require("express");
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);

module.exports = routes;
