const { User } = require("../models");

const userData = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
  },
  // Add more users as needed
];

const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

module.exports = seedUsers;
