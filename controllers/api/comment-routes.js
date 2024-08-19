const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const newComment = await Comment.create({
        content: req.body.content,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id,
      });
      res.status(200).json(newComment);
    } else {
      res.status(401).json({ message: "You must be logged in to comment." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
