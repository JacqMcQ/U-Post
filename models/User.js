const router = require('express').Router();
const { User, Project } = require('../models');

// Render login and signup form
router.get('/login', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/profile');
  } else {
    res.render('login');
  }
});

// Handle login form submission
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && user.checkPassword(req.body.password)) {
      req.session.user_id = user.id;
      res.redirect('/profile');
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handle signup form submission
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.user_id = newUser.id;
    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render profile page
router.get('/profile', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/login');
    return;
  }
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: [Project]
    });
    res.render('profile', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handle logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
