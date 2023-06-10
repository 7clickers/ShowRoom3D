import React from 'react';
import { useSelector } from 'react-redux';
import "./playercommands.css";

const PlayerPosition = () => {
  const playerPosition = useSelector((state) => state.player.position);

  return (
    <div id="container">
      <h2 id="command-title">Commands</h2>
      <hr id="separator"/>
      <p class="command-line"><span class="highlight">W,A,S,D</span> or directional keys to move</p>
      <p class="command-line"><span class="highlight">SPACEBAR</span> to jump</p>
      <p class="command-line"><span class="highlight">LEFT CLICK</span> to interact with products</p>
      <p class="command-line"><span class="highlight">ESC</span> to interact with the cart</p>
      <p class="command-line"><span class="highlight">F</span> for the flashlight</p>
      {/*Position: ({playerPosition.x.toFixed(2)}, {playerPosition.y.toFixed(2)}, {playerPosition.z.toFixed(2)})*/}
    </div>
  );
};

export default PlayerPosition;
