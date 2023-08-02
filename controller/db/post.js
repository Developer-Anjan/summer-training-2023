const db = require("../../db/config");

module.exports = {
  createPost: async (data) => {
    const post = await db.table("post").insert(data);
    console.log(post);
    return post.insertId;
  },

  updatePost: async (data) => {
    const res = await db
      .table("post")
      .filter({ id: data.id })
      .update(data.data);
    console.log(res);
    return true;
  },

  deletePost: async (id) => {
    const res = await db.table("post").filter({ id: id }).remove();
    console.log(res);
    return true;
  },

  getPosts: async () => {
    const res = await db.table("post").getAll();
    console.log(res);
    return res;
  },

  getPost: async (id) => {
    const res = await db.table("post").filter({ id: id }).get();
    console.log(res);
    return res;
  },
};
