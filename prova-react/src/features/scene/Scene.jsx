import React, { useEffect, useRef, useState } from "react";


// Three
import { useThree } from "@react-three/fiber";
import { Environment, PointerLockControls } from "@react-three/drei";
import { useSelector } from "react-redux";

// Componenti personalizzati
import Lights from "../lights/Lights.jsx";
import Map from "../map/Map.jsx";
import Skybox from "../skybox/Skybox.jsx";
import Models from "../products/Models.jsx";
import Raycaster from "../raycaster/Raycaster.jsx";

const Scene = () => {

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

  const [productObjects, setProductObjects] = useState([]);

  const handleModelsRendered = (renderedObjects) => {
    setProductObjects(renderedObjects);
  };

  const [intersectedProductName, setIntersectedProductName] = useState(null);

  const handleIntersectedProduct = (productName) => {
    setIntersectedProductName(productName);
  };


  return (
    <>
      {/** Blocco del puntatore */}
      <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Illuminazione */}
      <Environment files="src/assets/map/bg2.hdr" background />
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
        <Models onRendered={handleModelsRendered} />
        <Raycaster productObjects={productObjects} />
      </Physics>
    </>
  );
};

export default Scene;
