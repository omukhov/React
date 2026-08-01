import { useEffect, useState, useContext, useMemo } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { getEarthquakes } from "../../api/earth.js";
import styles from "./Earthquakes.module.css";
import MapEvents from "../../components/Map/Map.jsx";
import { getMagnitudeStyle } from "../../utils/HelperFunctions.jsx";
import {
  LuActivity,
  LuLayers,
  LuClock,
  LuMapPin,
  LuExternalLink,
  LuTriangleAlert,
} from "react-icons/lu";

function Earthquakes() {
  // List of earthquakes
  const [earthquakes, setEarthquakes] = useState([]);
  // State of minimum magnitude filter (all, 5, 6, 7)
  const [minMagFilter, setMinMagFilter] = useState("all");
  // State of choosen quake by uesr
  const [selectedQuakeId, setSelectedQuakeId] = useState(null);
  // Map center coords by default
  const [mapCenter, setMapCenter] = useState([20, 0]);
  // Map size
  const [mapZoom, setMapZoom] = useState(2);

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        startLoading();
        const data = await getEarthquakes();
        setEarthquakes(data || []);
      } catch (err) {
        console.error("Error fetching earthquakes:", err);
      } finally {
        stopLoading();
      }
    };

    fetchEarthquakes();
  }, []);

  // useMemo hook need cashing filter results, this function will be work only when earthquakes or minMagFilter change
  const filteredQuakes = useMemo(() => {
    if (minMagFilter === "all") return earthquakes;
    // Create new float variable from string
    const threshold = parseFloat(minMagFilter);
    // Get only magnitude >= my variable
    return earthquakes.filter((q) => (q.properties?.mag || 0) >= threshold);
  }, [earthquakes, minMagFilter]);

  // Hook'll be rendering only when filteredQuakes change, create array markers
  const markers = useMemo(() => {
    return (
      filteredQuakes
        // Filter quakes which have coords
        .filter((q) => q.geometry?.coordinates)
        .map((quake) => ({
          // GeoJSON get coords format like (lng, lat), by leaflet get (lat, lng), i change places
          id: quake.id,
          lat: quake.geometry.coordinates[1],
          lng: quake.geometry.coordinates[0],
          title: quake.properties.place || "Earthquake",
          description: `Magnitude ${quake.properties.mag}`,
        }))
    );
  }, [filteredQuakes]);

  const handleSelectQuake = (quake) => {
    if (quake.geometry?.coordinates) {
      // Get coords GeoJSON format
      const [lng, lat] = quake.geometry.coordinates;
      // Set choosen id
      setSelectedQuakeId(quake.id);
      // Set center of map
      setMapCenter([lat, lng]);
      // Set zoom
      setMapZoom(6);
    }
  };

  const mapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.title}>
            <LuActivity className={styles.titleIcon} /> Significant Seismic
            Monitor
          </h1>
          <p className={styles.subtitle}>
            Earthquakes of magnitude 5.5+ recorded over the past 30 days
          </p>
        </div>

        <div className={styles.filterGroup}>
          <button
            className={`${styles.filterBtn} ${minMagFilter === "all" ? styles.active : ""}`}
            onClick={() => setMinMagFilter("all")}
          >
            All M5.5+ ({earthquakes.length})
          </button>
          <button
            className={`${styles.filterBtn} ${minMagFilter === "6.0" ? styles.active : ""}`}
            onClick={() => setMinMagFilter("6.0")}
          >
            M 6.0+
          </button>
          <button
            className={`${styles.filterBtn} ${minMagFilter === "6.5" ? styles.active : ""}`}
            onClick={() => setMinMagFilter("6.5")}
          >
            M 6.5+
          </button>
          <button
            className={`${styles.filterBtn} ${minMagFilter === "7.0" ? styles.active : ""}`}
            onClick={() => setMinMagFilter("7.0")}
          >
            <LuTriangleAlert /> M 7.0+
          </button>
        </div>
      </header>

      <div className={styles.dashboard}>
        <div className={styles.mapWrapper}>
          <MapEvents
            mapUrl={mapUrl}
            markers={markers}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Recent Events</h2>
            <span className={styles.countBadge}>
              {filteredQuakes.length} recorded
            </span>
          </div>

          <div className={styles.quakeList}>
            {filteredQuakes.length === 0 ? (
              <div className={styles.emptyState}>
                No earthquakes found matching M{minMagFilter}+ in this timeframe
              </div>
            ) : (
              // Render quakes
              filteredQuakes.map((quake) => {
                // Get style for magnitude
                const magStyle = getMagnitudeStyle(quake.properties?.mag);
                // Check if id card equal selectedId
                const isSelected = selectedQuakeId === quake.id;
                // GeoJSON coords format look like [lng, lat, depth], depth - hypocenter depth in kilometers
                const depth = quake.geometry?.coordinates[2];

                return (
                  <div
                    key={quake.id}
                    className={`${styles.quakeCard} ${isSelected ? styles.selectedCard : ""}`}
                    onClick={() => handleSelectQuake(quake)}
                  >
                    <div className={styles.cardHeader}>
                      <div
                        className={styles.magBadge}
                        style={{
                          backgroundColor: magStyle.bg,
                          color: magStyle.color,
                          borderColor: magStyle.border,
                        }}
                      >
                        <span className={styles.magValue}>
                          {quake.properties?.mag?.toFixed(1) || "N/A"}
                        </span>
                        <span className={styles.magLabel}>
                          {magStyle.label}
                        </span>
                      </div>

                      <div className={styles.cardMainInfo}>
                        <h3 className={styles.placeTitle}>
                          <LuMapPin className={styles.inlineIcon} />
                          {quake.properties?.place || "Unknown location"}
                        </h3>

                        <div className={styles.metaGrid}>
                          <span className={styles.metaItem}>
                            <LuClock />
                            {quake.properties?.time
                              ? new Date(
                                  quake.properties.time,
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "N/A"}
                          </span>
                          {depth !== undefined && (
                            <span className={styles.metaItem}>
                              <LuLayers />
                              {depth.toFixed(1)} km depth
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {quake.properties?.url && (
                      <a
                        href={quake.properties.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.detailsLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        USGS Details <LuExternalLink />
                      </a>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Earthquakes;
