require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const userController = require("./controller/api/users");
const postController = require("./controller/api/post");
const profileController = require("./controller/api/profile");
const candidateController = require("./controller/api/candidate");

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hi, There.");
});

// user api
app.post("/api/user/register", userController.registerUser);
app.post("/api/user/login", userController.loginUser);

// post api
app.get("/api/posts", postController.getPosts);
app.get("/api/post", postController.getPost);
app.post("/api/post/create", postController.createPost);
app.put("/api/post/update", postController.updatePost);
app.delete("/api/post/delete", postController.deletePost);

// profile api
app.get("/api/profile/get", profileController.getProfile);
app.post("/api/profile/create", profileController.createProfile);
app.put("/api/profile/update", profileController.updateProfile);

// candidate api
app.get("/api/candidate/get", candidateController.getCandidate);
app.post("/api/candidate/create", candidateController.createCandidate);
app.put("/api/candidate/update", candidateController.updateCandidate);

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server running at http://${process.env.HOST_NAME}:${process.env.PORT}/`
  );
});
