import {
  ColorScheme,
  Map,
  useMap,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { getCrimesHeatmap, getNearbyCrimes } from "../../api/crimesApi";
import { useSelectionContext } from "../../context/SelectionContext";
import { sortCrimesByDistance } from "../../utils/closestCrime";
import { getRecentCalls } from "../../api/callsApi";

interface heatmapPoint {
  lat: number;
  lng: number;
  count: number;
}

export const MapContainer = () => {
  const map = useMap();

  const defaultLat = 43.6548;
  const defaultLng = -79.3883;

  const [heatmapPoints, setHeatmapPoints] = useState<
    google.maps.visualization.WeightedLocation[]
  >([]);
  const {
    setSelectedCenter,
    setSelectedCrime,
    setNearbyCrimes,
    setSelectionRadius,
    setRecentCalls,
    nearbyCrimes,
    selectionRadius,
    recentCalls,
  } = useSelectionContext();

  const handleMapClick = async (e: MapMouseEvent) => {
    const clickLng = e.detail.latLng?.lng;
    const clickLat = e.detail.latLng?.lat;
    console.log(nearbyCrimes);

    if (clickLng && clickLat) {
      setSelectedCenter({ lat: clickLat, lng: clickLng });
    } else {
      return;
    }

    map?.panTo({ lat: clickLat, lng: clickLng });
    const radius = 500;
    setSelectionRadius(radius);

    try {
      const nearbyCrimes = await getNearbyCrimes(clickLat, clickLng, radius);

      if (!nearbyCrimes.length) return;

      const closest = sortCrimesByDistance(nearbyCrimes, clickLat, clickLng)[0];

      setSelectedCrime(closest);
      setNearbyCrimes(nearbyCrimes);

      if (closest) {
      }
    } catch (err) {
      console.error("Failed to fetch nearby crimes", err);
    }
  };

  useEffect(() => {
    const loadMapData = async () => {
      const calls = await getRecentCalls();
      const nearbyCrimes = await getNearbyCrimes(
        defaultLat,
        defaultLng,
        selectionRadius
      );
      const crimes = await getCrimesHeatmap("2025-07-21 00:00:00+00");
      const points = crimes.map((point: heatmapPoint) => ({
        location: new google.maps.LatLng(point.lat, point.lng),
        weight: point.count,
      }));
      setNearbyCrimes(nearbyCrimes);
      setHeatmapPoints(points);
      setRecentCalls(calls);
    };

    loadMapData();
  }, []);

  useEffect(() => {
    if (map && heatmapPoints.length) {
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapPoints,
        map,
        radius: 35,
        opacity: 0.5,
      });

      return () => heatmap.setMap(null);
    }
  }, [map, heatmapPoints]);

  useEffect(() => {
    if (!map || !recentCalls.length) return;

    const circles: google.maps.Circle[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    recentCalls.forEach((call) => {
      const circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.6,
        strokeWeight: 1,
        fillColor: "#FF0000",
        fillOpacity: 0.4,
        map,
        center: { lat: call.lat, lng: call.lng },
        radius: 45, // smaller radius for dots
      });
      circles.push(circle);

      let visible = true;
      const interval = setInterval(() => {
        circle.setOptions({
          fillOpacity: visible ? 0.4 : 0.1,
          strokeOpacity: visible ? 0.6 : 0.2,
        });
        visible = !visible;
      }, 600);

      intervals.push(interval);
    });

    return () => {
      circles.forEach((circle) => circle.setMap(null));
      intervals.forEach(clearInterval);
    };
  }, [map, recentCalls]);

  return (
    <Map
      defaultZoom={14}
      defaultCenter={{ lat: defaultLat, lng: defaultLng }}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapTypeControl={false}
      streetViewControl={false}
      clickableIcons={false}
      fullscreenControl={false}
      colorScheme={ColorScheme.LIGHT}
      onClick={handleMapClick}
    />
  );
};
