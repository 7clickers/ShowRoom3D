import React from "react";

import { Environment } from "@react-three/drei";

import Map from "../map/Map";
import PointerLock from "../pointerLock/pointerLock";

const Scene = () => {

  return (
    <>
     <PointerLock />
      <Environment
        files={[
          "src/assets/map/enviroment/px.png",
          "src/assets/map/enviroment/nx.png",
          "src/assets/map/enviroment/py.png",
          "src/assets/map/enviroment/ny.png",
          "src/assets/map/enviroment/pz.png",
          "src/assets/map/enviroment/nz.png",
        ]}
        background
      />
      <Map />
    </>
  );
};

export default Scene;
