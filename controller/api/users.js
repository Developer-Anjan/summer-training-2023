const uuid = require("uuid");
const md5 = require("md5");
const user = require("../db/users");

module.exports = {
  registerUser: async (req, res) => {
    console.log(req.body);

    const data = req.body;
    if (data.password.length < 6) {
      res.send({
        status: 500,
        message: "Password should have atleast 6 characters",
      });
    }

    if (data.password !== data.confirmPassword) {
      res.send({
        status: 500,
        message: "Password and Confirm Password are mismatched",
      });
    }

    data["id"] = uuid.v4();
    data["password"] = md5(data.password);
    delete data.confirmPassword;
    console.log(data);

    const dbRes = await user.registerUser(data);
    console.log(dbRes);

    res.send({
      status: 201,
      message: "User Registered Successfully",
    });
  },

  loginUser: async (req, res) => {
    try {
      console.log(req.body);
      const data = req.body;
      data["password"] = md5(data.password);

      const dbRes = await user.loginUser(data);

      if (!dbRes) {
        res.send({
          status: 400,
          message: "Login credential mismatched",
        });
      }

      res.send({
        status: 200,
        message: "Login Successfully",
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        message: "Something went wrong.",
      });
    }
  },
};
