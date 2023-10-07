const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = {
  create,
  login,
  checkToken,
};

const create = async(req, res) =>{
  try {
    const user = await User.create(req.body);
    console.log(user)
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

const login = async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT({
        message: "Login successfully",
        data: user,
        error: null,
    }));
  } catch (err) {
    console.log(err);
    res
        .status(400)
        .json({
            message: "Bad Credentials",
            data: null,
            error: err,
        });
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
