const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users", // Ensure this matches the name of the User model/table
        key: "id",
      },
      onDelete: "CASCADE",
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogs", // Check that this matches your Blog model's table name
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = Comment;
