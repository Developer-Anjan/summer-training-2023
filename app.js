require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hi, There.");
});

app.post("/basic-info", (req, res) => {
  console.log(req.body);
  res.send({
    status: 200,
    message: "Data recieved successfully.",
  });
});

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server running at http://${process.env.HOST_NAME}:${process.env.PORT}/`
  );
});
