import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/footer";
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="layout">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout