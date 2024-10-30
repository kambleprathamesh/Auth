const express = require("express");

const route = express.Router();
const { Signup, Signin } = require("../Controllers/Auth");
const { isUser } = require("../Middlewares/Auth");
const { purchaseCourse, getCourses } = require("../Controllers/Course");
route.post("/Signup", Signup);
route.post("/Sigin", Signin);
route.post("/BuyCourse/:courseId", isUser, purchaseCourse);
route.get("/getCourses", isUser, getCourses);

module.exports = route;
