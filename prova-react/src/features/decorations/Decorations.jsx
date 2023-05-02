import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Decoration from './Decoration';

const Decorations = ({ octree }) => {
  const decorations = useSelector((state) => state.decoration.decorations);

  return (
    <>
      {decorations.map((decoration) => {
        const position = [decoration.position.x, decoration.position.y, decoration.position.z];

        return (
          <Decoration
            key={decoration.id}
            id={decoration.id}
            decoration={decoration}
          />
        );
      })}
    </>
  );
};

export default Decorations;
