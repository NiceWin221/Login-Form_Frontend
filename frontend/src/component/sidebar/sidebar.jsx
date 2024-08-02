import { useState } from "react"
import "./sidebar.css"

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(null)

  const handleMouseEnter = (item) => {
    setIsHovered(item);
  };

  const handleMouseLeave = () => {
    setIsHovered(null)
  }

  const hoverStyle = (item) => (
    {
      left: isHovered === item ? '75px' : '-75px',
      opacity: isHovered === item ? 1 : 0,
      transition: isHovered === item ? 'left 0.1s ease-in-out, opacity 0.2s ease-in-out' : 'none',
    }
  )

  return (
    <div className="sidebar">
      <div>
        <div className="fire" onMouseEnter={() => handleMouseEnter('fire')} onMouseLeave={handleMouseLeave}>
          <i className="fa-solid fa-fire"></i>
          <span className="hover" style={hoverStyle('fire')}>
            <i className="fa-solid fa-caret-left"></i>
            <p>Trending</p>
          </span>
        </div>
        <div className="thumb" onMouseEnter={() => handleMouseEnter('thumb')} onMouseLeave={handleMouseLeave}>
          <i className="fa-solid fa-thumbs-up"></i>
          <span className="hover" style={hoverStyle('thumb')}>
            <i className="fa-solid fa-caret-left"></i>
            <p>Recommended</p>
          </span>
        </div>
        <div className="gift" onMouseEnter={() => handleMouseEnter('gift')} onMouseLeave={handleMouseLeave}>
          <i className="fa-solid fa-gift"></i>
          <span className="hover" style={hoverStyle('gift')}>
            <i className="fa-solid fa-caret-left"></i>
            <p>Recent <br /> Releases</p>
          </span>
        </div>
        <div className="trophy" onMouseEnter={() => handleMouseEnter('trophy')} onMouseLeave={handleMouseLeave}>
          <i className="fa-solid fa-trophy"></i>
          <span className="hover" style={hoverStyle('trophy')}>
            <i className="fa-solid fa-caret-left"></i>
            <p>IMDB Top</p>
          </span>
        </div>
        <div className="clock" onMouseEnter={() => handleMouseEnter('clock')} onMouseLeave={handleMouseLeave}>
          <i className="fa-solid fa-clock-rotate-left"></i>
          <span className="hover" style={hoverStyle('clock')}>
            <i className="fa-solid fa-caret-left"></i>
            <p>Watch <br /> History</p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar