const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const bearar_token = req.headers.authorization.split(" ")[1];
  console.log(bearar_token);

  try {
    const decoded_token = jwt.verify(bearar_token, process.env.SECRET_KEY);
    console.log(decoded_token);
    next();
  } catch (error) {
    console.log(error);
    res.send({
      status: 400,
      message: "You are not authorized!",
    });
  }
};

module.exports = authMiddleware;
