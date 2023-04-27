import React, { useEffect, useRef, useState } from "react";


// Three
import { useThree } from "@react-three/fiber";
import { Environment, PointerLockControls } from "@react-three/drei";

// Componenti personalizzati
import Lights from "../lights/Lights.jsx";
import Map from "../map/Map.jsx";
import Skybox from "../skybox/Skybox.jsx";
import Models from "../models/Models.jsx";

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
      <Environment files="src/assets/map/bg2.hdr" background />
      <Lights />
      {/** Oggetti fisici */}

      {/** Giocatore */}
      {/** Mappa */}
      <Map />
      <Models />
    </>
  );
};
