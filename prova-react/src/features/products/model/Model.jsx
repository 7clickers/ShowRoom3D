import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSelector } from 'react-redux';
import { productByIDSelector } from "../productSlice";

const Model = ({ product, onRendered }) => {
  const glb = useGLTF(product.modelURL);
  const clonedScene = glb.scene.clone();
  const modelRef = useRef();
  const positionArray = [product.position.x, product.position.y, product.position.z];

  const selectedVariantID = product.selectedVariantID;
  const selectedVariant = product?.variants.find((variant) => variant.id === selectedVariantID);
  const color = selectedVariant?.color;
  
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.productID = product.id;
      onRendered(modelRef.current);
    }
  }, []);

  // Update materials and colors for each mesh in the cloned scene
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      const materialName = child.material.name;
      if (glb.materials.hasOwnProperty(materialName)) {
        child.material = child.material.clone();
        if (color) {
          child.material.color.set(color);
        }
      }
    }
  });

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.productID = product.id;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, product.id]);

  useEffect(() => {
    if (color) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color);
        }
      });
    }
  }, [color, modelRef]);

  return (
    <>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={product.scale}
        position={positionArray}
        renderOrder={1} 
      />
    </>
  );
};

export default Model;
