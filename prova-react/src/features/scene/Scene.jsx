import React, { useEffect, useRef, useState } from "react";

// Fisica
import { Physics, Debug } from "@react-three/cannon";

// Three
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

// Componenti personalizzati
import Player from "../player/Player.jsx";
import Lights from "../lights/Lights.jsx";
import Map from "../Map/Map.jsx";
import Skybox from "../skybox/Skybox.jsx";
import Models from "../models/Models.jsx";
import BeachBall from "../models/model/BeachBall.jsx";

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
        <Player />
        {/** Mappa */}
        <Map />
        <Models />
        <BeachBall/>
      </Physics>
    </>
  );
};
