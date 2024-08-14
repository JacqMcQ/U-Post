const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt"); 

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      async beforeUpdate(updatedUser) {
        if (updatedUser.password) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }
        return updatedUser;
      },
    },
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
