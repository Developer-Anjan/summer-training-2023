module.exports = {
  getHomePage: (req, res) => {
    res.render("index");
  },
  getDashboardPage: (req, res) => {
    res.render("dashboard", { email: req.query.email });
  },
};
