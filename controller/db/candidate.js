const db = require("../../db/config");

module.exports = {
  createCandidate: async (data) => {
    const countPost = await db
      .table("candidate")
      .filter({ post: data.post })
      .count();

    if (countPost == 2) {
      return {
        success: false,
        message: "Maximum no of candidate against a post is already assigned.",
      };
    }
    const res = await db.table("candidate").insert(data);
    console.log(res);
    return {
      success: true,
      res,
    };
  },
  updateCandidate: async (data) => {
    const res = await db
      .table("candidate")
      .filter({ id: data.id })
      .update(data.data);
    console.log(res);
    return true;
  },

  getCandidate: async (id) => {
    const res = await db.table("candidate").filter({ id: id }).get();
    console.log(res);
    return res;
  },
};
