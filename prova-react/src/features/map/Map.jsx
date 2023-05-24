import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import useOctree from "../../common/useOctree";
import useOctreeHelper from "../../common/useOctreeHelper";
import Player from "../player/Player";
import Lights from "../lights/Lights";
import Models from "../products/Models";
import Raycaster from "../raycaster/Raycaster";
import Decorations from "../decorations/Decorations";
import Flashlight from "../flashlight/Flashlight";

export default function Map() {

  const [productObjects, setProductObjects] = useState([]);

  const handleModelsRendered = (renderedObjects) => {
    setProductObjects(renderedObjects);
  };

  const [intersectedProductName, setIntersectedProductName] = useState(null);

  const handleIntersectedProduct = (productName) => {
    setIntersectedProductName(productName);
  };

  const { nodes, materials, scene } = useGLTF("src/assets/map/map_no_tunnel_texture.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);
  const colliders = useRef([]);

  return (
    <>
      {/*  <group dispose={null}>
        <mesh
          receiveShadow
          geometry={nodes.Landscape001.geometry}
          material={nodes.Landscape001.material}
          rotation={[0, 1.57, 0]}
        />
      </group> */}
      <group dispose={null}>
        <group
          position={[-9.95, 0, -29.29]}
          rotation={[-Math.PI / 2, 0, 0.761]}
          scale={[0.014, 0.014, 0.015]}
        >
          <group position={[0, -0.0002, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-0.0001, 0, -0.0002]}>
              <group position={[-0.0001, 0, -0.0002]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0.geometry}
                  material={materials.cliff}
                  position={[-0.0001, 0, -0.0002]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          position={[-40.46, 0, 3.47]}
          rotation={[-Math.PI / 2, 0, 2.352]}
          scale={[0.017, 0.017, 0.015]}
        >
          <group position={[-0.0001, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cliff_cliff_0001.geometry}
              material={materials["cliff.001"]}
            />
          </group>
        </group>
        <group
          position={[48.1, 0, 27.4]}
          rotation={[-Math.PI / 2, 0, -2.2528]}
          scale={[0.016, 0.016, 0.015]}
        >
          <group position={[0.0001, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0, 0, 0.0004]}>
              <group position={[0, 0, 0.0004]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0002.geometry}
                  material={materials["cliff.002"]}
                  position={[0, 0, 0.0004]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          position={[19.61, 0, 14.13]}
          rotation={[-Math.PI / 2, 0, -1.3495]}
          scale={[0.008, 0.005, 0.018]}
        >
          <group position={[0, 0.0004, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0.0002, 0, 0.0002]}>
              <group position={[0.0002, 0, 0.0002]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0003.geometry}
                  material={materials["cliff.003"]}
                  position={[0.0002, 0, 0.0002]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          position={[76.64, 0, -3.9]}
          rotation={[-Math.PI / 2, 0, -0.761]}
          scale={0.015}
        >
          <group position={[0.0002, -0.0003, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-0.0003, 0, 0.0001]}>
              <group position={[-0.0003, 0, 0.0001]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0004.geometry}
                  material={materials["cliff.004"]}
                  position={[-0.0003, 0, 0.0001]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          position={[38.42, 0, -29.29]}
          rotation={[-Math.PI / 2, 0, 0.761]}
          scale={[0.017, 0.017, 0.015]}
        >
          <group position={[0, -0.0002, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0.0001, 0, 0]}>
              <group position={[0.0001, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0005.geometry}
                  material={materials["cliff.005"]}
                  position={[0.0001, 0, 0]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          position={[-4.17, 0, 26.43]}
          rotation={[-Math.PI / 2, 0, -2.2528]}
          scale={0.015}
        >
          <group position={[0.0001, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-0.0001, 0, 0]}>
              <group position={[-0.0001, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0006.geometry}
                  material={materials["cliff.006"]}
                  position={[-0.0001, 0, 0]}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          position={[19.38, 0, -14.04]}
          rotation={[-Math.PI / 2, 0, -0.761]}
          scale={[0.008, 0.005, 0.018]}
        >
          <group position={[0.0001, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <group position={[0.0001, 0, 0]}>
              <group position={[0.0001, 0, 0]}>
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.cliff_cliff_0007.geometry}
                  material={materials["cliff.007"]}
                  position={[0.0001, 0, 0]}
                />
              </group>
            </group>
          </group>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Landscape001.geometry}
          material={materials.Material}
          position={[16.49, 0, 0]}
          rotation={[0, 1.5705, 0]}
          scale={[1, 1, 2.21]}
        />
      </group>
      <Lights />
      <Flashlight />
      <Player octree={octree} colliders={colliders.current} />
      <Models octree={octree} onRendered={handleModelsRendered} />
      <Decorations octree={octree} />
      <Raycaster productObjects={productObjects} />
    </>
  );
}
