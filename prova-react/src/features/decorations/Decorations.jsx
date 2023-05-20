import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Decoration from './Decoration';

const Decorations = ({ onRendered, octree }) => {
  const decorations = useSelector((state) => state.decoration.decorations);

  const renderedObjects = useRef([]);

  const handleModelRendered = (modelObject) => {
    renderedObjects.current = [...renderedObjects.current, modelObject];
    if (renderedObjects.current.length === decorations  .length) {
      onRendered(renderedObjects.current);
    }
  };
  
  return (
    <>
      {decorations.map((decoration) => {
        const position = [decoration.position.x, decoration.position.y, decoration.position.z];

        return (
          <Decoration
            octree={octree}
            key={decoration.id}
            id={decoration.id}
            decoration={decoration}
            onRendered={handleModelRendered}
          />
        );
      })}
    </>
  );
};

export default Decorations;
