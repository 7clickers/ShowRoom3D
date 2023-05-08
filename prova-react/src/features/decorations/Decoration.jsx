import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Decoration = ({ decoration, octree }) => {
  const draco = new DRACOLoader();
  draco.setDecoderConfig({ type: 'js' });
  draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  const glb = useGLTF(decoration.modelURL);
  const clonedScene = glb.scene.clone();

  const positionArray = [decoration.position.x, decoration.position.y, decoration.position.z];

  useEffect(() => {octree.fromGraphNode(clonedScene);},[]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, decoration.id]);

  return (
    <>
      <primitive
        object={clonedScene}
        scale={decoration.scale}
        position={positionArray}
      />
    </>
  );
};

export default Decoration;
