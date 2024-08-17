const { Comment } = require("../models");

const commentData = [
  {
    content: "Great insights on web development trends!",
    blog_id: 1, // Make sure this blog ID exists
    user_id: 2, // Make sure this user ID exists
  },
  {
    content: "Thanks for the explanation on async/await!",
    blog_id: 2, // Make sure this blog ID exists
    user_id: 1, // Make sure this user ID exists
  },
  {
    content: "Looking forward to more posts on this topic.",
    blog_id: 1, // Make sure this blog ID exists
    user_id: 1, // Make sure this user ID exists
  },
  // Add more comments as needed
];

const seedComments = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComments;
