import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie"
import "./navbar.css";

const Navbar = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/token", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to fetch refrehToken");
      }
      const result = await response.json();
      setToken(result.accessToken)
      const decode = jwtDecode(result.accessToken);
      setName(decode.username);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/logOut", {
        method: "DELETE",
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Failed to logout!")
      }
      Cookie.set("statusLogin", "false")
      toast.success("Loggedout!")
      navigate("/")
    } catch (err) {
      console.error(err)
      toast.error("Logout failed!")
    }
  }

  return (
    <nav>
      <h1>{name}</h1>
      <button onClick={() => { logOut() }}>Logout</button>
    </nav>
  );
};

export default Navbar