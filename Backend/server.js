// const express = require("express");
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import userRoutes from "./Routes/userRoutes.js"
const PORT=process.env.PORT|| 5000

const app = express();
app.use("/api/user",userRoutes)
app.listen(PORT, () => console.log("Sever started at Port no",PORT));
app.get("/", (req, res) => res.send(`Server Ready at Port no ${PORT}`));
