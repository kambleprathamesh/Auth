const express = require("express");

const route = express.Router();

const { Signup } = require("../Controllers/Auth");

route.post("/Signup", Signup);

module.exports = route;
