const { User } = require("../Model/User");
const jwt = require("jsonwebtoken");
const Secret = "Prathmesh";
const isAdmin = async (req, res, next) => {
  const { token } = req.headers;
  console.log("controll reaching here");
  //check token
  if (!token) {
    return res.status(400).json({
      status: false,
      message: "Token is Missing",
    });
  }

  //verify token

  try {
    console.log("controll reaching in trycatch");

    const VerifiedToken = jwt.verify(token, Secret);
    console.log("VerifiedToken isAdmin", VerifiedToken);
    const user = await User.findOne({ email: VerifiedToken.email });
    console.log("USER IN isAdmin", user);
    if (
      !user ||
      (VerifiedToken.userid != user._id.toString() &&
        VerifiedToken.role != "admin")
    ) {
      return res.status(404).json({
        status: false,
        message: "User is not Admin ",
      });
    }
    console.log("VerifiedToken.userId", VerifiedToken.userId);
    req.userId = VerifiedToken.userId;
    next();
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: "Token Invalid",
    });
  }
};

const isUser = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    return res.status(400).json({
      status: false,
      message: "token is missing",
    });
  }

  try {
    //verify token
    const VerifiedToken = jwt.verify(token, Secret);
    console.log("VerifiedToken", VerifiedToken);
    //find user
    const user = await User.findOne({ email: VerifiedToken.email });

    if (
      !user ||
      (VerifiedToken.userId != user._id.toString() &&
        VerifiedToken.role != "user")
    ) {
      return res.status(404).json({
        status: false,
        message: "User not is Not User",
      });
    }
    console.log("VerifiedToken.userid", VerifiedToken.userId);
    req.userId = VerifiedToken.userId;
    next();
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: "Toekn in valid",
    });
  }
};
module.exports = { isAdmin, isUser };
