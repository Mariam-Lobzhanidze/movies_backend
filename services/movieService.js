const User = require("../models/userModel");
const Movie = require("../models/movieModel");

const addToFavorites = async (userId, movieId) => {
  const user = await User.findByPk(userId);
  const movie = await Movie.findByPk(movieId);

  if (!user || !movie) {
    throw new Error("User or Movie not found");
  }

  await user.addFavorite(movie);
  return "Movie added to favorites";
};

const removeFromFavorites = async (userId, movieId) => {
  const user = await User.findByPk(userId);
  const movie = await Movie.findByPk(movieId);

  if (!user || !movie) {
    throw new Error("User or Movie not found");
  }

  await user.removeFavorite(movie);
  return "Movie removed from favorites";
};

const getUserFavorites = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return await user.getFavorites();
};

module.exports = {
  removeFromFavorites,
  addToFavorites,
  getUserFavorites,
};
