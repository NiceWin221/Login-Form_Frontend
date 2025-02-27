import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./component/login/login";
import Register from "./component/register/register";
import Dashboard from "./component/dashboard/dashboard";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MovieDownload from "./routes/movieDownload/movieDownload";
import MoviePlay from "./routes/moviePlay/moviePlay"
import Bookmark from "./component/bookmark/bookmark";
import Profile from "./component/profile/profile";
import "./app.css"

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movieDownload/:movieId" element={<MovieDownload />} />
          <Route path="/moviePlay/:movieId" element={<MoviePlay />} />
          <Route path="/movieSaved/:name" element={<Bookmark />} />
          <Route path="/user/:name" element={<Profile />} />
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