import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./component/login/login";
import Register from "./component/register/register";
import Dashboard from "./component/dashboard/dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MovieDownload from "./routes/movieDownload/movieDownload";
import MoviePlay from "./routes/moviePlay/moviePlay"
import "./app.css"

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="movieDownload/:movieId" element={<MovieDownload />} />
          <Route path="moviePlay/:movieId" element={<MoviePlay />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </BrowserRouter>
  )
}