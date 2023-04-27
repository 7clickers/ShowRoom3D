
import { useTexture } from "@react-three/drei";
import { RepeatWrapping  } from "three";

const BeachBall = () => {

  const colorMap = useTexture("./src/assets/BeachBallColor.jpg");
  colorMap.wrapS = RepeatWrapping;
  colorMap.wrapT = RepeatWrapping;
  colorMap.repeat.set(3, 3);

  const transparentMap = useTexture("./src/assets/BeachBallTransp.jpg");

  return (
    <mesh ref={ballRef} position={[2, 10, 2]}>
      <sphereGeometry/>
      <meshPhysicalMaterial
        map={colorMap}
        alphaMap={transparentMap}
        roughness={0.8}
        metalness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.35}
      />
    </mesh>
  );
};

export default BeachBall;
