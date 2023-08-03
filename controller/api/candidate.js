const uuid = require("uuid");
const dbController = require("../db/candidate");
const dbProfileController = require("../db/profile");
const dbPostController = require("../db/post");

module.exports = {
  createCandidate: async (req, res) => {
    const data = req.body;

    const id = uuid.v4();
    data["id"] = id;

    var dbResponse;

    try {
      dbResponse = await dbController.createCandidate(data);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Oops! Something went wrong.",
      });
    }

    if (!dbResponse.success) {
      res.send({
        status: 500,
        message: dbResponse.message,
      });
    }

    res.send({
      status: 200,
      message: "candidate is created successfully.",
      candidateId: id,
    });
  },

  updateCandidate: async (req, res) => {
    const data = req.body;

    try {
      await dbController.updateCandidate(data);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Oops! Something went wrong.",
      });
    }

    res.send({
      status: 200,
      message: "candidate is updated successfully.",
    });
  },

  getCandidate: async (req, res) => {
    const candidateId = req.query.id;
    console.log(candidateId);

    var candidateData;
    try {
      candidateData = await dbController.getCandidate(candidateId);

      const post = await dbPostController.getPost(candidateData.post);
      candidateData["post"] = post;

      const profile = await dbProfileController.getProfile(
        candidateData.profile
      );
      candidateData["profile"] = profile;
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Oops! Something went wrong.",
      });
    }

    res.send({
      status: 200,
      candidateData,
    });
  },
};
