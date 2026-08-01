import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { getMarsRoverPhotos } from "../../api/space.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./Mars.module.css";
import notFoundImage from "../../assets/images_not_found.png";
import {
  LuRocket,
  LuSun,
  LuSearch,
  LuCamera,
  LuCalendar,
  LuInfo,
  LuImageOff,
} from "react-icons/lu";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Mars() {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [rover, setRover] = useState("Curiosity");
  const [sol, setSol] = useState(102);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchMarsData = async (roverName, solNumber) => {
    try {
      startLoading();
      const data = await getMarsRoverPhotos(roverName, solNumber);
      setMarsPhotos(data || []);
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching Mars photos:", err);
      setMarsPhotos([]);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchMarsData(rover, sol);
  }, []);

  const handlePhotos = () => {
    fetchMarsData(rover, sol);
  };

  return (
    <div className={styles.container}>
      {/* Header section */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <LuRocket className={styles.titleIcon} /> Mars Rover Photography
        </h1>
        <p className={styles.subtitle}>
          Explore imagery captured directly by NASA rovers on the Red Planet
        </p>
      </header>

      <div className={styles.controlsBar}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="rover-select">
            <LuRocket /> Rover
          </label>
          <select
            id="rover-select"
            className={styles.select}
            value={rover}
            onChange={(e) => setRover(e.target.value)}
          >
            <option value="Curiosity">Curiosity</option>
            <option value="Perseverance">Perseverance</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Spirit">Spirit</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="sol-input">
            <LuSun /> Martian Sol
          </label>
          <input
            id="sol-input"
            className={styles.input}
            type="number"
            min="0"
            value={sol}
            onChange={(e) => setSol(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handlePhotos}>
          <LuSearch /> Fetch Imagery
        </button>
      </div>

      <div className={styles.contentArea}>
        {marsPhotos.length > 0 && (
          <div className={styles.sliderWrapper}>
            <Swiper
              className={styles.slider}
              modules={[Navigation, Pagination]}
              navigation={marsPhotos.length > 1}
              pagination={{ clickable: true, dynamicBullets: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {marsPhotos.map((photo) => (
                <SwiperSlide key={photo.id} className={styles.slide}>
                  <div className={styles.imageFrame}>
                    <img
                      className={styles.image}
                      src={photo.img_src}
                      alt={`Mars photo by ${photo.rover?.name || rover}`}
                      loading="lazy"
                    />

                    {/* Image overlay metadata */}
                    <div className={styles.photoOverlay}>
                      <div className={styles.overlayItem}>
                        <LuCamera />
                        <span>
                          {photo.camera?.full_name ||
                            photo.camera?.name ||
                            "NavCam"}
                        </span>
                      </div>
                      {photo.earth_date && (
                        <div className={styles.overlayItem}>
                          <LuCalendar />
                          <span>Earth Date: {photo.earth_date}</span>
                        </div>
                      )}
                      <div className={styles.overlayItem}>
                        <LuInfo />
                        <span>Sol {photo.sol || sol}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.galleryBadge}>
              Showing {marsPhotos.length} captures
            </div>
          </div>
        )}

        {hasSearched && marsPhotos.length === 0 && (
          <div className={styles.notFoundContainer}>
            <div className={styles.notFoundCard}>
              <LuImageOff className={styles.notFoundIcon} />
              <h3>No Photography Found</h3>
              <p>
                No raw imagery recorded for <strong>{rover}</strong> on{" "}
                <strong>Sol {sol}</strong>. Try adjusting the Sol index or
                selecting another rover.
              </p>
              {notFoundImage && (
                <img
                  src={notFoundImage}
                  alt="Photos not found"
                  className={styles.notFoundImg}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mars;
