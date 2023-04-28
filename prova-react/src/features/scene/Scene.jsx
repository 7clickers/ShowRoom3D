import React, { useEffect, useRef, useContext } from "react";
import { useThree } from "@react-three/fiber";
import { Environment, PointerLockControls } from "@react-three/drei";

import Map from "../map/Map";
import SidebarContext from "../../common/SidebarContext";

const Scene = () => {
  // Get camera and gl objects from useThree
  const { camera, gl } = useThree();
  // Create a useRef to control the pointer
  const controls = useRef();
  const { isSidebarVisible } = useContext(SidebarContext);

  // Set the pointer lock when the user clicks on the document
  useEffect(() => {
    const handleFocus = (event) => {
      if (!isSidebarVisible && event.target === gl.domElement) {
        controls.current.lock();
      }
    };
  
    document.addEventListener("mousedown", handleFocus);
  
    return () => {
      document.removeEventListener("mousedown", handleFocus);
    };
  }, [gl, isSidebarVisible]);
  

  useEffect(() => {
    if (isSidebarVisible) {
      controls.current.unlock();
    }
  }, [isSidebarVisible]);

  return (
    <>
      {/** Pointer lock */}
      <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Lighting */}
      <Environment files="src/assets/map/bg2.hdr" background />

      {/** Player */}
      {/** Map */}
      <Map />
    </>
  );
};

export default Scene;
