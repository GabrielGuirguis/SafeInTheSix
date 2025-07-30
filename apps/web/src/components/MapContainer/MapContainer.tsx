import { Map, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { getCrimesHeatmap } from "../../api/crimesApi";
import { useSelectionContext } from "../../context/SelectionContext";

interface point {
  lat: number;
  lng: number;
  count: number;
}

export const MapContainer = () => {
  const map = useMap();
  const [heatmapPoints, setHeatmapPoints] = useState<
    google.maps.visualization.WeightedLocation[]
  >([]);
  const { setSelected } = useSelectionContext();

  useEffect(() => {
    const loadHeatmap = async () => {
      const data = await getCrimesHeatmap("2025-07-01 00:00:00+00");
      const points = data.map((point: point) => ({
        location: new google.maps.LatLng(point.lat, point.lng),
        weight: point.count,
      }));
      setHeatmapPoints(points);
    };

    loadHeatmap();
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

  return (
    <Map
      defaultZoom={14}
      defaultCenter={{ lat: 43.6548, lng: -79.3883 }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      mapTypeControl={false}
      streetViewControl={false}
      clickableIcons={false}
      fullscreenControl={false}
    ></Map>
  );
};
