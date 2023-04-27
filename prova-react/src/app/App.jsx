import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../features/scene/Scene";
import UI from "../features/UI/UI";
import ProductInteractionContext from "../common/ProductInteractionContext";

export default function App() {
  const [intersectedProductName, setIntersectedProductName] = useState(null);

  return (
    <>
      <ProductInteractionContext.Provider value={{ intersectedProductName, setIntersectedProductName }}>
        <UI />
        <Canvas>
          <Scene />
        </Canvas>
      </ProductInteractionContext.Provider>
    </>
  );
}
