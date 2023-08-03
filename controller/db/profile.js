const db = require("../../db/config");

module.exports = {
  createProfile: async (data) => {
    const res = await db.table("profile").insert(data);
    console.log(res);
    return res.insertId;
  },
  updateProfile: async (data) => {
    const res = await db
      .table("profile")
      .filter({ id: data.id })
      .update(data.data);
    console.log(res);
    return true;
  },
  getProfile: async (id) => {
    const res = await db
      .table("profile")
      .filter({ id: id })
      .withFields(["photo", "tagline", "semester"])
      .get();
    console.log(res);
    return res;
  },
};
