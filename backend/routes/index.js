const express = require("express");
const { register, login, logout, getUser } = require("../controllers/Users");
const authenticateToken = require("../middlewares/verifyJWT");
const refreshToken = require("../controllers/refreshToken");

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/token", refreshToken);
routes.get("/getUser", authenticateToken, getUser);
routes.delete("/logout", logout);

module.exports = routes;
