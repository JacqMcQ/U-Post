const sequelize = require("../config/connection");
const seedUsers = require("./userData");
const seedBlogs = require("./blogData");
const seedComments = require("./commentData");

const seedDatabase = async () => {
  try {
    console.log("Synchronizing the database...");
    await sequelize.sync({ force: true });

    console.log("Seeding users...");
    await seedUsers();

    console.log("Seeding blogs...");
    await seedBlogs();

    console.log("Seeding comments...");
    await seedComments();

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    process.exit(0); 
  }
};

seedDatabase();
