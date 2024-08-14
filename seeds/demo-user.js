module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@example.com",
        password: "adminpassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        email: "user1@example.com",
        password: "user1password",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
