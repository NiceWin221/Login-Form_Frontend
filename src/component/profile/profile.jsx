import { useEffect, useState } from "react";
import { getUser } from "../../utils/getUser";
import { refreshToken } from "../../utils/refreshToken";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Cookie from "js-cookie"
import axios from "axios";
import "./profile.css"


const Profile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isEdit, setIsEdit] = useState(true)
  const [profilePicture, setProfilePicture] = useState(null)
  const navigate = useNavigate()

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
        setEmail(userData.email)
        setPhoneNumber(userData.phoneNumber)

        if (userData.profilePicture !== null) {
          const imageUrl = `http://localhost:3000/getImage/${userData.profilePicture}`;
          setProfilePicture(imageUrl)
        } else {
          setProfilePicture(null);
        }

      } catch (error) {
        console.error("Failed to fetch data", error)
      }
    }

    fetchDataUser()
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const validatePhone = (value) => {
    if (!value) return true
    const numberPattern = /^[0-9]{12,}$/;
    return numberPattern.test(value);
  };

  const handleSave = async () => {
    if (!email) {
      toast.error("Email is required")
      return
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!")
      return
    }

    if (!validatePhone(phoneNumber)) {
      toast.error("Please enter a valid phone number!")
      return
    }

    const data = {
      username: name,
      email: email,
      phoneNumber: phoneNumber
    }

    try {
      const response = await axios.post(`http://localhost:3000/updateUser`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )

      console.log(response.data)
      if (response.status >= 200 && response.status < 300) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    }

    setIsEdit(true)
  }

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/logOut", {
        method: "DELETE",
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Failed to logout!")
      }
      Cookie.set("statusLogin", "false")
      toast.success("Loggedout!")
      navigate("/")
    } catch (err) {
      console.error(err)
      toast.error("Logout failed!")
    }
  }

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
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <input type="text" value={name} disabled={true} />
          <input type="email" value={email || ""} name="email" disabled={isEdit ? true : false} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="text" value={phoneNumber || ""} name="phoneNumber" disabled={isEdit ? true : false} placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
          <div className="edit-profile">
            {isEdit ? (
              <button type="button" onClick={(e) => { e.preventDefault(); setIsEdit(false); }}>Edit</button>
            ) : (
              <button type="submit">Save</button>
            )}
            <button className="logout" onClick={logOut} type="button">Logout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile