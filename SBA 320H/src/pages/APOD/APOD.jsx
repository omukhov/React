import { useEffect, useState, useContext } from "react";
import { getAPOD } from "../../api/space.js";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import styles from "./APOD.module.css";

function APOD() {
  const [apod, setApod] = useState(null);
  // Using context and get loader function
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // Start loader
        startLoading();
        const data = await getAPOD();
        setApod(data);
      } catch (err) {
        console.error("Failed to load APOD:", err);
      } finally {
        // Stop loader
        stopLoading();
      }
    };

    fetchAPOD();
  }, []);

  if (!apod) return null;

  return (
    <div className={styles.wrapper}>
      {apod.media_type === "image" && (
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${apod.url})` }}
        />
      )}

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.dateTag}>{apod.date}</span>
            {apod.copyright && (
              <span className={styles.copyrightTag}>
                © {apod.copyright.trim()}
              </span>
            )}
          </div>
          <h1 className={styles.title}>{apod.title}</h1>
        </div>

        <div className={styles.mediaContainer}>
          {apod.media_type === "image" ? (
            <a
              href={apod.hdurl || apod.url}
              target="_blank"
              rel="noreferrer"
              title="Open HD image"
            >
              <img src={apod.url} alt={apod.title} className={styles.image} />
            </a>
          ) : (
            <div className={styles.videoWrapper}>
              <iframe
                src={apod.url}
                title={apod.title}
                allowFullScreen
                className={styles.video}
              />
            </div>
          )}
        </div>

        <article className={styles.descriptionCard}>
          <h2 className={styles.cardHeading}>Explanation</h2>
          <p className={styles.explanation}>{apod.explanation}</p>
        </article>
      </div>
    </div>
  );
}

export default APOD;
