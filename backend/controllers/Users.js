const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");

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

module.exports = { register };
