import React, {useState} from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../features/scene/Scene";
import UI from "../features/UI/UI";
import SidebarContext from "../common/SidebarContext";

export default function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSceneLoaded,setSceneIsLoad]=useState(false);
  return (
    <>
      <SidebarContext.Provider value={{ isSidebarVisible, setIsSidebarVisible }}>
        {isSceneLoaded && <UI/>}     
        <Canvas shadows>
          <fog attach="fog" color="black" near={3} far={30} />
          <Scene sceneIsLoad={setSceneIsLoad}/>
        </Canvas>
      </SidebarContext.Provider>
    </>
  );
}