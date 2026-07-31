import { useEffect, useState, useContext, useRef } from "react";
import Globe from "react-globe.gl";
import { getISSCoords } from "../../api/earth.js";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import styles from "./ISS.module.css";
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const issTexture = textureLoader.load(
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
);
const issMaterial = new THREE.SpriteMaterial({ map: issTexture });

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

  const issObject =
    iss && Number.isFinite(iss.latitude) && Number.isFinite(iss.longitude)
      ? [{ lat: iss.latitude, lng: iss.longitude, alt: 0.1 }]
      : [];

  return (
    <div className={styles.container}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        objectsData={issObject}
        objectLat={(d) => d.lat}
        objectLng={(d) => d.lng}
        objectAltitude={(d) => d.alt}
        objectThreeObject={() => {
          const sprite = new THREE.Sprite(issMaterial);
          sprite.scale.set(12, 12, 1); // Размер картинки над глобусом
          return sprite;
        }}
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
