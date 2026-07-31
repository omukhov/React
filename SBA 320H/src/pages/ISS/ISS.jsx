import { useEffect, useState, useContext, useRef } from "react";
import Globe from "react-globe.gl";
import { getISSCoords } from "../../api/earth.js";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import styles from "./ISS.module.css";

function ISS() {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const intervalRef = useRef(null);
  const [iss, setIss] = useState(null);
  const globeRef = useRef();
  const [trajectory, setTrajectory] = useState([]);

  useEffect(() => {
    const fetchISSCoords = async (showLoader = false) => {
      try {
        if (showLoader) {
          startLoading();
        }

        const data = await getISSCoords();

        const lat = Number(data?.latitude);
        const lng = Number(data?.longitude);

        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          setIss({ latitude: lat, longitude: lng });

          setTrajectory((prev) => [...prev.slice(-500), { lat, lng }]);

          if (globeRef.current) {
            globeRef.current.pointOfView(
              {
                lat,
                lng,
                altitude: 2,
              },
              1000,
            );
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (showLoader) {
          stopLoading();
        }
      }
    };

    fetchISSCoords(true);

    intervalRef.current = setInterval(() => {
      fetchISSCoords(false);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const issPoint =
    iss && Number.isFinite(iss.latitude) && Number.isFinite(iss.longitude)
      ? [{ lat: iss.latitude, lng: iss.longitude }]
      : [];

  return (
    <div className={styles.container}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={issPoint}
        pointColor={() => "red"}
        pointRadius={0.6}
        pointAltitude={0.05}
        pathsData={trajectory.length >= 2 ? [trajectory] : []}
        pathPointLat={(d) => d.lat}
        pathPointLng={(d) => d.lng}
        pathPointAltitude={0.03}
        pathColor={() => "orange"}
        pathStroke={2}
        atmosphereColor="#4aa3ff"
        atmosphereAltitude={0.25}
      />
    </div>
  );
}

export default ISS;
