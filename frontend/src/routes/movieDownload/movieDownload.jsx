import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchMoviesDetails } from "../../services/omdbService"
import "./movieDownload.css"

const MovieDownload = () => {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)

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
              <div className="movie-poster">
                <img src={movieDetails.Poster} alt={movieDetails.Title} />
                <span>
                  <h1>Video Quality: </h1>
                  <p>HD</p>
                </span>
              </div>
              <div className="watch-online">
                <i className="fa-solid fa-video"></i>
                <p>Watch Online</p>
              </div>
              <div className="details-movie">
                <p>IMDB Rate: <span>{movieDetails.imdbRating}</span></p>
                <p>Genres: <span>{movieDetails.Genre}</span></p>
                <p>Year: <span>{movieDetails.Year}</span></p>
                <p>Language: <span>{movieDetails.Language}</span></p>
                <p>Run Time: <span>{movieDetails.Runtime}</span></p>
              </div>
            </div>
            <div className="movie-download-details">
              <h1>Download: {movieDetails.Title}</h1>
              <span>
                <h1>Storyline</h1>
                <p>{movieDetails.Plot}</p>
              </span>
            </div>
          </div >)
          :
          (<p>Loading...</p>)
      }
    </>
  )
}

export default MovieDownload