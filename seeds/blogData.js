const { Blog } = require("../models");

const blogData = [
  {
    title: "The Future of Web Development",
    content:
      "Web development is evolving rapidly with new technologies and frameworks. This blog explores some of the latest trends and future directions...",
    user_id: 1,
  },
  {
    title: "Understanding Async/Await in JavaScript",
    content:
      "Async/await syntax simplifies working with asynchronous code in JavaScript. This blog explains how to use it effectively...",
    user_id: 2, 
  },
  
];

const seedBlogs = async () => {
  await Blog.bulkCreate(blogData);
};

module.exports = seedBlogs;
