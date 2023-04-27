import { useState, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";

import { debounce } from "../../common/debounce";

const Raycaster = ({ productObjects }) => {
  const { camera, raycaster, scene } = useThree();

  const [intersects, setIntersects] = useState([]);

  useEffect(() => {
    const handleMouseMove = debounce((event) => {
      // Get the position of the mouse on the screen
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the raycaster's position
      raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);

      // Check for intersections
      const newIntersects = raycaster.intersectObjects(productObjects);
      setIntersects(newIntersects);
    }, 0); // Debounce time in milliseconds

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, raycaster, productObjects]);

  useFrame(() => {
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      if (intersectedObject) {
        console.log(`Intersecting with product ${intersectedObject.name}`);
      }
    }
  });

  return null;
};

export default Raycaster;
