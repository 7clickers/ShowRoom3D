import * as THREE from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';
import { camera } from './showroom_poc.js';
import { worldOctree } from './world.js';

//PLAYER
const GRAVITY = 30;
const playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);

const playerVelocity = new THREE.Vector3();
const playerDirection = new THREE.Vector3();
let playerOnFloor = false;
let mouseTime = 0;


const keyStates = {};

export function MovementListeners(){
    document.addEventListener('keydown', (event) => {

        keyStates[event.code] = true;
    
    });
    
    document.addEventListener('keyup', (event) => {
    
        keyStates[event.code] = false;
    
    });
    
    container.addEventListener('mousedown', () => {
    
        document.body.requestPointerLock();
    
        mouseTime = performance.now();
    
    });
    
    
    //movimento camera
    document.body.addEventListener('mousemove', (event) => {
    
        if (document.pointerLockElement === document.body) {
    
            camera.rotation.y -= event.movementX / 500;
            camera.rotation.x -= event.movementY / 500;
    
        }
    
    });
}


export function playerCollisions() {

	const result = worldOctree.capsuleIntersect(playerCollider);

	playerOnFloor = false;

	if (result) {

		playerOnFloor = result.normal.y > 0;

		if (!playerOnFloor) {

			playerVelocity.addScaledVector(result.normal, - result.normal.dot(playerVelocity));

		}

		playerCollider.translate(result.normal.multiplyScalar(result.depth));

	}

}

export function updatePlayer(deltaTime) {

	let damping = Math.exp(- 4 * deltaTime) - 1;

	if (!playerOnFloor) {

		playerVelocity.y -= GRAVITY * deltaTime;

		// small air resistance
		damping *= 0.1;

	}

	playerVelocity.addScaledVector(playerVelocity, damping);

	const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
	playerCollider.translate(deltaPosition);

	playerCollisions();

	camera.position.copy(playerCollider.end);

}


export function getForwardVector() {

	camera.getWorldDirection(playerDirection);
	playerDirection.y = 0;
	playerDirection.normalize();

	return playerDirection;

}

export function getSideVector() {

	camera.getWorldDirection(playerDirection);
	playerDirection.y = 0;
	playerDirection.normalize();
	playerDirection.cross(camera.up);

	return playerDirection;

}

export function controls(deltaTime) {

	// gives a bit of air control
	const speedDelta = deltaTime * (playerOnFloor ? 25 : 8);

	if (keyStates['KeyW']) {

		playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));

	}

	if (keyStates['KeyS']) {

		playerVelocity.add(getForwardVector().multiplyScalar(- speedDelta));

	}

	if (keyStates['KeyA']) {

		playerVelocity.add(getSideVector().multiplyScalar(- speedDelta));

	}

	if (keyStates['KeyD']) {

		playerVelocity.add(getSideVector().multiplyScalar(speedDelta));

	}

	if (playerOnFloor) {

		if (keyStates['Space']) {

			playerVelocity.y = 15;

		}

	}

}

export function teleportPlayerIfOob() {
	if (camera.position.y <= - 25) {

		playerCollider.start.set(0, 0.35, 0);
		playerCollider.end.set(0, 1, 0);
		playerCollider.radius = 0.35;
		camera.position.copy(playerCollider.end);
		camera.rotation.set(0, 0, 0);

	}
}