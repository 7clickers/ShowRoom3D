import React, { useEffect, useRef, useState } from "react";

// Physics
import { Physics } from "@react-three/cannon";

// Three
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

import Player from "./Player.jsx";
import Map from "./Map.jsx";
import Lights from "./Lights.jsx";

export const Scene = () => {
  const { camera, gl } = useThree();
  const controls = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  return (
    <>
      {/** Pointer lock */}
      <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Lighting */}
      <Lights />
      {/** Physic objects */}
      <Physics
        gravity={[0, -9.81, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        {/** Player */}
        <Player position={[-5, 0, -5]} args={[0.5]}/>
        {/** Plane */}
        <Map />
      </Physics>
    </>
  );
};
