import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const sendRegister = async (e) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }
    const dataForm = JSON.stringify(data)
    try {
      const response = await fetch("http://localhost:3000/register",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: dataForm
        }
      )

      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`)
        toast.error("Registration failed!")
      } else {
        const result = await response.json()
        console.log("Registration successfull:", result)
        toast.success("Registration success!")
        navigate("/")
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("Registration failed!")
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
            value={username}
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
            value={password}
            required />
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            onChange={(e) => { setConfirmPassword(e.target.value) }}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            required />
        </div>
        <button type="submit" className="signup">Sign Up</button>
      </form>
      <div className="routes">
        <p>Already have an account? <a href="/">Log in</a></p>
      </div>
    </div>
  );
}

export default Register;
