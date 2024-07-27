const jwt = require("jsonwebtoken");
const Employee = require("../model/Employee");

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["jwt"];
    if (!refreshToken) return res.sendStatus(401);

    const findUser = await Employee.findOne({ refreshToken: refreshToken });
    if (!findUser) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); // Forbidden if token verification fails
      const username = decoded.username;
      const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
      res.json({ accessToken });
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal error
  }
};

module.exports = refreshToken;
