const isAdmin = (req, res, next) => {
  if (req.session.user) {
    console.log("You are in admin middleware");
    if (req.session.user.role == "admin") {
      next();
    }
  } else {
    req.flash("error", "You are not authorized!");
    return res.redirect("/login");
  }
};

module.exports = isAdmin;
