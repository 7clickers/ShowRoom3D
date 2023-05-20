import { useState, useEffect } from "react";
import * as THREE from "three";

const useRaycasterLogic = (camera, raycaster, productObjects, decorObjects) => {
  const [intersects, setIntersects] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
  
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  
      const newIntersects = raycaster.intersectObjects([...productObjects, ...decorObjects]);
      setIntersects(newIntersects);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, raycaster, productObjects, decorObjects]);

  return intersects;
};

export default useRaycasterLogic;
