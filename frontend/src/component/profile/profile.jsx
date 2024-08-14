import { useEffect, useState } from "react";
import { getUser } from "../../utils/getUser";
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
      const responseToken = await axios.get("http://localhost:3000/token", {
        withCredentials: "include"
      })

      const response = await axios.post("http://localhost:3000/uploads", formData, {
        headers: {
          "Authorization": `Bearer ${responseToken.data.accessToken}`,
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.data.success) {
        setProfilePicture(URL.createObjectURL(file))
      } else {
        console.error("Image upload failed!")
      }
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
        setProfilePicture(userData.profilePicture)
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
          (<img src={profilePicture} alt="Profile" className="profile-picture" />)
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
    </div>
  )
}

export default Profile