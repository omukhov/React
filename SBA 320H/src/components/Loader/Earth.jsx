import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Earth() {
  // Create link, useRef need for getting access to DOM element without rendering
  const earth = useRef();

  // Load earth model, useGLTF hook from Drei library for loading 3d models
  const { scene } = useGLTF("/models/loader.glb");

  // Hook from react three fiber, it start function for every frame
  useFrame(() => {
    earth.current.rotation.y -= 0.05;
  });

  // Loading my 3d model to jsx tree
  return <primitive ref={earth} object={scene} scale={1.5} />;
}

export default Earth;
