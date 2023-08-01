const db = require("../../db/config");

module.exports = {
  registerUser: async (data) => {
    const res = await db.table("users").insert(data);

    return res;
  },

  loginUser: async (data) => {
    try {
      const res = await db.table("users").filter(data).get();
      console.log(res);

      return res == undefined ? false : true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
