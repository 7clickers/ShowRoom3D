import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const Model = (props) => {
  const { id, position, scale, modelURL, onRendered } = props;
  const glb = useGLTF(modelURL);
  const clonedScene = glb.scene.clone();
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      onRendered(modelRef.current);
    }
  }, []); // Empty array as dependency
  

  return (
    <>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={scale}
        position={position}
      />
    </>
  );
};

export default Model;
