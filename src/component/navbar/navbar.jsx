import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadMovies } from "../../services/omdbService"
import { toast } from 'react-toastify';
import { logo } from "../../images/images"
import { getUser } from "../../utils/getUser"
import "./navbar.css";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [name, setName] = useState("Guest");
  const [profilePicture, setProfilePicture] = useState(null)
  const currentPath = location.pathname

  const handleMovieSaved = (name) => {
    navigate(`/movieSaved/${name}`)
  }

  ///////////

  const triggerInputRef = useRef(null);
  const targetInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("")
  const [inputActive, setInputActive] = useState(false)
  const [movies, setMovies] = useState([])

  const handleMoviePlay = (movie) => {
    setInputActive(false)
    navigate(`/moviePlay/${movie.imdbID}`)
  }

  const handleMovieDownload = (movie) => {
    setInputActive(false)
    navigate(`/movieDownload/${movie.imdbID}`)
  }

  const handleInputActive = () => {
    setInputActive(true)
    targetInputRef.current.focus();
  }

  const inputStyle = {
    top: inputActive ? "0" : "-100%",
    transition: inputActive ? "top 0.3s ease-in" : ""
  }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const userData = await getUser();
  //       setName(userData.username);
  //       if (userData.profilePicture !== null) {
  //         const imageUrl = `http://localhost:3000/getImage/${userData.profilePicture}`
  //         setProfilePicture(imageUrl)
  //       }
  //       setProfilePicture(null)
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   fetchUser()
  // }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchValue) {
        try {
          const response = await loadMovies(searchValue);
          setMovies(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        setMovies([]);
      }
    };

    const debounceTimeout = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue]);

  return (
    <nav>
      {profilePicture !== null ? (
        <img src={profilePicture} alt="Profile" className="navbar-profile-picture" onClick={() => { navigate(`/user/${name}`) }} />
      ) : (
        <h1>{name.charAt(0).toUpperCase()}</h1>
      )}
      <img src={logo} alt="logo" />
      <span onClick={() => { navigate("/") }} className={currentPath === "/" ? "active" : ""}>
        <i className="fa-solid fa-house"></i>
        <p>Home</p>
      </span>
      <span>
        <i className="fa-solid fa-film"></i>
        <p>Movies</p>
      </span>
      <span>
        <i className="fa-solid fa-tv"></i>
        TV Shows
      </span>
      <span className={currentPath === `/movieSaved/${name}` ? "active" : ""}>
        {currentPath === `/movieSaved/${name}` ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}
        <p>Bookmark</p>
      </span>
      <div onClick={handleInputActive} className="search-navbar">
        <input type="text" placeholder="Search movie" ref={triggerInputRef} />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="search-overlay" style={inputStyle}>
        <input type="text" placeholder="Type to search..." onChange={(e) => { setSearchValue(e.target.value) }} ref={targetInputRef} />
        <div className="movie-container-search">
          {movies.map((movie) => (
            <div className="movie-search" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-search-details">
                <p>{movie.Title}</p>
                <div className="movie-search-details-icon">
                  <span>
                    <i className="fa-solid fa-download" onClick={() => { handleMovieDownload(movie) }}></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-play" onClick={() => { handleMoviePlay(movie) }}></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-code"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <span onClick={() => { setInputActive(false) }} className="search-close">X</span>
      </div>
    </nav>
  );
};

export default Navbar