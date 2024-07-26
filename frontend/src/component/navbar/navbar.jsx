import { useState } from "react"
import "./navbar.css"

const Navbar = () => {
  const [name, setName] = useState("")

  return (
    <nav>
      <h1>Windy</h1>
      <button>Logout</button>
    </nav>
  )
}

export default Navbar