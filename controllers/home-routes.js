const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blog = await blog.findAll();
    res.render('home', { Blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (Blog) {
      res.render('blog', { Blog });
    } else {
      res.status(404).send('blog post not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
