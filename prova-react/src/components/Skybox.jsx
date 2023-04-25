import React from "react";
import { Sky } from "@react-three/drei";
import * as THREE from "three";

const imageAssembler = () => {
  const bk = new THREE.TextureLoader().load("./src/assets/skybox/uw_bk.jpg");
  const up = new THREE.TextureLoader().load("./src/assets/skybox/uw_up.jpg");
  const dn = new THREE.TextureLoader().load("./src/assets/skybox/uw_dn.jpg");
  const ft = new THREE.TextureLoader().load("./src/assets/skybox/uw_ft.jpg");
  const rt = new THREE.TextureLoader().load("./src/assets/skybox/uw_rt.jpg");
  const lf = new THREE.TextureLoader().load("./src/assets/skybox/uw_lf.jpg");
  
  let materialArray = [];

  materialArray.push(new THREE.MeshBasicMaterial( { map: ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: lf }));
   
  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

  return materialArray;
}

const Skybox = (props) => {
  const ar = imageAssembler();
  return (
    <>
    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} {...props} />
    <mesh material={ar}>
      <boxBufferGeometry attach="geometry" args={[1000,1000,1000]} />
    </mesh>
    </>
  );
}

export default Skybox;