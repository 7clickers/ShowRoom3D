import { useState, useEffect } from "react";
import * as THREE from "three";

const useRaycasterLogic = (camera, raycaster, productObjects) => {
  const [intersects, setIntersects] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
  
      const newIntersects = raycaster.intersectObjects(productObjects);
      setIntersects(newIntersects);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, raycaster, productObjects]);

  return intersects;
};

export default useRaycasterLogic;
