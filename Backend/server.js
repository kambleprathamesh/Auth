const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT||5002;

const userRoutes = require("./Routes/userRoutes");
const ConnectDB = require("./Configure/Database").DBConnect;
app.use("/api/v1/user", userRoutes); 

ConnectDB();

app.listen(PORT, () => {
  console.log("Sever Started At port no:", PORT);
});
