"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    static associate(models) {
      Likes.belongsTo(models.Blogs, { foreignKey: "blogsId", targetKey: "id" });
    }
  }

  Likes.init(
    {
      userId: DataTypes.STRING,
      blogsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Blogs", // Name of the referenced table
          key: "id", // Primary key of the referenced table
        },
      },
      liked: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );

  return Likes;
};
