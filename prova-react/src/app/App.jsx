import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "../features/scene/Scene";
import UI from "../features/UI/UI";

export default function App() {


  return (
    <>
      <UI />
      <Canvas>
        <Scene/>
      </Canvas>
    </>
  );
}
