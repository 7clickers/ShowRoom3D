import React, { useEffect, useRef, useState } from "react";

// Fisica
import { Physics, Debug } from "@react-three/cannon";

// Three
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

// Componenti personalizzati
import Player from "./Player.jsx";
import Map from "./Map.jsx";
import Lights from "./Lights.jsx";
import Cubes from "./Cubes.jsx";
import Skybox from "./Skybox.jsx";

export const Scene = () => {
  // Ottieni oggetti camera e gl da useThree
  const { camera, gl } = useThree();
  // Creare un useRef per controllare il puntatore
  const controls = useRef();

  // Imposta il puntatore al blocco quando l'utente fa clic sul documento
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
      {/** Blocco del puntatore */}
      <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Illuminazione */}
      <Skybox />
      <Lights />
      {/** Oggetti fisici */}
      <Physics
        gravity={[0, -9.81, 0]} // gravità
        tolerance={0} // tolleranza
        iterations={50} // iterazioni
        broadphase={"SAP"} // algoritmo di fase ampia
      >
          {/** Giocatore */}
          <Player position={[0, 5, 0]} args={[0.5]}/>
          {/** Mappa */}
          <Map />
          <Cubes />
      </Physics>
    </>
  );
};
