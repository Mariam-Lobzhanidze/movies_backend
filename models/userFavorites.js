// models/UserFavorites.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Movie = require("./movieModel");

const UserFavorites = sequelize.define(
  "UserFavorites",
  {
    userId: {
      type: DataTypes.UUID,
      field: "UserId",
      references: {
        model: User,
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      field: "MovieId",
      references: {
        model: Movie,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "UserFavorites",
  }
);

module.exports = UserFavorites;
