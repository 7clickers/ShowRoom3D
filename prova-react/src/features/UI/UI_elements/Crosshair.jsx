import React from "react";
import { useContext } from "react";
import ProductInteractionContext from "../../../common/ProductInteractionContext";
import "../ui.css";

const Crosshair = () => {
  const { intersectedProductID } = useContext(ProductInteractionContext);
  let crosshairClass = "crosshair";

  if (intersectedProductID === "decoration") {
    crosshairClass += " crosshair-red-x";
  } else if (intersectedProductID) {
    crosshairClass += " crosshair-yellow";
  }

  return <div className={crosshairClass}></div>;
};

export default Crosshair;
