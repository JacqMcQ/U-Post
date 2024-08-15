const router = require("express").Router();
const { User, Blog} = require("../../models");
const authMiddleware = require("../utils/auth");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
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
