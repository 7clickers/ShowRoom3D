import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../features/scene/Scene";
import UI from "../features/UI/UI";
import { Suspense } from "react";
import LoadingScreen from "../features/loadingScreen/LoadingScreen";

export default function App() {
  const [isSceneLoaded, setSceneIsLoad] = useState(false);
  return (
    <>
      {isSceneLoaded && <UI/>}     
      <Canvas shadows>
        <Suspense fallback={<LoadingScreen />}>
          <fog attach="fog" color="black" near={10} far={50} />
          <Scene sceneIsLoad={setSceneIsLoad}/>
        </Suspense>
      </Canvas>
    </>
  );
}