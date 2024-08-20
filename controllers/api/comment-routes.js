const router = require("express").Router();
const { Comment } = require("../../models");
const authMiddleware = require("../../utils/auth");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:blog_id", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        blog_id: req.params.blog_id,
      },
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
