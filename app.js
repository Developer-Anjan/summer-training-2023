require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.set("views", "./views");
app.set("view engine", "ejs");

const userController = require("./controller/api/users");
const postController = require("./controller/api/post");
const profileController = require("./controller/api/profile");
const candidateController = require("./controller/api/candidate");

const frontEndController = require("./controller/frontend/public");
const backEndController = require("./controller/backend/users");

const authMiddleware = require("./middleware/authRoute");

// user api
app.post("/api/user/register", userController.registerUser);
app.post("/api/user/login", userController.loginUser);

// post api
app.get("/api/posts", postController.getPosts);
app.get("/api/post", postController.getPost);
app.post("/api/post/create", authMiddleware, postController.createPost);
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

// frontend controllers
app.get("/", frontEndController.getHomePage);
app.get("/dashboard", frontEndController.getDashboardPage);

// backend controller
app.post("/user/login", backEndController.loginUser);

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server running at http://${process.env.HOST_NAME}:${process.env.PORT}/`
  );
});
