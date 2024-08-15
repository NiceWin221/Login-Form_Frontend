import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { logo } from "../../images/images"
import { getUser } from "../../utils/getUser"
import Cookie from "js-cookie"
import "./navbar.css";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null)
  const currentPath = location.pathname

  const handleMovieSaved = (name) => {
    navigate(`/movieSaved/${name}`)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setName(userData.username); // Set the username in the state
        const imageUrl = `http://localhost:3000/getImage/${userData.profilePicture}`
        setProfilePicture(imageUrl)
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch user data.");
      }
    }

    fetchUser()
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
      {profilePicture ?
        (<img src={profilePicture} alt="Profile" className="navbar-profile-picture" onClick={() => { navigate(`/${name}`) }} />)
        :
        (<h1 onClick={() => { navigate(`/${name}`) }}>{name.charAt(0).toUpperCase()}</h1>)}
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