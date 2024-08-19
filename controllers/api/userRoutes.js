const router = require("express").Router();
const { User } = require("../../models");
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id; 
      res.redirect("/"); 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id; 
      res.redirect("/"); 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred during login." });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred during logout." });
      } else {
        res.redirect("/"); 
      }
    });
  } else {
    res.status(404).json({ message: "No active session found." });
  }
});

module.exports = router;
