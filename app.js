require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const userController = require("./controller/api/users");
const postController = require("./controller/api/post");

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

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Server running at http://${process.env.HOST_NAME}:${process.env.PORT}/`
  );
});
