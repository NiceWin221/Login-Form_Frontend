import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./bookmark.css";

const Bookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const handleMoviePlay = (movie) => {
    navigate(`/moviePlay/${movie.imdbID}`);
  };

  const handleMovieDownload = (movie) => {
    navigate(`/movieDownload/${movie.imdbID}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken")
        const response = await axios.get("http://localhost:3000/movies", {
          withCredentials: "include",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          }
        });

        if (response.data.status === "success") {
          setBookmark(response.data.movies)
          setMessage(false)
        } else {
          setMessage("No movies saved!")
          setBookmark([])
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <span className="bookmark-headers">
        <i className="fa-solid fa-bookmark"></i>
        <h1>Bookmark</h1>
      </span>
      <div className="bookmark-container">
        {message ?
          (<p className="saved-movie-message">{message}</p>)
          :
          (bookmark && bookmark.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.poster} alt={movie.title} />
              <div className="movie-details">
                <p>{movie.title}</p>
                <div className="movie-details-icon">
                  <span onClick={() => handleMovieDownload(movie)}>
                    <i className="fa-solid fa-download"></i>
                  </span>
                  <span onClick={() => handleMoviePlay(movie)}>
                    <i className="fa-solid fa-play"></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-code"></i>
                  </span>
                </div>
              </div>
            </div>
          ))
          )}
      </div>
    </>
  );
};

export default Bookmark;
