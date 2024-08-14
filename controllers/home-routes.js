const router = require("express").Router();
const { User, Blog } = require("../models");
const authMiddleware = require("./utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("home", { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: [Blog],
    });
    res.render("profile", { user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
