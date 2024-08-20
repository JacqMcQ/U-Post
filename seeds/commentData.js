const { Comment } = require("../models");

const commentData = [
  {
    content: "This is a great article on web development!",
    blog_id: 1, // Make sure this blog ID exists
    user_id: 2, // Make sure this user ID exists
  },
  {
    content: "Thanks for the explanation on async/await!",
    blog_id: 2, // Make sure this blog ID exists
    user_id: 1, // Make sure this user ID exists
  },
  {
    content: "Looking forward to more articles like this.",
    blog_id: 1, // Make sure this blog ID exists
    user_id: 1, // Make sure this user ID exists
  },
 
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
