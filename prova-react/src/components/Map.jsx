import React, { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Color, MeshStandardMaterial } from "three";
import { useHeightfield } from '@react-three/cannon'

import sandTextureURL from "../assets/map/color.jpg";
import displacementMapURL from "../assets/map/displacement.png";
import normalMapURL from "../assets/map/normal.jpg";
import ambientOcclusionMapURL from "../assets/map/ambientOcclusion.jpg";
import roughnessMapURL from "../assets/map/roughness.jpg";

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
if (context) context.imageSmoothingEnabled = false;
const scaleFactor = 0.1;

function createHeightfieldMatrix(image) {
  if (!context) {
    throw new Error('Heightfield could not be created');
  }
  const width = image.width;
  const height = image.height;
  const newWidth = Math.floor(width * scaleFactor);
  const newHeight = Math.floor(height * scaleFactor);
  const matrix = Array(newWidth);
  const row = Array(newHeight);
  const scale = 3;
  let p;

  canvas.width = newWidth;
  canvas.height = newHeight;
  context.drawImage(image, 0, 0, width, height, 0, 0, newWidth, newHeight);

  const { data } = context.getImageData(0, 0, newWidth, newHeight);

  for (let x = 0; x < newWidth; x++) {
    for (let y = 0; y < newHeight; y++) {
      p = (data[4 * (y * newWidth + x)] * scale) / 255;
      row[y] = Number(Math.max(0, p).toPrecision(2)) / 4;
    }
    matrix[x] = [...row];
  }
  context.clearRect(0, 0, newWidth, newHeight);
  return matrix;
}

const Map = () => {

  const heightfieldRef = useRef();

  // Load textures
  const sandTexture = useTexture(sandTextureURL, undefined, (texture) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(20, 20);
  });

  const colorMap = useTexture(sandTextureURL);
  const displacementMap = useTexture(displacementMapURL);
  const normalMap = useTexture(normalMapURL);
  const ambientOcclusionMap = useTexture(ambientOcclusionMapURL);
  const roughnessMap = useTexture(roughnessMapURL);

  const heights = useMemo(() => {
    return createHeightfieldMatrix(displacementMap.image);
  }, [displacementMap]);

  const elementSize = useMemo(() => {
    return 0.5;
  }, [displacementMap]);

  const mapWidth = displacementMap.image.width * scaleFactor * elementSize;
  const mapHeight = displacementMap.image.height * scaleFactor * elementSize;
  const mapCenter = [mapWidth / 2, 0, -mapHeight / 2];

  useHeightfield(() => ({
    ref: heightfieldRef,
    args: [heights, { elementSize }],
    position: mapCenter,
    rotation: [-Math.PI / 2, 0, -Math.PI],
  }));

  // Material
  const material = new MeshStandardMaterial({
    map: colorMap,
    displacementMap: displacementMap,
    displacementScale: 1,
    normalMap: normalMap,
    aoMap: ambientOcclusionMap,
    roughnessMap: roughnessMap,
    color: new Color(0xFFF3C5), // Adjust color to be more yellowish like sand
  });

  return (
    <>
      <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} position={[0,-0.25,0]}>
        <planeBufferGeometry args={[mapWidth, mapHeight, mapWidth - 1, mapHeight - 1]} />
      </mesh>
    </>
  );
};

export default Map;
