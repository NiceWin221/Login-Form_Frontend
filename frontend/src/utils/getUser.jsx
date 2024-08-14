import axios from "axios";
import { refreshToken } from "./refreshToken";

export const getUser = async () => {
  try {
    const accessToken = await refreshToken()

    const response = await axios.get("http://localhost:3000/getUser", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    return response.data
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}