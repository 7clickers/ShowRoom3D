import { useRef } from "react";
import { Vector3, Object3D } from 'three';
import { SpotLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Lights = () => {
const ref = useRef();
const vector1= new Vector3(22, 20, -8);
  const target1 = new Object3D();
  const { scene } = useThree();

  target1.position.copy(vector1);
  scene.add(target1);

  //useHelper(ref, SpotLightHelper, 'cyan')

    return (
      <>
          <spotLight
        ref={ref}
        color={"yellow"}
        position={[17, -2, -2.5]}
        angle={Math.PI / 9}
        penumbra={0.2}
        intensity={10}
        decay={0.5}
        castShadow
        target={target1}
      />
        <directionalLight
          castShadow={true}
          position={[-20, 30, 0]}
          intensity={0.4}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={10}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

<directionalLight
          castShadow={true}
          position={[20, 30, 0]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={10}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

      </>
    );
  };
  
  export default Lights;
  