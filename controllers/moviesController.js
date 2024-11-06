const axios = require("axios");
const movieService = require("../services/movieService");
const BEARER_TOKEN = process.env.MOVIES_BEARER_TOKEN;
const API_KEY = process.env.MOVIES_API_KEY;
const BASE_URL = process.env.MOVIES_BASE_URL;

const HEADERS_OBJECT = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
  Accept: "application/json",
};

const getPopularMoviesByPageNumber = async (req, res) => {
  try {
    let { page } = req.query;
    page = parseInt(page) || 1;

    const response = await axios.get(`${BASE_URL}/popular?api_key=${API_KEY}&language=en-US&page=${page}`, {
      headers: HEADERS_OBJECT,
    });

    const popularMovies = response.data.results;

    res.json({
      results: popularMovies,
    });
  } catch (error) {
    console.error(error);
  }
};

const getTrailerById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/${id}/videos?api_key=${API_KEY}&language=en-US`, {
      headers: HEADERS_OBJECT,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching trailer:", error.response?.data || error.message);
    res.status(500).send("Error fetching trailer");
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const detailsResponse = await axios.get(`${BASE_URL}${id}?api_key=${API_KEY}&language=en-US`, {
      headers: HEADERS_OBJECT,
    });

    const { title, overview, tagline, status, vote_average, genres, production_companies } =
      detailsResponse.data;

    const filteredData = {
      title,
      overview,
      tagline,
      status,
      vote_average,
      genres,
      production_companies,
    };

    res.json(filteredData);
  } catch (error) {
    console.error("Error fetching movie data:", error.response?.data || error.message || error);
    res.status(error.response?.status || 500).send("Error fetching movie data");
  }
};

const getMovieImages = async (req, res) => {
  const { id } = req.params;

  try {
    const imagesResponse = await axios.get(
      `${BASE_URL}${id}/images?api_key=${API_KEY}&language=en-US&include_image_language=en`,
      {
        headers: HEADERS_OBJECT,
      }
    );

    const posters = imagesResponse.data.posters
      .filter((poster) => poster.file_path)
      .slice(0, 10)
      .map((poster) => ({ file_path: poster.file_path }));

    res.json(posters);
  } catch (error) {
    console.error("Error fetching movie data:", error.response?.data || error.message || error);
    res.status(error.response?.status || 500).send("Error fetching movie data");
  }
};

const getSimilarMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const similarResponse = await axios.get(
      `${BASE_URL}${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
      {
        headers: HEADERS_OBJECT,
      }
    );

    const similar = similarResponse.data.results
      .filter((movie) => movie.poster_path)
      .slice(0, 10)
      .map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
      }));

    res.json(similar);
  } catch (error) {
    console.error("Error fetching movie data:", error.response?.data || error.message || error);
    res.status(error.response?.status || 500).send("Error fetching movie data");
  }
};

const getMoviesInTheatre = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}now_playing?api_key=${API_KEY}&language=en-US&page=1`, {
      headers: HEADERS_OBJECT,
    });

    const moviesInTheatre = response.data.results.slice(0, 10).map((movie) => ({
      backdrop_path: movie.backdrop_path,
      title: movie.title,
    }));

    res.json({
      results: moviesInTheatre,
    });
  } catch (error) {
    console.error(error);
  }
};

///

const addToFavorites = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const message = await movieService.addToFavorites(userId, movieId);
    res.status(200).send(message);
  } catch (error) {
    console.error("Error in addToFavorites controller:", error.message);
    res.status(500).send(error.message);
  }
};

const removeFromFavorites = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const message = await movieService.removeFromFavorites(userId, movieId);
    res.status(200).send(message);
  } catch (error) {
    console.error("Error in removeFromFavorites controller:", error.message);
    res.status(500).send(error.message);
  }
};

const getUserFavorites = async (req, res) => {
  const { userId } = req.params;
  try {
    const favorites = await movieService.getUserFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error in getUserFavorites controller:", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTrailerById,
  getPopularMoviesByPageNumber,
  getMovieDetails,
  getMovieImages,
  getSimilarMovies,
  getMoviesInTheatre,
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
};
