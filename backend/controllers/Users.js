const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const duplicate = await Employee.findOne({ username }).exec();
  if (duplicate) return res.status(400).json({ message: "Username alredy exist!" });
  if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match!" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const result = await Employee.create({
      username: username,
      password: hashedPwd,
    });
    console.log(result);
    res.status(201).json({ message: "User has been created!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password are required." });

  const foundUser = await Employee.findOne({ username }).exec();
  if (!foundUser) return res.status(401).json({ message: "Invalid username or password" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Invalid username or password" });

  // JWT
  const accessToken = jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
  const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();
  console.log(result);
  res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });

  res.json({ accessToken });
};

const logOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;
  const foundUser = await Employee.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);
};

const getUser = async (req, res) => {
  try {
    const user = await Employee.findOne({ username: req.user.username }).exec();
    if (!user) return res.sendStatus(404);
    res.json({ username: user.username });
  } catch (err) {
    if (err) return res.sendStatus(404);
  }
};

module.exports = { register, login, logOut, getUser };
