import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        {/* Canvas tag need for using Three.js library, everything should be
        inside of it */}
        <Canvas camera={{ position: [0, 0, 4] }}>
          {/* Setting Ambient/Background light and add 2 light sources */}
          <ambientLight intensity={2} />

          {/* Setting directional light, light will be up, right and front of model. 
          substantial volume for day light part and night dark part */}
          <directionalLight position={[5, 5, 5]} intensity={3} />

          <Earth />
        </Canvas>
      </div>
    </div>
  );
}

export default Loader;
