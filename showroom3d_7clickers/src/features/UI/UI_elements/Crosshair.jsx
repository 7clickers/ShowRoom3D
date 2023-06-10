import React from "react";
import { useSelector } from "react-redux";
import "../ui.css"

const Crosshair = () => {
  const intersectedProductID = useSelector(
    (state) => state.raycaster.intersectedProductID
  );
  let crosshairClass = "crosshair";

  if (intersectedProductID === "decoration") {
    crosshairClass += " crosshair-red-x";
  } else if (intersectedProductID) {
    crosshairClass += " crosshair-yellow";
  }
  return <div className={crosshairClass}></div>;
};

export default Crosshair;
