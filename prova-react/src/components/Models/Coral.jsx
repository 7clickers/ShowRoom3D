import { useGLTF } from "@react-three/drei";

const Coral = (props) => {
  const glb = useGLTF(props.glbURL);
  const clonedScene = glb.scene.clone();

  return (
    <primitive object={clonedScene} scale={props.scale} position={props.position} />
  );
};

export default Coral;
