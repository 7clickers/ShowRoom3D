import { useRef } from "react";
import { Vector3, Object3D } from 'three';
import { SpotLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const Lights = () => {
  const ref = useRef();
  const vector1= new Vector3(22, 8, -8);
  const vector2= new Vector3(200,280, 130);
  const vector3= new Vector3(-50,80, 90);
  const vector4= new Vector3(-10,35, -30);
  const target1 = new Object3D();
  const target2 = new Object3D();
  const target3 = new Object3D();
  const target4 = new Object3D();
  const { scene } = useThree();

  target1.position.copy(vector1);
  target2.position.copy(vector2);
  target3.position.copy(vector3);
  target4.position.copy(vector4);
  scene.add(target1);
  scene.add(target2);
  scene.add(target3);
  scene.add(target4);

  //useHelper(ref, SpotLightHelper, 'cyan')

    return (
      <>
        <spotLight
          
          color={"lightblue"}
          position={[15, 0.1, 0]}
          angle={Math.PI / 6}
          penumbra={0.2}
          intensity={15}
          decay={0.5}
          castShadow
          target={target1}
        />

        <spotLight
          color={"lightblue"}
          position={[15, 0.1, 4]}
          angle={Math.PI / 6}
          penumbra={0.2}
          intensity={15}
          decay={0.5}
          castShadow
          target={target2}
        />

        <spotLight
          color={"lightblue"}
          position={[24, 0.2, 2]}
          angle={Math.PI / 6}
          penumbra={0.2}
          intensity={15}
          decay={0.5}
          castShadow
          target={target3}
        />

        <spotLight
          ref={ref}
          color={"lightblue"}
          position={[25, 0.1, -2]}
          angle={Math.PI / 6}
          penumbra={0.2}
          intensity={15}
          decay={0.5}
          castShadow
          target={target4}
        />

        <directionalLight
          castShadow={true}
          position={[-20, 30, 0]}
          intensity={0.8}
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
          intensity={0.8}
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
  