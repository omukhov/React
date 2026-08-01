import { useMap } from "react-leaflet";
import { useEffect } from "react";

// Smooth camera flight effect over the map get props array with coords
function FlyToCity({ center }) {
  // Map object
  const map = useMap();
  useEffect(() => {
    if (center) {
      // smooth fly to coords
      map.flyTo(center, 9, { duration: 1.5 });
    }
  }, [center, map]);

  return null;
}

export default FlyToCity;
