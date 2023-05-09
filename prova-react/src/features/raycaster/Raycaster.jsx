import { useContext } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { setIntersectedProductID } from "./raycasterSlice";
import SidebarContext from "../../common/SidebarContext";
import useRaycasterLogic from "./useRaycasterLogic";

const Raycaster = ({ productObjects }) => {
  const { camera, raycaster } = useThree();
  const { isSidebarVisible } = useContext(SidebarContext);
  const intersects = useRaycasterLogic(camera, raycaster, productObjects);

  const intersectedProductID = useSelector(
    (state) => state.raycaster.intersectedProductID
  );
  const dispatch = useDispatch();

  useFrame(() => {
    if (!isSidebarVisible) {
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
