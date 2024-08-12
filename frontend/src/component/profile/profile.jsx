import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { refreshToken } from "../../utils/refreshToken";
import axios from "axios";
import "./profile.css"


const Profile = () => {
  const [name, setName] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setProfilePicture(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleIconClick = () => {
    document.querySelector('.profile-form input').click()
  }

  useEffect(() => {
    refreshToken(setName)
  }, [])
  return (
    <div className="profile-container">
      <div className="profile-img">
        {profilePicture ?
          (<img src={profilePicture} alt="Profile" className="profile-picture" />)
          :
          (<h1>{name.charAt(0).toUpperCase()}</h1>)}
        <div className="profile-form">
          <form action="post">
            <span onClick={handleIconClick}>
              <i className="fa-solid fa-pen-to-square"></i>
              <p>Edit</p>
            </span>
            <input type="file" name="file" onChange={handleImageUpload} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile