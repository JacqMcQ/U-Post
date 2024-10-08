const router = require("express").Router();
const { Blog } = require("../../models");
const authMiddleware = require("../../utils/auth");

router.use(authMiddleware);

router.get("/create", (req, res) => {
  if (req.session.loggedIn) {
    res.render("create-blog");
  } else {
    res.redirect("/login");
  }
});

router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
