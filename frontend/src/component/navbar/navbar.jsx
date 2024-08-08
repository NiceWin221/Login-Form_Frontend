import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { logo } from "../../images/images"
import axios from "axios"
import Cookie from "js-cookie"
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const currentPath = location.pathname

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3000/token", {
        withCredentials: "include"
      })
      setToken(response.data.accessToken)
      const decode = jwtDecode(response.data.accessToken);
      setName(decode.username);

    } catch (err) {
      console.error(err);
    }
  };

  const handleMovieSaved = (name) => {
    navigate(`/movieSaved/${name}`)
  }

  useEffect(() => {
    refreshToken();
  }, []);

  // const logOut = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/logOut", {
  //       method: "DELETE",
  //       credentials: "include"
  //     })

  //     if (!response.ok) {
  //       throw new Error("Failed to logout!")
  //     }
  //     Cookie.set("statusLogin", "false")
  //     toast.success("Loggedout!")
  //     navigate("/")
  //   } catch (err) {
  //     console.error(err)
  //     toast.error("Logout failed!")
  //   }
  // }

  return (
    <nav>
      <h1>{name.charAt(0).toUpperCase()}</h1>
      <img src={logo} alt="logo" />
      <span onClick={() => { navigate("/dashboard") }} className={currentPath === "/dashboard" ? "active" : ""}>
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
      <span onClick={() => { handleMovieSaved(name) }} className={currentPath === `/movieSaved/${name}` ? "active" : ""}>
        {currentPath === `/movieSaved/${name}` ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}
        <p>Bookmark</p>
      </span>
      <div>
        <input type="text" placeholder="Search movie" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </nav>
  );
};

export default Navbar