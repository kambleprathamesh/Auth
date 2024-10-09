// const express = require("express");
import express from "express"
import { userAuth } from "../Controllers/userController.js";
const router = express.Router();
// const useAuth= require("./Controllers/userControllers.js");


router.post("/auth",userAuth);
export default router;