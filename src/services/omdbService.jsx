import axios from "axios"
const API_KEY = 'dca61bcc';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const loadMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}&s=${query}`)
    return response.data.Search || []
  } catch (err) {
    console.error(err)
    return []
  }
}

// Fetch movies based on a specific query and page
export const fetchMovies = async (query, page) => {
  try {
    const response = await axios.get(`${BASE_URL}&s=${query}&page=${page}`)

    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching data from OMDB API:', error);
    throw error;
  }
};

// Get movies details
export const fetchMoviesDetails = async (imdbId) => {
  try {
    const response = await axios.get(`${BASE_URL}&i=${imdbId}`)
    return response.data
  } catch (err) {
    console.error(err)
  }
}

// Get a random selection of movies
export const getRandomMovies = async () => {
  try {
    const searchTerm = "animation";

    // Fetch both pages in parallel
    const [page1, page2] = await Promise.all([
      fetchMovies(searchTerm, 1),
      fetchMovies(searchTerm, 2),
    ]);

    // Combine results & shuffle
    const movies = [...page1, ...page2].sort(() => 0.5 - Math.random());

    // Take only 12 movies
    const selectedMovies = movies.slice(0, 12);

    // Fetch details in parallel
    const moviesDetails = await Promise.all(
      selectedMovies.map((movie) => fetchMoviesDetails(movie.imdbID))
    );

    return moviesDetails.filter((details) => details !== null); // Remove failed fetches
  } catch (error) {
    console.error("Error fetching random movies:", error);
    throw error;
  }
};
