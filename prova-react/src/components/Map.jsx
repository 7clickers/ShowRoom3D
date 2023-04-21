import React, { Suspense } from "react";
import { usePlane } from "@react-three/cannon";
import { useTexture, useGLTF } from "@react-three/drei";
import { RepeatWrapping } from "three";

import sandTextureURL from "../assets/color.jpg";
import fondaleModelURL from "../assets/fondale.glb";
import Test from "./Test.jsx";

const Map = () => {
  // Load sand texture
  const sandTexture = useTexture(sandTextureURL, undefined, (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(20, 20);
  });

  // Load Fondale model
  const { scene } = useGLTF(fondaleModelURL);

  console.log("Texture loaded:", sandTexture);
  console.log("Scene:", scene);

  // Apply texture to the model's mesh
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.map = sandTexture;
      child.material.needsUpdate = true;
    }
  });

  // Plane collider
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.25, 0],
    material: {
      friction: 0.1,
    },
  }));

  return (
    <>
      {/* Fondale model */}
      <primitive object={scene} />
      <Test />
    </>
  );
};

export default Map;
