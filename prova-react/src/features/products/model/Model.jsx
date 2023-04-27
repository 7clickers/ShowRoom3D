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
  }, []);

    // Traverse the clonedScene and enable castShadow for each mesh
    useEffect(() => {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
    }, [clonedScene]);

  return (
    <>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={scale}
        position={position}
        renderOrder={1} 
      />
    </>
  );
};

export default Model;
