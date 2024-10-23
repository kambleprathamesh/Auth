// import express from "express";
// import { userAuth } from "../Controllers/userController.js";
// import { Signup } from "../Controllers/userController.js";

const express = require("express");
const { Signup,Signin } = require("../Controllers/userController.js");
const router = express.Router();

router.post("/Signup", Signup);
router.post("/Signin",Signin);

module.exports = router;
