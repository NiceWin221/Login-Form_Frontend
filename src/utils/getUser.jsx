import axios from "axios";
import { refreshToken } from "./refreshToken";

export const getUser = async () => {
  try {
    const accessToken = sessionStorage.getItem("accessToken")

    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    })
    const result = response.data
    return result
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}