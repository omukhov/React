import { Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import notFoundImg from "../../assets/NotFound.png";
import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.overlay}>
      <img src={notFoundImg} alt="404 Background" className={styles.bgImage} />

      <div className={styles.backdrop} />

      <div className={styles.content}>
        <h1 className={styles.title}>404 Not Found</h1>
        <Link to="/" className={styles.homeBtn}>
          <LuArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
}
