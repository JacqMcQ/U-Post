const router = require("express").Router();
const { Blog } = require("../models");
const authMiddleware = require("../utils/auth");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    console.log("Dashboard route hit");
    const userBlogs = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["createdAt", "DESC"]],
    });

    if (!userBlogs) {
      console.log("No blogs found for user:", req.session.user_id);
      res.status(404).json({ message: "No blogs found" });
      return;
    }

    const blogs = userBlogs.map((blog) => blog.get({ plain: true }));

    console.log("Blogs retrieved:", blogs);

    res.render("dashboard", {
      blogs,
      loggedIn: true,
    });
  } catch (err) {
    console.error("Error in dashboard route:", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!updatedBlog[0]) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json(err);
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
