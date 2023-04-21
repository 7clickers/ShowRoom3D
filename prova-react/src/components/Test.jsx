import React from "react";
import { useTexture } from "@react-three/drei";

import testTextureURL from "../assets/color.jpg";

const Test = () => {
  const sandTexture = useTexture(testTextureURL);
  return (
    <mesh>
      <boxBufferGeometry args={[10, 10, 10]} />
      <meshStandardMaterial map={sandTexture} />
    </mesh>
  );
};

export default Test;
