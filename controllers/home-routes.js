
const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [User] },
      ],
    });

    const blog = dbBlogData.get({ plain: true });
    res.render("post", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
// In controllers/home-routes.js

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
