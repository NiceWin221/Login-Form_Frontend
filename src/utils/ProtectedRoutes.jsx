import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie"
import Layout from "../component/layout/layout";

const ProtectedRoutes = () => {
  const cookie = Cookie.get("statusLogin")

  return cookie === "true" ?
    (<Layout>
      <Outlet />
    </Layout>)
    :
    (<Navigate to="/" />)
}

export default ProtectedRoutes