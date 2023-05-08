import React from "react";
import { useSelector } from "react-redux";
import "../ui.css";

const Crosshair = () => {
  const intersectedProductID = useSelector(
    (state) => state.raycaster.intersectedProductID
  );
  
  const crosshairClass = intersectedProductID ? "crosshair crosshair-yellow" : "crosshair";

  return <div className={crosshairClass}></div>;
};

export default Crosshair;
