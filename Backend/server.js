// const express = require("express");
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
const PORT=process.env.PORT|| 5000

const app = express();

app.listen(PORT, () => console.log("Sever started at Port no",PORT));
app.get("/", (req, res) => res.send(`Server Ready at Port no ${PORT}`));
