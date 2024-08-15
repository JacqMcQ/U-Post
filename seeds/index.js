const sequelize = require("../config/connection");
const { User, Blog } = require("../models");

const userData = require("./user-seeds.json");
const blogData = require("./blog-seeds.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    console.log("Database synced");

    // Seed users
    await User.bulkCreate(userData, {
      individualHooks: true, // If you want to hash passwords
      returning: true,
    });

    console.log("Users seeded");

    // Seed blogs
    await Blog.bulkCreate(blogData);

    console.log("Blogs seeded");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
