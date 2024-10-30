const express = require("express");
const PORT = 3000 || 2000;
const app = express();
const { DBConnect } = require("./Configure/Database");
const bodyparser = require("body-parser");
const AdminRoutes = require("./Routes/AdminRoutes");
const userRoutes = require("./Routes/userRoutes");

//middlewares
app.use(bodyparser.json());
app.use(express.json());
app.use("/Admin", AdminRoutes);
app.use("/User", userRoutes);

//start DB
DBConnect();

//listen Server
app.listen(PORT, () => {
  console.log("Sever Started at PORT no", PORT);
});

//get and send
app.get("/", (req, res) => {
  res.send(`SERVER STARTED AT PORT NO: ${PORT}`);
});
