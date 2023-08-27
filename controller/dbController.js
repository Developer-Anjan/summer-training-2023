const db = require("../config/db");

module.exports = {
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .table("users")
          .filter({ email: data.email, password: data.password })
          .get();

        if (!user) {
          return reject({
            success: false,
            message: "user not found",
          });
        }

        return resolve({
          success: true,
          user,
        });
      } catch (error) {
        console.log(error);
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  getCandidates: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const candidates = await db.table("candidate").getAll();
        return resolve({
          success: true,
          candidates,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  getCandidatesByPost: (postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const candidates = await db
          .table("candidate")
          .filter({ post: postId })
          .getAll();
        return resolve({
          success: true,
          candidates,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  getCandidate: (candidateId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const candidates = await db
          .table("candidate")
          .filter({ id: candidateId })
          .get();
        return resolve({
          success: true,
          candidates,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  updateCandidate: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .table("candidate")
          .filter({ id: data.id })
          .update({ name: data.name, post: data.post });
        return resolve({
          success: true,
          message: "updated successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  deleteCandidate: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.table("candidate").filter({ id: id }).remove();
        return resolve({
          success: true,
          message: "Candidate removed successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  addCandidate: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.table("users").insert({
          id: data.id,
          email: data.email,
          password: data.password,
        });

        const response = await db.table("candidate").insert({
          id: data.id,
          name: data.name,
          post: data.post,
          user_id: data.id,
        });

        await db
          .table("users")
          .filter({ id: data.id })
          .update({ candidate_id: data.id });

        return resolve({
          success: true,
          message: "Candidate removed successfully",
          response,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  getPosts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const posts = await db.table("post").getAll();
        if (!posts) {
          return reject({
            success: false,
            message: "Please create post first",
          });
        }

        return resolve({
          success: true,
          posts,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  getPost: (postId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await db.table("post").filter({ id: postId }).get();

        if (!post) {
          return reject({
            success: false,
            message: "post not found",
          });
        }

        return resolve({
          success: true,
          post,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  updatePost: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .table("post")
          .filter({ id: data.id })
          .update({ name: data.name, acronym: data.acronym });
        return resolve({
          success: true,
          message: "updated successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  deletePost: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.table("post").filter({ id: id }).remove();
        return resolve({
          success: true,
          message: "Post removed successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  addPost: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await db.table("post").insert({
          name: data.name,
          acronym: data.acronym,
        });
        return resolve({
          success: true,
          message: "Post added successfully",
          response,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  getProfile: (profileId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await db
          .table("profile")
          .filter({ id: profileId })
          .get();

        if (!profile) {
          return resolve(null);
        }

        return resolve({
          success: true,
          profile,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  getProfileWithCandidateId: (candidateId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await db
          .table("profile")
          .filter({ candidate_id: candidateId })
          .get();

        if (!profile) {
          return resolve(null);
        }

        return resolve({
          success: true,
          profile,
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  updateProfile: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.table("profile").filter({ candidate_id: data.id }).update({
          tagline: data.slogan,
          semester: data.semester,
        });
        return resolve({
          success: true,
          message: "updated successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },
  createProfile: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await db.table("profile").insert({
          photo: data.photo,
          tagline: data.slogan,
          semester: data.semester,
          candidate_id: data.id,
        });

        await db
          .table("candidate")
          .filter({ id: data.id })
          .update({ profile: profile.insertId });

        console.log(profile);
        return resolve({
          success: true,
          message: "created successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  uploadPhoto: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.table("profile").filter({ candidate_id: data.id }).update({
          photo: data.photo,
        });
        return resolve({
          success: true,
          message: "photo uploaded successfully",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  castVote: (data, voterId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const vote = await db.table("votes").insert({
          votes: data,
          voter_id: voterId,
        });

        console.log(vote);

        return resolve({
          success: true,
          message: "You have successfully cast your vote",
        });
      } catch (error) {
        return reject({
          success: false,
          message: error,
        });
      }
    });
  },

  getVotes: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const votes = await db.table("votes").withFields(["votes"]).getAll();
        return resolve(votes);
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  },
};
