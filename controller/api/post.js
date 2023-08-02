const postDbController = require("../db/post");

module.exports = {
  createPost: async (req, res) => {
    console.log(req.body);
    const data = {
      name: req.body.postName,
      acronym: req.body.accr,
    };
    var postId;
    try {
      postId = await postDbController.createPost(data);
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("ER_DUP_ENTRY")) {
        res.send({
          status: 400,
          message: "Ooops! Post name or accronym is already exists.",
        });
      }
      res.send({
        status: 500,
        message: "Something went wrong! Please try again after sometime.",
      });
    }

    res.send({
      status: 201,
      message: "Post is created successfully.",
      postId,
    });
  },

  updatePost: async (req, res) => {
    console.log(req.body);
    const data = {
      id: req.body.id,
      data: {
        name: req.body.postName,
        acronym: req.body.accr,
      },
    };
    var postId;
    try {
      postId = await postDbController.updatePost(data);
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("ER_DUP_ENTRY")) {
        res.send({
          status: 400,
          message: "Ooops! Post name or accronym is already exists.",
        });
      }
      res.send({
        status: 500,
        message: "Something went wrong! Please try again after sometime.",
      });
    }

    res.send({
      status: 200,
      message: "Post is updated successfully.",
    });
  },

  deletePost: async (req, res) => {
    console.log(req.body);

    try {
      postId = await postDbController.deletePost(req.body.id);
    } catch (error) {
      console.log(error.message);

      res.send({
        status: 500,
        message: "Something went wrong! Please try again after sometime.",
      });
    }

    res.send({
      status: 200,
      message: "Post is removed successfully.",
    });
  },

  getPosts: async (req, res) => {
    console.log(req.body);
    var posts;
    try {
      posts = await postDbController.getPosts();
    } catch (error) {
      console.log(error.message);

      res.send({
        status: 500,
        message: "Something went wrong! Please try again after sometime.",
      });
    }

    res.send({
      status: 200,
      posts,
    });
  },

  getPost: async (req, res) => {
    console.log(req.query);

    var post;
    try {
      post = await postDbController.getPost(req.query.postId);
    } catch (error) {
      console.log(error.message);

      res.send({
        status: 500,
        message: "Something went wrong! Please try again after sometime.",
      });
    }

    res.send({
      status: 200,
      post,
    });
  },
};
