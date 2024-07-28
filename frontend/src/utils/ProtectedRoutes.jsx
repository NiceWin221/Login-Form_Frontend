import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie"

const ProtectedRoutes = () => {
  const cookie = Cookie.get("statusLogin")

  return cookie === "true" ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes