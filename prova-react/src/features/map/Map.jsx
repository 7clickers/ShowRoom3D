import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import useOctree from "../../common/useOctree";
import useOctreeHelper from "../../common/useOctreeHelper";
import Player from "../player/Player";
import Lights from "../lights/Lights";
import Models from "../products/Models";
import Raycaster from "../raycaster/Raycaster";

export default function Map() {

  const [productObjects, setProductObjects] = useState([]);

  const handleModelsRendered = (renderedObjects) => {
    setProductObjects(renderedObjects);
  };

  const [intersectedProductName, setIntersectedProductName] = useState(null);

  const handleIntersectedProduct = (productName) => {
    setIntersectedProductName(productName);
  };


  const { nodes, scene } = useGLTF("src/assets/map/fondale.glb");
  const octree = useOctree(scene);
  useOctreeHelper(octree);

  const colliders = useRef([]);

  return (
    <>
      <group dispose={null}>
        <mesh
          receiveShadow
          geometry={nodes.Landscape001.geometry}
          material={nodes.Landscape001.material}
          rotation={[0, 1.57, 0]}
        />
      </group>
      <Lights />
      <Player octree={octree} colliders={colliders.current} />
      <Models octree={octree} onRendered={handleModelsRendered} />
      <Raycaster productObjects={productObjects} />
    </>
  );
}