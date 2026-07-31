import { useMap } from "react-leaflet";
import { useEffect } from "react";

function FlyToCity({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 9, { duration: 1.5 });
    }
  }, [center, map]);

  return null;
}

export default FlyToCity;
