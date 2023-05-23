import { useRef, useEffect, useMemo } from 'react'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'
import { Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import useKeyboard from '../../common/useKeyboard'
import useThrottledDispatch from '../../common/useThrottledDispatch'

import { useSelector, useDispatch } from 'react-redux';
import { setPosition, setRotation } from './playerSlice';


const GRAVITY = 30
const STEPS_PER_FRAME = 5

export default function Player({ octree }) { 
  const playerPosition = useSelector((state) => state.player.position);

  const lastPositionDispatchTime = useRef(0);
  const lastRotationDispatchTime = useRef(0);

  const playerOnFloor = useRef(false)
  const playerVelocity = useMemo(() => new Vector3(), [])
  const playerDirection = useMemo(() => new Vector3(), [])
  const capsule = useMemo(
    () => new Capsule(
      new Vector3(playerPosition.x, playerPosition.y - 1, playerPosition.z),
      new Vector3(playerPosition.x, playerPosition.y, playerPosition.z),
      0.5
    ),
    [playerPosition]
  );
  
  const dispatch = useDispatch();

  const onPointerDown = () => {
 
  }

  useEffect(() => {
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
    }
  })


  const keyboard = useKeyboard()

  function getForwardVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    return playerDirection
  }

  function getSideVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection)
    playerDirection.y = 0
    playerDirection.normalize()
    playerDirection.cross(camera.up)
    return playerDirection
  }

  function controls(camera, delta, playerVelocity, playerOnFloor, playerDirection) {
    const speedDelta = delta * (playerOnFloor ? 25 : 8)
    keyboard['KeyA'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['ArrowLeft'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['KeyD'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['ArrowRight'] && playerVelocity.add(getSideVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyW'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['ArrowUp'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(speedDelta))
    keyboard['KeyS'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    keyboard['ArrowDown'] && playerVelocity.add(getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta))
    if (playerOnFloor) {
      if (camera.position.y <= 4){
        if (keyboard['Space']) {
          playerVelocity.y = 15
        }
      }  
    }
  }

  function updatePlayer(camera, delta, octree, capsule, playerVelocity, playerOnFloor) {
    let damping = Math.exp(-4 * delta) - 1
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta
      damping *= 0.1 // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping)
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta)
    capsule.translate(deltaPosition)
    playerOnFloor = playerCollisions(capsule, octree, playerVelocity)
    camera.position.copy(capsule.end)

    const currentTime = performance.now();
    const positionUpdateDelay = 1500;
  
    if (currentTime - lastPositionDispatchTime.current > positionUpdateDelay) {
      dispatch(setPosition({ x: capsule.end.x, y: capsule.end.y, z: capsule.end.z }));
      lastPositionDispatchTime.current = currentTime;
    }

    return playerOnFloor
  }


  function playerCollisions(capsule, octree, playerVelocity) {
    if (!octree) return false; // <-- add this check
  
    const result = octree.capsuleIntersect(capsule)
    let playerOnFloor = false
    if (result) {
      playerOnFloor = result.normal.y > 0
      if (!playerOnFloor) {
        playerVelocity.addScaledVector(result.normal, -result.normal.dot(playerVelocity))
      }
      capsule.translate(result.normal.multiplyScalar(result.depth))
    }
    return playerOnFloor
  }
  

  function teleportPlayerIfOob(camera, capsule, playerVelocity) {
    if (camera.position.y <= -100) {
      playerVelocity.set(0, 0, 0)
      capsule.start.set(0, 10, 0)
      capsule.end.set(0, 11, 0)
      camera.position.copy(capsule.end)
      camera.rotation.set(0, 0, 0)
    // Throttle position and rotation updates
    const currentTime = performance.now();
    const positionUpdateDelay = 1500;

    if (currentTime - lastPositionDispatchTime.current > positionUpdateDelay) {
      dispatch(setPosition({ x: capsule.end.x, y: capsule.end.y, z: capsule.end.z }));
      lastPositionDispatchTime.current = currentTime;
    }
    }
  }

  useFrame(({ camera }, delta) => {
    controls(camera, delta, playerVelocity, playerOnFloor.current, playerDirection)
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(camera, deltaSteps, octree, capsule, playerVelocity, playerOnFloor.current)
    }
    teleportPlayerIfOob(camera, capsule, playerVelocity)
  })
}
