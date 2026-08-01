import MapEvents from "../../components/Map/Map.jsx";
import styles from "./Home.module.css";
import { getEarthEvents } from "../../api/earth.js";
import { useState, useEffect, useContext, useMemo } from "react";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import { LuGlobe, LuFlame, LuWind, LuMountain } from "react-icons/lu";
import { getCategoryBadge } from "../../utils/HelperFunctions.jsx";

function Home() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchEarthEvents = async () => {
      try {
        startLoading();
        const data = await getEarthEvents();
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching Earth events:", err);
      } finally {
        stopLoading();
      }
    };

    fetchEarthEvents();
  }, []);

  // Filter natural event
  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return events;
    return events.filter((e) =>
      // get categories which have activeCategory in a title
      e.categories[0]?.title?.toLowerCase().includes(activeCategory),
    );
  }, [events, activeCategory]);

  const markers = useMemo(() => {
    return filteredEvents
      .filter((e) => e.geometry && e.geometry[0]?.coordinates)
      .map((event) => ({
        id: event.id,
        lat: event.geometry[0].coordinates[1],
        lng: event.geometry[0].coordinates[0],
        title: event.title,
        description: event.categories[0]?.title,
      }));
  }, [filteredEvents]);

  const handleSelectEvent = (event) => {
    if (event.geometry && event.geometry[0]?.coordinates) {
      const [lng, lat] = event.geometry[0].coordinates;
      setSelectedEventId(event.id);
      setMapCenter([lat, lng]);
      setMapZoom(6);
    }
  };

  const mapUrl =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>
            <LuGlobe className={styles.titleIcon} /> Earth Events Tracker
          </h1>
          <p className={styles.subtitle}>
            Natural events and hazards observed around the globe over the last 7
            days
          </p>
        </div>

        <div className={styles.filterGroup}>
          <button
            className={`${styles.filterBtn} ${activeCategory === "all" ? styles.active : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All ({events.length})
          </button>
          <button
            className={`${styles.filterBtn} ${activeCategory === "wildfire" ? styles.active : ""}`}
            onClick={() => setActiveCategory("wildfire")}
          >
            <LuFlame /> Fires
          </button>
          <button
            className={`${styles.filterBtn} ${activeCategory === "storm" ? styles.active : ""}`}
            onClick={() => setActiveCategory("storm")}
          >
            <LuWind /> Storms
          </button>
          <button
            className={`${styles.filterBtn} ${activeCategory === "volcano" ? styles.active : ""}`}
            onClick={() => setActiveCategory("volcano")}
          >
            <LuMountain /> Volcanoes
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
            <h2>Events List</h2>
            <span className={styles.countBadge}>
              {filteredEvents.length} active
            </span>
          </div>

          <div className={styles.eventList}>
            {filteredEvents.length === 0 ? (
              <div className={styles.emptyState}>
                No events found for this filter
              </div>
            ) : (
              filteredEvents.map((event) => {
                const categoryInfo = getCategoryBadge(
                  event.categories[0]?.title,
                );
                const isSelected = selectedEventId === event.id;

                return (
                  <div
                    key={event.id}
                    className={`${styles.eventCard} ${isSelected ? styles.selectedCard : ""}`}
                    onClick={() => handleSelectEvent(event)}
                  >
                    <div className={styles.cardTop}>
                      <span
                        className={styles.categoryBadge}
                        style={{
                          backgroundColor: `${categoryInfo.color}20`,
                          color: categoryInfo.color,
                          borderColor: `${categoryInfo.color}40`,
                        }}
                      >
                        {categoryInfo.icon}{" "}
                        {event.categories[0]?.title || "Event"}
                      </span>
                      <span className={styles.dateText}>
                        {event.geometry[0]?.date
                          ? new Date(
                              event.geometry[0].date,
                            ).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>

                    <h3 className={styles.eventTitle}>{event.title}</h3>
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

export default Home;
