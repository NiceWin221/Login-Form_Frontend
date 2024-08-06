import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchMoviesDetails } from "../../services/omdbService"
import "./movieDownload.css"

const MovieDownload = () => {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const navigate = useNavigate()

  const handleMoviePlay = (movie) => {
    navigate(`/moviePlay/${movie.imdbID}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchMoviesDetails(movieId)
      setMovieDetails(details)
    }
    fetchData()
  }, [])

  return (
    <>
      {
        movieDetails ?
          (<div className="movie-download" >
            <div style={{ width: "250px" }}>
              <div className="movie-download-poster">
                <img src={movieDetails.Poster} alt={movieDetails.Title} />
                <span>
                  <h1>Video Quality: </h1>
                  <p>HD</p>
                </span>
              </div>
              <span className="movie-download-online" onClick={() => { handleMoviePlay(movieDetails) }}>
                <i className="fa-solid fa-video"></i>
                <p>Watch Online</p>
              </span>
              <span className="movie-download-details">
                <p>IMDB Rate: <span>{movieDetails.imdbRating}</span></p>
                <p>Genres: <span>{movieDetails.Genre}</span></p>
                <p>Year: <span>{movieDetails.Year}</span></p>
                <p>Language: <span>{movieDetails.Language}</span></p>
                <p>Run Time: <span>{movieDetails.Runtime}</span></p>
              </span>
            </div>
            <div className="movie-download-storyline">
              <h1>Download: {movieDetails.Title}</h1>
              <div>
                <h1>Storyline</h1>
                <p>{movieDetails.Plot}</p>
              </div>
              <div className="movie-download-link">
                <h1>Sorry, download links not found!</h1>
              </div>
            </div>
          </div >)
          :
          (<p>Loading...</p>)
      }
    </>
  )
}

export default MovieDownload