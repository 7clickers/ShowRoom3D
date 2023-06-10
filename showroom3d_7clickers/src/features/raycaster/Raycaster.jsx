import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setIntersectedProductID } from "./raycasterSlice";
import useRaycasterLogic from "./useRaycasterLogic";

const Raycaster = ({ productObjects, decorObjects }) => {
  const { camera, raycaster } = useThree();
  //raycaster.far = 5;

  const intersectedProductID = useSelector(
    (state) => state.raycaster.intersectedProductID
  );
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector(state => state.ui.isSidebarVisible);
  const intersects = useRaycasterLogic(camera, raycaster, productObjects, decorObjects);
  
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
