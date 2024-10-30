const express = require("express");

const route = express.Router();
const { Signup, Signin } = require("../Controllers/Auth");
const { isAdmin, isUser } = require("../Middlewares/Auth");
const { createCourse } = require("../Controllers/Course");
route.post("/Signup", Signup);
route.post("/Sigin", Signin);
route.post("/createCourse", isAdmin, createCourse);

module.exports = route;
