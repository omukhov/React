import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import { getNearEarthObjects } from "../../api/earth.js";
import styles from "./NearEarthObjects.module.css";
import { GiAsteroid } from "react-icons/gi";
import {
  LuRuler,
  LuRocket,
  LuExternalLink,
  LuTriangleAlert,
  LuClock,
  LuGlobe,
} from "react-icons/lu";

function NearEarthObjects() {
  const [asteroids, setAsteroids] = useState([]);
  const [filterHazardous, setFilterHazardous] = useState(false);

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchObjectNearEarth = async () => {
      try {
        startLoading();
        const data = await getNearEarthObjects();
        setAsteroids(data);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };

    fetchObjectNearEarth();
  }, []);

  // Filter for potentiall hazard asteroids
  const filteredAsteroids = filterHazardous
    ? asteroids.filter((item) => item.is_potentially_hazardous_asteroid)
    : asteroids;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <GiAsteroid /> Near Earth Objects (NEO)
        </h1>
        <p className={styles.subtitle}>
          Asteroids passing near Earth today according to NASA NeoWs
        </p>

        <div className={styles.controls}>
          <button
            className={`${styles.filterBtn} ${!filterHazardous ? styles.active : ""}`}
            onClick={() => setFilterHazardous(false)}
          >
            All Objects ({asteroids.length})
          </button>
          <button
            className={`${styles.filterBtn} ${styles.dangerBtn} ${filterHazardous ? styles.activeDanger : ""}`}
            onClick={() => setFilterHazardous(true)}
          >
            <div className={styles.filterContainer}>
              <LuTriangleAlert className={styles.triangleAlert} /> Potentially
              Hazardous (
              {
                asteroids.filter((a) => a.is_potentially_hazardous_asteroid)
                  .length
              }
              )
            </div>
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {filteredAsteroids.map((asteroid) => {
          const closeApproach = asteroid.close_approach_data[0];
          const minDiameter = Math.round(
            asteroid.estimated_diameter.meters.estimated_diameter_min,
          );
          const maxDiameter = Math.round(
            asteroid.estimated_diameter.meters.estimated_diameter_max,
          );
          const speed = Math.round(
            closeApproach?.relative_velocity.kilometers_per_hour || 0,
          );
          const missDistance = Math.round(
            closeApproach?.miss_distance.kilometers || 0,
          );

          return (
            <div
              key={asteroid.id}
              className={`${styles.card} ${
                asteroid.is_potentially_hazardous_asteroid
                  ? styles.hazardous
                  : ""
              }`}
            >
              <div className={styles.cardHeader}>
                <h3>{asteroid.name.replace("(", "").replace(")", "")}</h3>
                {asteroid.is_potentially_hazardous_asteroid && (
                  <span className={styles.badge}>HAZARDOUS</span>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <span>
                    <LuRuler /> Estimated Size:
                  </span>
                  <strong>
                    {minDiameter} - {maxDiameter} m
                  </strong>
                </div>

                <div className={styles.infoRow}>
                  <span>
                    <LuRocket /> Relative Speed:
                  </span>
                  <strong>{speed.toLocaleString()} km/h</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>
                    <LuGlobe /> Miss Distance:
                  </span>
                  <strong>{missDistance.toLocaleString()} km</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>
                    <LuClock /> Closest Approach:
                  </span>
                  <strong>
                    {closeApproach?.close_approach_date_full || "N/A"}
                  </strong>
                </div>
              </div>

              <a
                href={asteroid.nasa_jpl_url}
                target="_blank"
                rel="noreferrer"
                className={styles.detailsBtn}
              >
                JPL NASA Details <LuExternalLink />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NearEarthObjects;
