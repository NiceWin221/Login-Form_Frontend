import "./dashboard.css"
import Navbar from "../navbar/navbar"
import Sidebar from "../sidebar/sidebar"

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Navbar />
    </div>
  )
}

export default Dashboard