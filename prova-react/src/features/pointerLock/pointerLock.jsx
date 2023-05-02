import { useEffect, useContext } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls as ThreePointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

import SidebarContext from "../../common/SidebarContext";

const PointerLock = () => {
  const { camera, gl } = useThree();
  const { isSidebarVisible, setIsSidebarVisible } = useContext(SidebarContext);

  let controls;

  useEffect(() => {
    controls = new ThreePointerLockControls(camera, gl.domElement);
    controls.update = () => {}; // Add update function to the instance

    // Event listener for pointer lock change
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        controls.enabled = true;
      } else {
        controls.enabled = false;
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("pointerlockerror", () => {});

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      document.removeEventListener("pointerlockerror", () => {});
    };
  }, [camera, gl]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!isSidebarVisible && event.target === gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };
  
    document.addEventListener("mousedown", handleClick);
  
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [gl, isSidebarVisible]);
  

  useEffect(() => {
    if (isSidebarVisible) {
      document.exitPointerLock();
    }
    else{
      gl.domElement.requestPointerLock();
    }
  }, [isSidebarVisible]);


  useEffect(() => {
    gl.domElement.requestPointerLock();
  }, [gl]);

  return null;
};

export default PointerLock;
