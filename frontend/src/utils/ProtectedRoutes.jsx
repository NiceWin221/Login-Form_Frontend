import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie"

const ProtectedRoutes = () => {
  const cookie = Cookie.get("statusLogin")

  return cookie === "true" ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes