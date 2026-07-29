import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Earth() {
  // get link
  const earth = useRef();

  // load earth model
  const { scene } = useGLTF("/models/loader.glb");

  useFrame(() => {
    earth.current.rotation.y -= 0.05;
  });

  return <primitive ref={earth} object={scene} scale={1.5} />;
}

export default Earth;
