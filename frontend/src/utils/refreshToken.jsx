import axios from "axios"
import { jwtDecode } from "jwt-decode";

export const refreshToken = async (setName) => {
  try {
    const response = await axios.get("http://localhost:3000/token", {
      withCredentials: "include"
    })
    const accessToken = response.data.accessToken
    const decode = jwtDecode(accessToken);
    setName(decode.username);

  } catch (err) {
    console.error(err);
  }
};