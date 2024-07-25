import { useState } from "react";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const sendRegister = async (e) => {
    e.preventDefault()
    const data = {
      username,
      password
    }
    try {
      const response = await fetch("http://localhost:3000/register",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      )

      if (!response.ok) return console.log(`HTTP error! Status: ${response.status}`)
      const result = await response.json()
      console.log("Registration successfull:", result)

    } catch (err) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form action="/register" method="post" onSubmit={sendRegister} className="form">
        <div className="input-container">
          <label htmlFor="name">Username</label>
          <input
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            name="name"
            id="name"
            placeholder="Enter your username"
            required />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required />
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            onChange={(e) => { setUsername(e.target.value) }}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="login">
        <p>Already have an account? <a href="/">Log in</a></p>
      </div>
    </div>
  );
}

export default Register;
