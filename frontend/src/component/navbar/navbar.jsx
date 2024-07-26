import { useEffect, useState } from "react"
import "./navbar.css"

const Navbar = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch("http://localhost:3000/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          },
          credentials: "include"
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setName(data.username);
      } catch (err) {
        if (err) return console.error(err)
      }
    }

    fetchUsername();
  }, []);

  return (
    <nav>
      <h1>{name}</h1>
      <button>Logout</button>
    </nav>
  )
}

export default Navbar