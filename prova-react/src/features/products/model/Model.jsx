import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const Model = (props) => {
  const { id, position, scale, modelURL } = props;
  const glb = useGLTF(modelURL);
  const clonedScene = glb.scene.clone();

  return (
    <>
      <primitive
        object={clonedScene}
        scale={scale}
        position={position}
      />
    </>
  );
};

export default Model;