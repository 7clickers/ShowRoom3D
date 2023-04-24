import React from "react";
import { Sky } from "@react-three/drei";

const Skybox = (props) => {
  return (
    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} {...props} />
  )
}

export default Skybox;
