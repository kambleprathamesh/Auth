const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtPass = "secrete";
exports.Signup = async (req, res) => {
  const { username, name, password } = req.body;

  //check
  if (!username || !name || !password) {
    return res.status(400).json({
      status: false,
      message: "Fill All details correctly",
    });
  }

  //check in the DB
  const existUser = await User.findOne({ email: username });
  if (existUser) {
    return res.status(400).json({
      status: false,
      message: "USer ALready Exist",
    });
  }

  //hash the password
  const hash = bcrypt.hashSync(password, 10);
  console.log("HASH PASS:", hash);
  //save in DB
  const addUser = new User({
    email: username,
    name: name,
    password: hash,
  });
  await addUser.save();
  return res.status(200).json({
    status: true,
    message: "User Aded Succesfully",
  });
};

exports.Signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check for empty values
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "All fiels are required",
      });
    }

    //check in db
    const existUser = await User.findOne({ email: username });
    if (!existUser) {
      return res.status(400).json({
        status: false,
        message: "User not Register",
      });
    }

    //verify password
    // const hashpass = await User.findOne(existUser._id.password);
    const verifyPass = bcrypt.compare(password, existUser.password);
    if (!verifyPass) {
      return res.status(400).json({
        status: false,
        message: "Password not match",
      });
    }

    //generate token
    const token = jwt.sign({ email: username }, jwtPass, { expiresIn: "1h" });
    return res.status(200).json({
      status: true,
      token,
      message: "LogedIn Succesfully",
    });
  } catch (error) {
    console.log(" Error in SignIn", error);
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};
