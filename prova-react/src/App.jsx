import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";

export default function App() {


  return (
    <>
      <Canvas>
        <Scene/>
      </Canvas>
    </>
  );
}
