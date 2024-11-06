const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Movie = require("./movieModel");

const UserWatchlist = sequelize.define("UserWatchlist", {
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
  },
  movieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movie,
      key: "id",
    },
  },
});

module.exports = UserWatchlist;
