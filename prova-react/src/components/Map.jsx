import React from "react";
import { usePlane } from "@react-three/cannon";

const Map = () => {
  /** Plane collider */
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.25, 0],
    material: {
      friction: 0.1
    }
  }));

  return (
    <mesh ref={ref} receiveShadow={true} scale={[15, 15, 15]}>
      <planeBufferGeometry />
      <meshPhongMaterial color={"skyblue"} receiveShadow />
    </mesh>
  );
};

export default Map;