import React from "react";
import { usePlane } from "@react-three/cannon";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Color, MeshStandardMaterial } from "three";

import sandTextureURL from "../assets/map/color.jpg";
import displacementMapURL from "../assets/map/displacement.png";
import normalMapURL from "../assets/map/normal.jpg";
import ambientOcclusionMapURL from "../assets/map/ambientOcclusion.jpg";
import roughnessMapURL from "../assets/map/roughness.jpg";
import Test from "./Test";

const Map = () => {
  // Load textures
  const sandTexture = useTexture(sandTextureURL, undefined, (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(20, 20);
  });
  const displacementMap = useTexture(displacementMapURL);
  const normalMap = useTexture(normalMapURL);
  const ambientOcclusionMap = useTexture(ambientOcclusionMapURL);
  const roughnessMap = useTexture(roughnessMapURL);

  // Material
  const material = new MeshStandardMaterial({
    map: sandTexture,
    displacementMap: displacementMap,
    displacementScale: 1,
    normalMap: normalMap,
    aoMap: ambientOcclusionMap,
    roughnessMap: roughnessMap,
    color: new Color(0xffedab), // Adjust color to be more yellowish like sand
  });

  // Ground size
  const groundSize = 50;

  // Plane collider
  const [ref] = usePlane(() => ({
    args: [groundSize, groundSize],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0], // Match the position of the terrain
    material: {
      friction: 0.1,
    },
  }));

  return (
    <>
      {/* Ground */}
      <mesh ref={ref} material={material} >
        <planeBufferGeometry args={[groundSize, groundSize, 100, 100]} />
      </mesh>
      <Test />
    </>
  );
};

export default Map;
