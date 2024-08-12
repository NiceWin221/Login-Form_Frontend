import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getRandomMovies } from "../../services/omdbService"
import "./dashboard.css"

const Dashboard = () => {
  const [movies, setMovies] = useState([])
  const [active, setActive] = useState(1)
  const [loading, setLloading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLloading(true)
      const randomMovies = await getRandomMovies()
      setMovies(randomMovies)
      setLloading(false)
    }
    fetchData()
  }, [])

  const handleMoviePlay = (movie) => {
    navigate(`/moviePlay/${movie.imdbID}`)
  }

  const handleMovieDownload = (movie) => {
    navigate(`/movieDownload/${movie.imdbID}`)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-headers">
        <span>
          <i className="fa-solid fa-thumbs-up"></i>
          <h1>Recommended</h1>
        </span>
        <div>
          <span className={active === 1 ? "active-tab" : ""} onClick={() => { setActive(1) }}>
            <i className="fa-solid fa-film"></i>
            <h1>Movies</h1>
          </span>
          <span className={active === 2 ? "active-tab" : ""} onClick={() => { setActive(2) }}>
            <i className="fa-solid fa-tv"></i>
            <h1>TV Shows</h1>
          </span>
        </div>
      </div>
      <div className="random-movies-container">
        {loading ?
          (<p>Loading...</p>)
          :
          (movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-details">
                <p>{movie.Title}</p>
                <div className="movie-details-icon">
                  <span onClick={() => { handleMovieDownload(movie) }}>
                    <i className="fa-solid fa-download"></i>
                  </span>
                  <span onClick={() => { handleMoviePlay(movie) }}>
                    <i className="fa-solid fa-play"></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-code"></i>
                  </span>
                </div>
              </div>
            </div>
          )))}
      </div>
    </div>
  )
}

export default Dashboard