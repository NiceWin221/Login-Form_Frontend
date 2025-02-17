import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie"
import Layout from "../component/layout/layout";

const ProtectedRoutes = () => {
  return <Layout><Outlet /></Layout>
}

export default ProtectedRoutes