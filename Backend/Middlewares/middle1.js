const express = require("express");
const app = express();

//make middleware to count the number of resquest heating on endpoints
let reqCount = 0;
let userNumberRequest = {};

// const middle1 = (req, res, next) => {
//   reqCount++;
//   next();
// };


setInterval(() => {
  userNumberRequest = {};
}, 60000);
const middle2 = (req, res, next) => {
  const userId = req.headers["userid"];

  if (userNumberRequest[userId]) {
    if (userNumberRequest[userId] > 3) {
      res.send({
        message: "No Entry",
      });
    } else {
      userNumberRequest[userId]++;
    }
  } else {
    userNumberRequest[userId] = 1;
  }
  next();
};
module.exports = { middle2 };
