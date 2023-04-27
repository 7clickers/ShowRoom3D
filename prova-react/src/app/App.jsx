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
        <fog attach="fog" color="midnightblue" near={3} far={30} />
          <Scene />
        </Canvas>
      </ProductInteractionContext.Provider>
    </>
  );
}
