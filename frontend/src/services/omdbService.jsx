import axios from "axios"
const API_KEY = 'dca61bcc';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

// Fetch movies based on a specific query and page
const fetchMovies = async (query, page) => {
  try {
    const response = await axios.get(`${BASE_URL}&s=${query}&page=${page}`)

    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching data from OMDB API:', error);
    throw error;
  }
};

// Get a random selection of movies
export const getRandomMovies = async () => {
  try {
    const searchTerm = 'animation'; // Use a more specific query
    const movies = [];

    // Fetch the first page with a specific query
    const pageMovies = await fetchMovies(searchTerm, 1);
    movies.push(...pageMovies);

    // If you need more results, fetch additional pages
    if (movies.length < 12) {
      const additionalMovies = await fetchMovies(searchTerm, 2);
      movies.push(...additionalMovies);
    }

    // Shuffle and get the first 12 movies
    const shuffledMovies = movies.sort(() => 0.5 - Math.random());
    const randomMovies = shuffledMovies.slice(0, 12);

    // Fetch detailed information for each movie
    const movieDetailsPromises = randomMovies.map(async (movie) => {
      const movieResponse = await fetch(`${BASE_URL}&i=${movie.imdbID}`);
      return movieResponse.json();
    });

    const moviesDetails = await Promise.all(movieDetailsPromises);

    return moviesDetails;
  } catch (error) {
    console.error('Error fetching random movies:', error);
    throw error;
  }
};
