import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const sendRegister = async (e) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password,
      email: email
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
          <label htmlFor="name">
            <i className="fa-solid fa-user"></i>
          </label>
          <input
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            name="name"
            id="name"
            placeholder="Username"
            value={username}
            required
            autoComplete="off"
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">
            <i className="fa-solid fa-envelope"></i>
          </label>
          <input
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            required
            autoComplete="off"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">
            <i className="fa-solid fa-lock"></i>
          </label>
          <input
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            required />
        </div>
        <div className="login-container" style={{ marginTop: "30px" }}>
          <div className="button-hover">
            <button type="submit" className="login">SIGN UP</button>
            <span className="bg-left"></span>
            <span className="bg-right"></span>
          </div>
        </div>
      </form>
      <div className="register" style={{ marginTop: "5px" }}>
        <p>Don't have an account? <a href="/">Sign in</a></p>
      </div>
    </div>
  );
}

export default Register;
