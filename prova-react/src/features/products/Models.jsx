import React from 'react';
import { useSelector } from 'react-redux';
import Model from './model/Model';

const Models = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <>
      {products.map((product) => {
        const position = [product.position.x, product.position.y, product.position.z];

        return (
          <Model
            key={product.id}
            id={product.id}
            position={position}
            scale={product.scale}
            modelURL={product.modelURL}
          />
        );
      })}
    </>
  );
};

export default Models;
