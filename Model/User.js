const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  role: {
    type: String,
    require: true,
  },
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: tru,
  },
  price: {
    type: Number,
    require: true,
  },
  imageLink: {
    type: String,
    require: true,
  },
});

module.exports = {
  Admin: mongoose.model("Admin", AdminSchema),
  User: mongoose.model("User", UserSchema),
  Course: mongoose.model("course", CourseSchema),
};
