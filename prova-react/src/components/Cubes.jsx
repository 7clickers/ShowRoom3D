import React from "react";
import { useTexture } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import testTextureURL from "../assets/black.jpg";

const Cubes = () => {
  const sandTexture = useTexture(testTextureURL);

  const [ref] = useBox(() => ({
    args: [5, 5, 5],
    position: [10, 10, 5],
    mass: 2,
    type: "dynamic",
  }));

  const [ref2] = useBox(() => ({
    args: [3, 3, 3],
    position: [11, 15, 3],
    mass: 1,
    type: "dynamic",
  }));

  return (
    <>
    <mesh ref={ref}>
      <boxBufferGeometry args={[5, 5, 5]} />
      <meshStandardMaterial map={sandTexture} />
    </mesh>
    <mesh ref={ref2}>
    <boxBufferGeometry args={[3, 3, 3]} />
    <meshStandardMaterial map={sandTexture} />
  </mesh>
    </>
  );
};

export default Cubes;
