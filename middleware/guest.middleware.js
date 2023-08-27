const isGuest = (req, res, next) => {
  console.log("You are in admin middleware");
  if (!req.session.user) {
    next();
  } else {
    req.flash("error", "You are already authorized!");
    res.redirect("back");
  }
};

module.exports = isGuest;
