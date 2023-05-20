import { useContext } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setIntersectedProductID } from "./raycasterSlice";
import SidebarContext from "../../common/SidebarContext";
import useRaycasterLogic from "./useRaycasterLogic";

const Raycaster = ({ productObjects, decorObjects }) => {
  const { camera, raycaster, scene } = useThree();
  //raycaster.far = 5;

  const [intersects, setIntersects] = useState([]);

  const intersectedProductID = useSelector(
    (state) => state.raycaster.intersectedProductID
  );
  const dispatch = useDispatch();
  const { isSidebarVisible } = useContext(SidebarContext);
  const intersects = useRaycasterLogic(camera, raycaster, productObjects);

  useEffect(() => {
    const handleMouseMove = (event) => {
  
      // Update the raycaster's position
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  
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
    if (!isSidebarVisible) {
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        let intersectedProductID = intersectedObject.productID;
  
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
