const mongoose = require("mongoose");
const MONGODB_URL =
  "mongodb+srv://PrathmeshDB:Prathmesh19@cluster0.scrkvtg.mongodb.net/AUTH";

exports.DBConnect = () => {
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
