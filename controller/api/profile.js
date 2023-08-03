const dbController = require("../db/profile");

module.exports = {
  createProfile: async (req, res) => {
    const data = req.body;
    var profileId;

    try {
      profileId = await dbController.createProfile(data);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Oops! Something went wrong.",
      });
    }

    res.send({
      status: 200,
      message: "Profile is created successfully.",
      profileId,
    });
  },

  updateProfile: async (req, res) => {
    const data = req.body;

    try {
      await dbController.updateProfile(data);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Oops! Something went wrong.",
      });
    }

    res.send({
      status: 200,
      message: "Profile is updated successfully.",
    });
  },

  getProfile: async (req, res) => {
    const profileId = req.query.id;

    var profileData;
    try {
      profileData = await dbController.getProfile(profileId);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Oops! Something went wrong.",
      });
    }

    res.send({
      status: 200,
      profileData,
    });
  },
};
