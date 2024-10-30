const express = require("express");
const bcrypt = require("bcrypt");
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

module.exports = { Signup };
