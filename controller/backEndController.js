const md5 = require("md5");
const uuid = require("uuid");

const dbController = require("./dbController");

module.exports = {
  castVote: async (req, res) => {
    console.log(req.body);
    let data = req.body;
    const voterId = data.voter_id;

    delete data["voter_id"];

    data = JSON.stringify(data);

    try {
      const response = await dbController.castVote(data, voterId);

      req.flash("success", response.message);
      return ResizeObserverSize.redirect("back");
    } catch (error) {
      console.log(error);
      req.flash("error", "Your have already casted your vote.");
      return res.redirect("back");
    }
  },

  login: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      data["password"] = md5(data.password);

      const userData = await dbController.login(data);

      console.log(userData.user);

      if (!userData.success) {
        return res.redirect("back");
      }

      const sesObj = {
        id: userData.user.candidate_id,
        email: userData.user.email,
        role: userData.user.role,
      };

      req.session.user = sesObj;
      req.session.save();

      console.log(req.session);

      if (userData.user.role == "admin") {
        return res.redirect("/admin");
      }
      if (userData.user.role == "candidate") {
        return res.redirect("/candidate");
      }

      return res.redirect("/voting");
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  },

  logout: (req, res) => {
    req.session.destroy();

    return res.redirect("/login");
  },

  uploadAvatar: async (req, res) => {
    try {
      const user = req.session.user;

      const data = {
        id: user.id,
        photo: `/${req.file.filename}`,
      };

      const response = await dbController.uploadPhoto(data);
      req.flash("success", response.message);
      return res.redirect("/candidate");
    } catch (error) {
      onsole.log(error);
      req.flash("error", error);
      return res.redirect("/candidate");
    }
  },

  updateCandidate: async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
      const response = await dbController.updateCandidate(data);
      req.flash("success", response.message);
      return res.redirect("/admin/candidates");
    } catch (error) {
      req.flash("error", error);
    }
  },
  deleteCandidate: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await dbController.deleteCandidate(id);
      req.flash("success", response.message);
      return res.redirect("/admin/candidates");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/admin/candidates");
    }
  },
  addCandidate: async (req, res) => {
    let data = req.body;
    data["id"] = uuid.v4();
    data["password"] = md5("password");
    try {
      const response = await dbController.addCandidate(data);
      req.flash("success", response.message);
      return res.redirect("/admin/candidates");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/admin/candidates");
    }
  },

  updatePost: async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
      const response = await dbController.updatePost(data);
      req.flash("success", response.message);
      return res.redirect("/admin/posts");
    } catch (error) {
      req.flash("error", error);
    }
  },
  deletePost: async (req, res) => {
    const id = req.params.id;

    try {
      const response = await dbController.deletePost(id);
      req.flash("success", response.message);
      return res.redirect("/admin/posts");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/admin/posts");
    }
  },
  addPost: async (req, res) => {
    let data = req.body;

    try {
      const response = await dbController.addPost(data);
      req.flash("success", response.message);
      return res.redirect("/admin/posts");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/admin/posts");
    }
  },

  updateProfile: async (req, res) => {
    try {
      const data = req.body;
      console.log(req.body);
      console.log(data);

      const profile = await dbController.getProfileWithCandidateId(data.id);
      let response;
      if (profile == null) {
        response = await dbController.createProfile(data);
        console.log(response);
      } else {
        response = await dbController.updateProfile(data);
        console.log(response);
      }

      req.flash("success", response.message);
      return res.redirect("/candidate");
    } catch (error) {
      console.log(error);
      req.flash("error", error);
      return res.redirect("/candidate");
    }
  },
};
