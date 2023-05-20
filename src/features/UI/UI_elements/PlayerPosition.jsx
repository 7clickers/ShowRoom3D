// src/components/UI/PlayerPosition.js
import React from 'react';
import { useSelector } from 'react-redux';

const PlayerPosition = () => {
  const playerPosition = useSelector((state) => state.player.position);

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: 1,
      color: 'white',
      fontWeight: 'bold',
    }}>
      Position: ({playerPosition.x.toFixed(2)}, {playerPosition.y.toFixed(2)}, {playerPosition.z.toFixed(2)})
    </div>
  );
};

export default PlayerPosition;
