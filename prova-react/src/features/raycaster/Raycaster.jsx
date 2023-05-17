import { useState, useEffect } from "react";
import * as THREE from 'three';
import { useThree, useFrame } from "@react-three/fiber";
import { useContext } from 'react';
import ProductInteractionContext from "../../common/ProductInteractionContext";
import SidebarContext from "../../common/SidebarContext";

const Raycaster = ({ productObjects, decorObjects }) => {
  const { camera, raycaster, scene } = useThree();
  //raycaster.far = 5;

  const [intersects, setIntersects] = useState([]);

  const { setIntersectedProductID } = useContext(ProductInteractionContext);
  const { isSidebarVisible } = useContext(SidebarContext);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Get the position of the mouse on the screen
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Update the raycaster's position
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
  
      // Check for intersections
      const newIntersects = raycaster.intersectObjects([...productObjects, ...decorObjects]);
      setIntersects(newIntersects);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, raycaster, productObjects, decorObjects]);
  

  useFrame(() => {
    if(!isSidebarVisible){
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        let intersectedProductID = intersectedObject.productID;
  
        if (intersectedObject) {
          setIntersectedProductID(intersectedProductID);
        }
      } else {
        setIntersectedProductID(null);
      }
    }
  });

  return null;
};

export default Raycaster;
