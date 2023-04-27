import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Model from './model/Model';

const Models = ({ onRendered }) => {
  const products = useSelector((state) => state.product.products);
  const [renderedObjects, setRenderedObjects] = useState([]);

  useEffect(() => {
    if (renderedObjects.length === products.length) {
      onRendered(renderedObjects);
    }
  }, [renderedObjects, products, onRendered]);

  const handleModelRendered = (modelObject) => {
    setRenderedObjects((prev) => [...prev, modelObject]);
  };

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
            onRendered={handleModelRendered}
          />
        );
      })}
    </>
  );
};

export default Models;
