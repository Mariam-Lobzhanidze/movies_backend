const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    vote_average: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
    tableName: "movies",
  }
);

module.exports = Movie;
