"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Blogs, {
        foreignKey: "blogsId",
        targetKey: "id",
      });
      Comments.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  Comments.init(
    {
      username: DataTypes.STRING,
      comment: DataTypes.STRING,
      blogsId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Blogs",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
