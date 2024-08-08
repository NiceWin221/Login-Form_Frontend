const express = require("express");
const { register, login, logout, getUser } = require("../controllers/Users");
const authenticateToken = require("../middlewares/verifyJWT");
const refreshToken = require("../controllers/refreshToken");
const { saveMovie, getSavedMovie, unsaveMovie, checkSavedMovie } = require("../controllers/Bookmark");

const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/token", refreshToken);
routes.get("/getUser", authenticateToken, getUser);
routes.delete("/logout", logout);
routes.post("/saveMovie", authenticateToken, saveMovie);
routes.get("/getSavedMovie", authenticateToken, getSavedMovie);
routes.get("/unsaveMovie", authenticateToken, unsaveMovie);
routes.get("/checkSavedMovie", authenticateToken, checkSavedMovie);

module.exports = routes;
