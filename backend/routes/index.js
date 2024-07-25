const { register } = require("../controllers/Users");
const express = require("express");
const routes = express.Router();

routes.post("/register", register);

module.exports = routes
