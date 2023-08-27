const isCandidate = (req, res, next) => {
  if (req.session.user) {
    console.log("You are in candidate middleware");
    if (req.session.user.role == "candidate") {
      next();
    }
  } else {
    req.flash("error", "You are not authorized!");
    return res.redirect("/login");
  }
};

module.exports = isCandidate;
