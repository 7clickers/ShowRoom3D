import React, {useState} from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../features/scene/Scene";
import UI from "../features/UI/UI";

export default function App() {
  const [isSceneLoaded,setSceneIsLoad]=useState(false);
  return (
    <>
      {isSceneLoaded && <UI/>}     
      <Canvas shadows>
        <fog attach="fog" color="black" near={3} far={30} />
        <Scene sceneIsLoad={setSceneIsLoad}/>
      </Canvas>
    </>
  );
}