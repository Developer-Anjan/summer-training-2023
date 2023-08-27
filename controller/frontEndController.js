const dbController = require("./dbController");

module.exports = {
  login: (req, res) => {
    console.log(req);
    return res.render("index", { msg: "" });
  },
  voting: async (req, res) => {
    // console.log(req.msg);

    try {
      let newCandidateData = [];
      let postsDetails = await dbController.getPosts();

      console.log(postsDetails);
      for (post of postsDetails.posts) {
        let response = await dbController.getCandidatesByPost(post.id);

        let formated_candidate_data = [];

        for (candidate of response.candidates) {
          const profileDetails = await dbController.getProfile(
            candidate.profile
          );

          const data = {
            name: candidate.name,
            post: {
              id: post.id,
              name: post.name,
            },
            photo: profileDetails.profile.photo,
            candidateId: candidate.id,
          };

          formated_candidate_data.push(data);
        }
        console.log(formated_candidate_data);
        const data = {
          postName: post.name,
          candidates: formated_candidate_data,
        };

        if (formated_candidate_data.length > 0) {
          newCandidateData.push(data);
        }
      }

      console.log(newCandidateData);
      return res.render("public/dashboard", {
        candidates: newCandidateData,
        message: req.flash(),
      });
    } catch (error) {
      console.log(error);
      req.flash("error", error);
      return res.render("public/dashboard", { message: req.flash() });
    }
  },

  candidateDashboard: async (req, res) => {
    console.log(req.session.user);

    try {
      let profile;
      const user = req.session.user;
      const candidateInfo = await dbController.getCandidate(user.id);
      const post = await dbController.getPost(candidateInfo.candidates.post);
      const profileId = candidateInfo.candidates.profile;

      if (profileId !== null) {
        profile = await dbController.getProfile(
          candidateInfo.candidates.profile
        );
      }

      const userInfo = {
        name: candidateInfo.candidates.name,
        post: post.post.name,
        image: profileId == null ? "" : profile.profile.photo,
        semester: profileId == null ? "" : profile.profile.semester,
        tagline: profileId == null ? "" : profile.profile.tagline,
        hasProfile: profileId === null ? false : true,
        id: user.id,
      };

      const votes = await dbController.getVotes();
      // console.log(votes);
      const countVotes = votes.filter((vote) => {
        console.log(vote);
        const newData = JSON.parse(vote.votes);
        const postName = userInfo.post.toLowerCase().replaceAll(" ", "_");
        return newData[postName] == user.id;
      });

      console.log(countVotes.length);

      console.log(profile, candidateInfo, post);
      console.log(userInfo);
      return res.render("candidate/dashboard", {
        userInfo,
        voteCount: countVotes.length,
      });
    } catch (error) {
      console.log(error);
      return res.back("/login");
    }
  },

  adminDashboard: (req, res) => {
    // console.log(=-dashboard");
    console.log(req.session.user);
    return res.render("admin/dashboard");
  },

  getCandidates: async (req, res) => {
    try {
      const data = await dbController.getCandidates();
      console.log(data);

      var candidates = data.candidates;

      for (const candidate of candidates) {
        console.log(candidate);
        let profileData;
        let postData;
        if (candidate.profile !== null) {
          profileData = await dbController.getProfile(candidate.profile);
        }

        if (candidate.post !== null) {
          postData = await dbController.getPost(candidate.post);
        }
        candidate.post =
          candidate.post !== null ? postData.post : candidate.post;
        candidate.profile =
          candidate.profile !== null ? profileData.profile : candidate.profile;

        console.log(candidate);
      }

      const postsData = await dbController.getPosts();
      var posts = [];
      if (postsData.success) {
        posts = postsData.posts;
      }

      console.log(candidates);
      console.log(posts);

      console.log(req.flash());
      return res.render("admin/candidate", {
        candidates,
        posts,
        message: req.flash(),
      });
    } catch (error) {
      console.log(error);
      return res.render("admin/candidate", {
        candidates,
        posts,
        message: req.flash(),
      });
    }
  },

  getPosts: async (req, res) => {
    try {
      const postsData = await dbController.getPosts();
      var posts = [];
      if (postsData.success) {
        posts = postsData.posts;
      }

      console.log(req.flash());
      return res.render("admin/post", {
        posts,
        message: req.flash(),
      });
    } catch (error) {
      console.log(error);
      return res.render("admin/post", {
        posts,
        message: req.flash(),
      });
    }
  },
};
