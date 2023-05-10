import { useState, useRef, useEffect } from 'react';
//import * as THREE from 'three';
import { Vector3, Object3D } from 'three';
import { SpotLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

function Flashlight({ position, rotation }) {
  const ref = useRef();
  const {scene, camera} = useThree();
  const vector= new Vector3(0,0,-5)
  const target = new Object3D(vector);
  camera.add(target);
  
  const [onOff, setOnOff] = useState(0);

  useEffect(() => {
    camera.add(ref.current);
    scene.add(camera);
  }, []);
 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyF') {
        if (onOff === 0) {
          ref.current.intensity=10;
          setOnOff(1)
        } else {
          ref.current.intensity=0;
          setOnOff(0)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOff])
    
  //useHelper(ref, SpotLightHelper, 'cyan')

  return (
    <spotLight
      ref={ref}
      color={"#dcfafc"}
      position={[0,0,0.2]}
      angle={Math.PI / 6}
      penumbra={0.3}
      intensity={0}
      decay={0}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0001}
      target={target}
    />
  )
}

export default Flashlight

