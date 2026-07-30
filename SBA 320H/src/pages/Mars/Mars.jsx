import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { getMarsRoverPhotos } from "../../api/nasa.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./Mars.module.css";
import notFoundImage from "../../assets/images_not_found.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Mars() {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [rover, setRover] = useState("Curiosity");
  const [sol, setSol] = useState(102);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchMarsData = async (rover, sol) => {
    try {
      startLoading();
      const data = await getMarsRoverPhotos(rover, sol);
      setMarsPhotos(data);
      setHasSearched(true);
    } catch (err) {
      console.log(err);
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
      <h1 className={styles.title}>Mars Rover Gallery</h1>

      <div className={styles.contentArea}>
        {marsPhotos.length > 0 && (
          <Swiper
            className={styles.slider}
            modules={[Navigation, Pagination]}
            navigation={marsPhotos.length > 1}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
          >
            {marsPhotos.map((photo) => (
              <SwiperSlide key={photo.id} className={styles.slide}>
                <img className={styles.image} src={photo.img_src} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {hasSearched && marsPhotos.length === 0 && (
          <div className={styles.notFoundContainer}>
            <img
              src={notFoundImage}
              alt="Photos not found"
              className={styles.notFoundImg}
            />
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="select">
            Choose a rover
          </label>
          <select
            id="select"
            className={styles.select}
            value={rover}
            onChange={(e) => setRover(e.target.value)}
          >
            <option>Curiosity</option>
            <option>Perseverance</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="input">
            Choose a sol (one day in mars)
          </label>
          <input
            id="input"
            className={styles.input}
            type="number"
            value={sol}
            onChange={(e) => setSol(e.target.value)}
          />
        </div>

        <button className={styles.button} onClick={handlePhotos}>
          Get photos
        </button>
      </div>
    </div>
  );
}

export default Mars;
