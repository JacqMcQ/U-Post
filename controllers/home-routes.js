
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

    if (!dbBlogData) {
      return res.status(404).render("404"); 
    }

    const blog = dbBlogData.get({ plain: true });
    res.render("post", { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
  
  router.use((req, res) => {
    res.status(404).render("404"); // Renders 404.handlebars
  });
});

module.exports = router;
