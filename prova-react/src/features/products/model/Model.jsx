import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useSelector } from 'react-redux';
import { productByIDSelector } from "../productSlice";

const Model = ({ product, onRendered }) => {
  const selectedVariantID = product.selectedVariantID;
  const glb = useGLTF(product.modelURL);
  const clonedScene = glb.scene.clone();
  const modelRef = useRef();
  const positionArray = [product.position.x, product.position.y, product.position.z];
  
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.productID = product.id;
      onRendered(modelRef.current);
    }
  }, []);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.productID = product.id;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, selectedVariantID, product.id]);

  useEffect(() => {
    const selectedVariant = product?.variants.find((variant) => variant.id === selectedVariantID);
    const color = selectedVariant?.color;

    console.log('Model: selectedVariantID', selectedVariantID);
  console.log('Model: color', color);
  
    modelRef.current?.traverse((child) => {
      if (child.isMesh) {
        if (color) {
          child.material.color.set(color);
        } else {
          child.material.color.set(child.material.originalColor);
        }
      }
    });
  }, [selectedVariantID, product]);

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
