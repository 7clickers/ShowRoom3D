import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import useOctree from "../../common/useOctree";
import useOctreeHelper from "../../common/useOctreeHelper";
import Player from "../player/Player";

export default function Map() {
  const { nodes, scene } = useGLTF("src/assets/map/fondale.glb");
  const octree = useOctree(scene);
  console.log("scene::", nodes.scene);
  useOctreeHelper(octree);

  const colliders = useRef([]);

  return (
    <>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Landscape001.geometry}
          material={nodes.Landscape001.material}
          rotation={[0, 1.57, 0]}
        />
      </group>
      <Player octree={octree} colliders={colliders.current} />
    </>
  );
}
