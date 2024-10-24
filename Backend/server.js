const express = require("express");
const {middle2} = require("./Middlewares/middle1");
// const  = require("./Middlewares/middle1");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5002;

const userRoutes = require("./Routes/userRoutes");
const ConnectDB = require("./Configure/Database").DBConnect;

app.use("/api/v1/user", userRoutes);

// app.use(middle1);
app.use(middle2);

app.get("/ride1", (req, res) => {
  res.json({
    message: "You can ride the ride 1",
  });
});

app.get("/ride2", (req, res) => {
  res.json({
    message: "Yopu can Ride the ride 2",
  });
});

app.get("/ride3", (req, res) => {
  res.json({
    message: "Yopu can Ride the ride 3",
  });
});

// app.use((err, req, res, next) => {
//   res.status(400).send("Something went wrong");
// });
ConnectDB();

app.listen(PORT, () => {
  console.log("Sever Started At port no:", PORT);
});
