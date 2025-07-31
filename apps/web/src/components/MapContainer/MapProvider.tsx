import { APIProvider } from "@vis.gl/react-google-maps";
import type { ReactNode } from "react";

type MapElementProps = {
  children: ReactNode
}

export const MapProvider = ({ children }: MapElementProps) => (
  <APIProvider 
    apiKey={import.meta.env.VITE_MAPS_API_KEY}
    libraries={["visualization"]}
    >
    {children}
  </APIProvider>
)