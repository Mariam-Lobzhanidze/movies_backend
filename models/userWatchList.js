const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Movie = require("./movieModel");

const UserWatchlist = sequelize.define(
  "UserWatchlist",
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
    tableName: "UserWatchlist",
  }
);

module.exports = UserWatchlist;
