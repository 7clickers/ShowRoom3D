import { useState, useEffect, useContext } from "react";
import * as THREE from 'three';
import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setIntersectedProductID } from "./raycasterSlice";
import SidebarContext from "../../common/SidebarContext";

const Raycaster = ({ productObjects }) => {
  const { camera, raycaster, scene } = useThree();
  //raycaster.far = 5;

  const [intersects, setIntersects] = useState([]);

  const { isSidebarVisible } = useContext(SidebarContext);

  const intersectedProductID = useSelector(
    (state) => state.raycaster.intersectedProductID
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Get the position of the mouse on the screen
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  
      // Update the raycaster's position
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
  
      // Check for intersections
      const newIntersects = raycaster.intersectObjects(productObjects);
      setIntersects(newIntersects);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, raycaster, productObjects]);
  

  useFrame(() => {
    if(!isSidebarVisible){
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const intersectedProductID = intersectedObject.productID;
  
        if (intersectedObject) {
          dispatch(setIntersectedProductID(intersectedProductID));
        }
      } else {
        dispatch(setIntersectedProductID(null));
      }
    }
  });

  return null;
};

export default Raycaster;
