const { Comment } = require("../models");

const commentData = [
  {
    content: "Great insights on web development trends!",
    blog_id: 1, 
    user_id: 2, 
  },
  {
    content: "Thanks for the explanation on async/await!",
    blog_id: 2, 
    user_id: 1, 
  },
  {
    content: "Looking forward to more posts on this topic.",
    blog_id: 1, 
    user_id: 1, 
  },
  
];

const seedComments = async () => {
  await Comment.bulkCreate(commentData);
};

module.exports = seedComments;
