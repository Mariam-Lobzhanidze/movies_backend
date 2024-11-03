const axios = require("axios");
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

    const allMovies = response.data.results;

    res.json({
      results: allMovies,
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

    console.log("API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching trailer:", error.response?.data || error.message);
    res.status(500).send("Error fetching trailer");
  }
};

module.exports = {
  getTrailerById,
  getPopularMoviesByPageNumber,
};
