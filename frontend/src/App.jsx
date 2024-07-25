import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login/login";
import Register from "./component/register/register";
import Dashboard from "./component/dashboard/dashboard";
import "./app.css"

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}