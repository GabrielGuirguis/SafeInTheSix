import axios from "axios";

export const getNearbyCrimes = async (
  lat: number,
  lng: number,
  radius: number
) => {
  const url = import.meta.env.VITE_API_URL + "/crimes/nearby";
  try {
    const { data } = await axios.get(url, {
      params: {
        lat: lat,
        lng: lng,
        radius: radius,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCrimesHeatmap = async (since?: string) => {
  const url = import.meta.env.VITE_API_URL + "/crimes/heatmap";
  try {
    const { data } = await axios.get(url, {
      params: { since },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
