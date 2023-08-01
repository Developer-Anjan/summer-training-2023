require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const userController = require("./controller/api/users");

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hi, There.");
});

app.post("/api/user/register", userController.registerUser);
app.post("/api/user/login", userController.loginUser);

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server running at http://${process.env.HOST_NAME}:${process.env.PORT}/`
  );
});
