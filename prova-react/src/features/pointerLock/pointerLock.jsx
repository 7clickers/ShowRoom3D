import { useEffect, useContext } from "react";
import { useThree } from "@react-three/fiber";
import { PointerLockControls as ThreePointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

import SidebarContext from "../../common/SidebarContext";

const PointerLock = () => {
  const { camera, gl } = useThree();
  const { isSidebarVisible } = useContext(SidebarContext);

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
    const handleFocus = (event) => {
      if (!isSidebarVisible && event.target === gl.domElement) {
        gl.domElement.requestPointerLock();
      }
    };

    document.addEventListener("mousedown", handleFocus);

    return () => {
      document.removeEventListener("mousedown", handleFocus);
    };
  }, [gl, isSidebarVisible]);

  useEffect(() => {
    if (isSidebarVisible) {
      document.exitPointerLock();
    }
  }, [isSidebarVisible]);

  useEffect(() => {
    if (!isSidebarVisible) {
      gl.domElement.requestPointerLock();
    }
  }, [isSidebarVisible, gl]);

  return null;

}

export default PointerLock;