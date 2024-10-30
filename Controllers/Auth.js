const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret = "Prathmesh";
const { User } = require("../Model/User");
const { Course } = require("../Model/User");

const Signup = async (req, res) => {
  const { email, password, role } = req.body;

  //check for null
  if (!email || !password || !role) {
    return res.status(400).json({
      status: false,
      message: "Please fill all details",
    });
  }
  try {
    //check user in DB
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({
        status: false,
        message: "USer Already Exist",
      });
    }

    //hash the password if user not exist
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("HAsh pass", hashPassword);

    //make entry in the DB
    const addUser = new User({
      email,
      password: hashPassword,
      role,
    });

    await addUser.save();
    return res.status(200).json({
      status: true,
      message: "User Registered Succesfully",
    });
    //
  } catch (error) {
    console.error("Error while making entry in the DB", error);
    return res.status(500).json({
      status: false,
      message: "User Not Registered",
    });
  }
};

const Signin = async (req, res) => {
  const { email, password } = req.body;

  //check for null
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "plase fill all details",
    });
  }

  try {
    //check in DB
    const userExit = await User.findOne({
      email,
    });

    if (!userExit) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    //compare the passord
    const comparePass = bcrypt.compare(password, userExit.password);
    if (!comparePass) {
      return res.status(404).json({
        status: false,
        message: "Password Not match",
      });
    }

    const userId = userExit._id;
    const role = userExit.role;
    const payload = {
      userId,
      email,
      role,
    };

    // create jwt token
    const jwtToken = jwt.sign(payload, Secret);
    console.log("JWT TOKEN", jwtToken);

    //update the userschemaa for token
    await User.findOneAndUpdate(
      { email: userExit.email },
      {
        $push: { token: jwtToken.toString() },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: true,
      jwtToken,
      message: "Sigin Succefully",
    });
  } catch (error) {
    console.error("Error n in Sigin", error);
    res.status(500).json({
      status: false,
      message: "Internal server Error",
    });
  }
};

module.exports = { Signup, Signin };
