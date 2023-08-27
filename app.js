require("dotenv").config();
const flash = require("@kanaqsasak/req-flash");
const session = require("express-session");
const express = require("express");
const cookie_parser = require("cookie-parser");
const multer = require("multer");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + file.originalname;
    cb(null, newFileName);
    console.log(file);
  },
});

const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", [
  "./views",
  "./views/admin",
  "./views/candidate",
  "./views/public",
]);
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);
app.use(cookie_parser());
app.use(flash());

const host = process.env.HOSTNAME;
const port = process.env.PORT || 3000;

// controllers
const frontEndController = require("./controller/frontEndController");
const backEndController = require("./controller/backEndController");

// middlewares
const isAdmin = require("./middleware/admin.middleware");
const isGuest = require("./middleware/guest.middleware");
const isCandidate = require("./middleware/candidate.middleware");

app.get("/", frontEndController.voting);
app.get("/login", isGuest, frontEndController.login);

app.get("/admin", isAdmin, frontEndController.adminDashboard);
app.get("/admin/candidates", isAdmin, frontEndController.getCandidates);
app.post(
  "/admin/candidates/update",
  isAdmin,
  backEndController.updateCandidate
);
app.post("/admin/candidates/add", isAdmin, backEndController.addCandidate);
app.get(
  "/admin/candidates/delete/:id",
  isAdmin,
  backEndController.deleteCandidate
);

app.get("/admin", isAdmin, frontEndController.adminDashboard);
app.get("/admin/posts", isAdmin, frontEndController.getPosts);
app.post("/admin/posts/update", isAdmin, backEndController.updatePost);
app.post("/admin/posts/add", isAdmin, backEndController.addPost);
app.get("/admin/posts/delete/:id", isAdmin, backEndController.deletePost);

app.get("/candidate", isCandidate, frontEndController.candidateDashboard);
app.post(
  "/candidate/profile/update",
  isCandidate,
  backEndController.updateProfile
);
app.post(
  "/upload-avatar",
  upload.single("avatar"),
  backEndController.uploadAvatar
);

app.post("/cast-vote", backEndController.castVote);

app.post("/login", backEndController.login);
app.get("/logout", backEndController.logout);
app.listen(port, () => {
  console.log(`Server started at ${host}:${port}`);
});
