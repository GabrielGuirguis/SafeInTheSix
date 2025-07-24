import { db } from "../config/db";

export const getCrimes = async (lat, lng, radius) => {
  const { data, error } = await db.rpc("get_crimes_nearby", {
    lat,
    lng,
    radius,
  });

  if (error) {
    console.error("Error calling get_crimes_nearby:", error);
    return null;
  }

  return data;
};

getCrimes(43.653, -79.383, 500);