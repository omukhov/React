import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={2} />

          <directionalLight position={[5, 5, 5]} intensity={3} />

          <Earth />
        </Canvas>
      </div>
    </div>
  );
}

export default Loader;
