import { useEffect, useState } from "react";
import { getUser } from "../../utils/getUser";
import { refreshToken } from "../../utils/refreshToken";
import axios from "axios";
import "./profile.css"


const Profile = () => {
  const [name, setName] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return;

    const formData = new FormData()
    formData.append("image", file)
    formData.append("username", name)

    try {
      const accessToken = await refreshToken()
      await axios.post("http://localhost:3000/uploads", formData, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })
    } catch (error) {
      console.error("Error uploading the image:", error);
    }

  }

  const handleIconClick = () => {
    document.querySelector('.profile-form input').click()
  }

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const userData = await getUser()
        setName(userData.username)

        if (userData.profilePicture) {
          const imageUrl = `http://localhost:3000/getImage/${userData.profilePicture}`;
          setProfilePicture(imageUrl)
        }

      } catch (error) {
        console.error("Failed to fetch data", error)
      }
    }

    fetchDataUser()
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-img">
        {profilePicture ?
          (<img src={profilePicture} alt="Profile" />)
          :
          (<h1>{name.charAt(0).toUpperCase()}</h1>)}
        <div className="profile-form">
          <form action="post" onSubmit={(e) => e.preventDefault()}>
            <span onClick={handleIconClick}>
              <i className="fa-solid fa-pen-to-square"></i>
              <p>Edit</p>
            </span>
            <input type="file" name="file" onChange={handleImageUpload} />
          </form>
        </div>
      </div>
      <div className="profile-details">
          
      </div>
    </div>
  )
}

export default Profile