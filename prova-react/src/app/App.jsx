import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../features/scene/Scene";
import UI from "../features/UI/UI";
import ProductInteractionContext from "../common/ProductInteractionContext";
import SidebarContext from "../common/SidebarContext";

export default function App() {
  const [intersectedProductID, setIntersectedProductID] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      <ProductInteractionContext.Provider value={{ intersectedProductID, setIntersectedProductID }}>
        <SidebarContext.Provider value={{ isSidebarVisible, setIsSidebarVisible }}>
          <UI />     
          <Canvas shadows>
            <fog attach="fog" color="black" near={3} far={30} />
            <Scene />
          </Canvas>
        </SidebarContext.Provider>
      </ProductInteractionContext.Provider>
    </>
  );
}
