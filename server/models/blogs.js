"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    static associate(models) {
      Blogs.hasMany(models.Likes, { foreignKey: "blogsId" });
      Blogs.hasMany(models.Comments, { foreignKey: "blogsId" });
    }
  }

  Blogs.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.STRING,
      image: DataTypes.STRING,
      liked: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Blogs",
    }
  );

  return Blogs;
};
