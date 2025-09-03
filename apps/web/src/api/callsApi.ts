import axios from "axios";

export const getRecentCalls = async () => {
  const url = import.meta.env.VITE_API_URL + "/calls/recent";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};