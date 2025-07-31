import type { Crime } from "../context/SelectionContext";

const haversineDistance = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371000; // radius of Earth in meters

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const aVal =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));

  return R * c;
};

export const sortCrimesByDistance = (
  crimes: Crime[],
  lat: number,
  lng: number
) => {
  return crimes
    .map((crime) => {
      const distance = haversineDistance(crime, { lat, lng });
      return { crime, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .map(({ crime }) => crime);
};
