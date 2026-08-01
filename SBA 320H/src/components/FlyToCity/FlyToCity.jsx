import { useMap } from "react-leaflet";
import { useEffect } from "react";

// Smooth camera flight effect over the map get props array with coords
function FlyToCity({ center, zoom = 6 }) {
  // Map object
  const map = useMap();
  useEffect(() => {
    if (center && center[0] !== undefined && center[1] !== undefined) {
      // Smooth fly to coords
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);

  return null;
}

export default FlyToCity;
