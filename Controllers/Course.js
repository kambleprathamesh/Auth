const { User } = require("../Model/User");
const { Course } = require("../Model/User");

const createCourse = async (req, res) => {
  const { title, desc, price, imageLink } = req.body;

  //check for null
  if (!title || !desc || !price || !imageLink) {
    return res.status(400).json({
      status: false,
      message: "Fill al details",
    });
  }
  try {
    const addCourse = await Course.create({
      title,
      desc,
      imageLink,
      price,
    });

    return res.status(200).json({
      status: true,
      Course: addCourse,
      message: "Course Created Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Course not Created",
    });
  }
};

const purchaseCourse = async (req, res) => {
  console.log("CONTROL reaching here");
  const { courseId } = req.params;
  const userId = req.userId;
  console.log("USERID in purchase course", userId.toString());
  if (!courseId) {
    return res.status(400).json({
      message: "Course Id not Present",
    });
  }

  try {
    //update userScehma
    const coursePurchased = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { purchasedCourse: courseId },
      },
      {
        new: true,
      }
    ).populate("purchasedCourse");

    res.status(200).json({
      status: true,
      Course: coursePurchased.purchasedCourse,
      message: "Course Purchased",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Course Not Purchased",
    });
  }
};

// const purchaseCourse = async (req, res) => {
//     console.log("CONTROL reaching here");

//     const { courseId } = req.params;
//     const userId = req.userId;  // Assuming userId is correctly set in middleware

//     console.log("USERID in purchase course:", userId);
//     console.log("Course ID:", courseId);

//     // Check for null values
//     if (!courseId || !userId) {
//       return res.status(400).json({
//         status: false,
//         message: "Course ID or User ID not provided",
//       });
//     }

//     try {
//       // Update user schema with purchased course
//       const coursePurchased = await User.findOneAndUpdate(
//         { _id: userId },
//         {
//           $push: { purchasedCourse: courseId },
//         },
//         {
//           new: true,
//         }
//       ).populate("purchasedCourse");

//       if (!coursePurchased) {
//         return res.status(404).json({
//           status: false,
//           message: "User not found",
//         });
//       }

//       res.status(200).json({
//         status: true,
//         Course: coursePurchased.purchasedCourse,
//         message: "Course Purchased Successfully",
//       });
//     } catch (error) {
//       console.error("Error purchasing course:", error);
//       res.status(500).json({
//         status: false,
//         message: "Course Not Purchased due to an internal error",
//       });
//     }
//   };

const getCourses = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.json({
      message: "UserID not present",
    });
  }

  //find user
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) {
    return res.json({
      message: "User Not found",
    });
  }

  const foundPurchaseCourse = await Course.find({
    _id: { $in: foundUser.purchasedCourse },
  });

  return res.status(200).json({
    status: true,
    courses: foundPurchaseCourse,
    message: "Found Courses",
  });
};

module.exports = { createCourse, purchaseCourse ,getCourses};
