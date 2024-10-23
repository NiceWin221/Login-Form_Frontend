import axios from "axios"

export const refreshToken = async () => {
  try {
    const response = await axios.get("http://localhost:3000/token", {
      withCredentials: true,
    });
    console.log("Accesstoken: ", response)

    const accessToken = response.data.accessToken
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}