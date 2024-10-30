const mongoose = require("mongoose");
const MONGODB_URL =
  "mongodb+srv://PrathmeshDB:PrathmeshDB@cluster0.scrkvtg.mongodb.net/NewAuth";

const DBConnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      {
        console.log("DB  Connected Succesfully");
      }
    })
    .catch((err) => {
      console.error("Error is DB Connection", err);
    });
};


module.exports={DBConnect}