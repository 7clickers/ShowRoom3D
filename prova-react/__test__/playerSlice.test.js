import playerReducer, { setPosition, setRotation } from '../src/features/player/playerSlice';

describe('playerSlice', () => {
  it('should set the player position', () => {
    const initialState = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    };
    const newPosition = { x: 10, y: 5, z: 3 };
    const action = setPosition(newPosition);
    const newState = playerReducer(initialState, action);

    expect(newState.position).toEqual(newPosition);
  });

  it('should set the player rotation', () => {
    const initialState = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    };
    const newRotation = { x: 45, y: 90, z: 180 };
    const action = setRotation(newRotation);
    const newState = playerReducer(initialState, action);

    expect(newState.rotation).toEqual(newRotation);
  });
});
