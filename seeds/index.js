const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedBlogs = require("./blogData");
const seedComments = require("./commentData");

const seedDatabase = async () => {
  try {
    // Sync and reset the database
    console.log("Synchronizing the database...");
    await sequelize.sync({ force: true });

    // Seed users first
    console.log("Seeding users...");
    await seedUsers();

    // Seed blogs after users
    console.log("Seeding blogs...");
    await seedBlogs();

    // Seed comments after blogs
    console.log("Seeding comments...");
    await seedComments();

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    process.exit(0); // Exit the process after seeding
  }
};

// Execute the seeding process
seedDatabase();
