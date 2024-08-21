// Controllers/api/comment-routes.js
const router = require("express").Router();
const { Comment } = require("../../models");
const authMiddleware = require("../../utils/auth");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { content, blog_id } = req.body;

    if (!content || !blog_id) {
      return res.status(400).json({ message: "Content and blog ID required" });
    }

    const newComment = await Comment.create({
      content: content,
      blog_id: blog_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
