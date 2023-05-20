import React from "react";
import { useContext } from "react";
import ProductInteractionContext from "../../../common/ProductInteractionContext";
import "../ui.css";

const Crosshair = () => {
  const { intersectedProductID } = useContext(ProductInteractionContext);
  const crosshairClass = intersectedProductID ? "crosshair crosshair-yellow" : "crosshair";

  return <div className={crosshairClass}></div>;
};

export default Crosshair;
