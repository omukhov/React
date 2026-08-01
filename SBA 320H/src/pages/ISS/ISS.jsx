import { useEffect, useState, useContext, useRef } from "react";
import Globe from "react-globe.gl";
import { getISSCoords } from "../../api/earth.js";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import styles from "./ISS.module.css";
import * as THREE from "three";

// Load svg image ISS and convert it to texture for 3d
const textureLoader = new THREE.TextureLoader();
const issTexture = textureLoader.load(
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
);
// Image wiil always facing the virtual camera
const issMaterial = new THREE.SpriteMaterial({ map: issTexture });

function ISS() {
  const [trajectory, setTrajectory] = useState([]);
  const [iss, setIss] = useState(null);

  // Link 3d model for control camera
  const globeRef = useRef();
  const intervalRef = useRef(null);

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    // Show loader need for render loader only first time
    const fetchISSCoords = async (showLoader = false) => {
      try {
        if (showLoader) {
          startLoading();
        }

        const data = await getISSCoords();
        const lat = Number(data?.latitude);
        const lng = Number(data?.longitude);

        // isFinite guaranted get number, not NaN or undefined
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
          setIss({ latitude: lat, longitude: lng });

          // Set trajectory, but every point added to array, and i keep only last 500
          setTrajectory((prev) => [...prev.slice(-500), { lat, lng }]);

          if (globeRef.current) {
            // It smoothly rotates the globe to the ISS's current coordinates over 1,000 ms. Attitude it's height over earth
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

    // Interval need for geeting actual real coords iss every 5 second
    intervalRef.current = setInterval(() => {
      fetchISSCoords(false);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // If the coordinates are obtained, an array consisting of a single object with the parameter `alt: 0.1` is created.
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
        // Render ISS
        objectsData={issObject}
        objectLat={(d) => d.lat}
        objectLng={(d) => d.lng}
        objectAltitude={(d) => d.alt}
        objectThreeObject={() => {
          const sprite = new THREE.Sprite(issMaterial);
          sprite.scale.set(12, 12, 1); // Size ISS icon
          return sprite;
        }}
        // Render trajectory of path
        pathsData={trajectory.length >= 2 ? [trajectory] : []}
        pathPointLat={(d) => d.lat}
        pathPointLng={(d) => d.lng}
        pathPointAltitude={0.03}
        pathColor={() => "orange"}
        pathStroke={2}
        // Atmosphere of Earth
        atmosphereColor="#4aa3ff"
        atmosphereAltitude={0.25}
      />
    </div>
  );
}

export default ISS;
