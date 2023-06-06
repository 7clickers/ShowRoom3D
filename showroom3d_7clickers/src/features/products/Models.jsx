import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Model from './model/Model';

const Models = ({ onRendered, octree }) => {
  const products = useSelector((state) => state.product.products);
  const renderedObjects = useRef([]);

  const handleModelRendered = (modelObject) => {
    renderedObjects.current = [...renderedObjects.current, modelObject];
    if (renderedObjects.current.length === products.length) {
      onRendered(renderedObjects.current);
    }
  };
  
  return (
    <>
      {products.map((product) => {
        const position = [product.position.x, product.position.y, product.position.z];

        return (
          <Model
            octree={octree}
            key={product.id}
            id={product.id}
            product={product}
            onRendered={handleModelRendered}
          />
        );
      })}
    </>
  );
};

export default Models;
