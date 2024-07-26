const express = require("express");
const { register, login, getUser } = require("../controllers/Users");
const authenticateToken = require("../middlewares/verifyJWT");

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/getUser", authenticateToken, getUser);

module.exports = routes;
