const User = require("../models/userModel");
const Movie = require("../models/movieModel");
const axios = require("axios");
const UserFavorites = require("../models/userFavorites");
const UserWatchlist = require("../models/userWatchList");

const BEARER_TOKEN = process.env.MOVIES_BEARER_TOKEN;
const API_KEY = process.env.MOVIES_API_KEY;
const BASE_URL = process.env.MOVIES_BASE_URL;

const HEADERS_OBJECT = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
  Accept: "application/json",
};

const addToFavorites = async (userId, movieId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Movie,
      as: "favorites",
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let movie = await Movie.findByPk(movieId);

  if (!movie) {
    const tmdbResponse = await axios.get(`${BASE_URL}/${movieId}?api_key=${API_KEY}`, {
      headers: HEADERS_OBJECT,
    });

    if (tmdbResponse.status !== 200) {
      throw new Error("Failed to fetch movie data from TMDB");
    }

    const { id, title, poster_path, overview, vote_average } = tmdbResponse.data;

    movie = await Movie.create({
      id,
      title,
      poster_path,
      overview,
      vote_average,
    });
  }

  const isAlreadyInFavorites = await user.hasFavorite(movie);

  if (isAlreadyInFavorites) {
    return { message: "Movie is already in favorites" };
  }

  await user.addFavorite(movie);

  return { message: "Movie added to favorites successfully" };
};

const removeFromFavorites = async (userId, movieId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Movie,
      as: "favorites",
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const movie = await Movie.findByPk(movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }

  await user.removeFavorite(movie);

  const favoritesCount = await UserFavorites.count({ where: { movieId: movie.id } });
  const watchlistCount = await UserWatchlist.count({ where: { movieId: movie.id } });

  if (favoritesCount === 0 && watchlistCount === 0) {
    await movie.destroy();
  }

  return { message: "Movie removed from favorites successfully" };
};

const removeFromWatchList = async (userId, movieId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Movie,
      as: "watchlist",
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const movie = await Movie.findByPk(movieId);
  if (!movie) {
    throw new Error("Movie not found");
  }

  await user.removeWatchlist(movie);

  const favoritesCount = await UserFavorites.count({ where: { movieId: movie.id } });
  const watchlistCount = await UserWatchlist.count({ where: { movieId: movie.id } });

  if (favoritesCount === 0 && watchlistCount === 0) {
    await movie.destroy();
  }

  return { message: "Movie removed from watchlist successfully" };
};

const getUserFavorites = async (userId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Movie,
      as: "favorites",
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.favorites;
};

const addToWatchList = async (userId, movieId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Movie,
      as: "watchlist",
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let movie = await Movie.findByPk(movieId);

  if (!movie) {
    const tmdbResponse = await axios.get(`${BASE_URL}/${movieId}?api_key=${API_KEY}`, {
      headers: HEADERS_OBJECT,
    });

    if (tmdbResponse.status !== 200) {
      throw new Error("Failed to fetch movie data from TMDB");
    }

    const { id, title, poster_path, overview, vote_average } = tmdbResponse.data;

    movie = await Movie.create({
      id,
      title,
      poster_path,
      overview,
      vote_average,
    });
  }

  const isAlreadyInWatchlist = await user.hasWatchlist(movie);

  if (isAlreadyInWatchlist) {
    return { message: "Movie is already in the watchlist" };
  }

  await user.addWatchlist(movie);

  return { message: "Movie added to watchlist successfully" };
};

const getUserWatchList = async (userId) => {
  const user = await User.findByPk(userId, {
    include: {
      model: Movie,
      as: "watchlist",
      through: {
        attributes: [],
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.watchlist;
};

//

module.exports = {
  removeFromFavorites,
  addToFavorites,
  getUserFavorites,
  addToWatchList,
  removeFromWatchList,
  getUserWatchList,
};
