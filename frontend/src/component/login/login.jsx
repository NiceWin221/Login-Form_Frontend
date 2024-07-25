import "./login.css"

const Login = () => {
  return (
    <div class="container">
      <h1>Login</h1>
      <form action="/login" method="post">
        <div className="input-container">
          <label for="name">Username</label>
          <input type="text" name="name" id="name" placeholder="Enter your name" required />
        </div>
        <div className="input-container">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">LOGIN</button>
      </form>
      <div className="register">
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  )
}

export default Login