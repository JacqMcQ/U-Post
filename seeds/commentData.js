const { Comment } = require("../models");

const commentData = [
  {
    text: "This is a great article on web development!",
    user_id: 2,
    blog_id: 1,
  },
  {
    text: "I found the explanation of async/await very helpful.",
    user_id: 1,
    blog_id: 2,
  },
  {
    text: "Looking forward to more articles like this.",
    user_id: 1,
    blog_id: 1,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
