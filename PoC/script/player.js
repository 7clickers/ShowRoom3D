import * as THREE from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';
import { camera, scene } from './showroom_poc.js';
import { worldOctree, objectOctree } from './world.js';

//PLAYER

export class Player {
	constructor(){
		this.playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);
		this.playerVelocity = new THREE.Vector3();
		this.playerDirection = new THREE.Vector3();
		this.playerOnFloor = false;
	}

	Teleport(x, y, z) {
		this.playerCollider.start.set(x, 0.35, z);
		this.playerCollider.end.set(x, y, z);
		this.playerCollider.radius = 0.35;
		camera.position.copy(this.playerCollider.end);
		camera.rotation.set(0, 0, 0);
	}

	playerCollisions() {

		const result = worldOctree.capsuleIntersect(this.playerCollider);
		const objectInt = objectOctree.capsuleIntersect(this.playerCollider);
		
		this.playerOnFloor = false;
	
		if (objectInt){
			this.playerCollider.translate(objectInt.normal.multiplyScalar(objectInt.depth));
		} 
		
		if (result ) {
			
			this.playerOnFloor = result.normal.y > 0;
			
			if (!this.playerOnFloor) {
				this.playerVelocity.addScaledVector(result.normal, - result.normal.dot(this.playerVelocity));
			}
	
			this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
		}
	}

	updatePlayer(deltaTime) {

		let damping = Math.exp(- 4 * deltaTime) - 1;
	
		if (!this.playerOnFloor) {
	
			this.playerVelocity.y -= GRAVITY * deltaTime;
	
			// small air resistance
			damping *= 0.1;
	
		}
	
		this.playerVelocity.addScaledVector(this.playerVelocity, damping);
	
		const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
		this.playerCollider.translate(deltaPosition);
	
		this.playerCollisions();
	
		camera.position.copy(this.playerCollider.end);
	
	}

	getForwardVector() {

		camera.getWorldDirection(this.playerDirection);
		this.playerDirection.y = 0;
		this.playerDirection.normalize();
	
		return this.playerDirection;
	
	}
	
	getSideVector() {
	
		camera.getWorldDirection(this.playerDirection);
		this.playerDirection.y = 0;
		this.playerDirection.normalize();
		this.playerDirection.cross(camera.up);
	
		return this.playerDirection;
	
	}

	controls(deltaTime) {

		//Input per il movimento
		const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);
	
		if (keyStates['KeyW'] || keyStates['ArrowUp']  ) {
	
			this.playerVelocity.add(this.getForwardVector().multiplyScalar(speedDelta));
	
		}
	
		if (keyStates['KeyS'] || keyStates['ArrowDown'] ) {
	
			this.playerVelocity.add(this.getForwardVector().multiplyScalar(- speedDelta));
	
		}
	
		if (keyStates['KeyA'] || keyStates['ArrowLeft'] ) {
	
			this.playerVelocity.add(this.getSideVector().multiplyScalar(- speedDelta));
	
		}
	
		if (keyStates['KeyD'] || keyStates['ArrowRight']) {
	
			this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
	
		}
	
		if (this.playerOnFloor) {
	
			if (keyStates['Space']) {
	
				this.playerVelocity.y = 15;
	
			}
	
		}
		if (keyStates['KeyT']) {
			this.Teleport(0, 1, 0);
		}
	}

	teleportPlayerIfOob() {
		if (camera.position.y <= - 25) {
	
			this.playerCollider.start.set(0, 0.35, 0);
			this.playerCollider.end.set(0, 1, 0);
			this.playerCollider.radius = 0.35;
			camera.position.copy(this.playerCollider.end);
			camera.rotation.set(0, 0, 0);
	
		}
	}

}


const GRAVITY = 30;
// const playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);

// const playerVelocity = new THREE.Vector3();
// const playerDirection = new THREE.Vector3();
// let playerOnFloor = false;
let mouseTime = 0;

// Create a vector that represents the mouse position
export var mouse = new THREE.Vector2();

document.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


export const keyStates = {};


// function Teleport(x, y, z) {
// 	playerCollider.start.set(x, y + 0.65, z);
// 	playerCollider.end.set(x, y, z);
// 	playerCollider.radius = 0.35;
// 	camera.position.copy(playerCollider.end);
// 	camera.rotation.set(0, 0, 0);
// }

export function MovementListeners() {

	window.addEventListener("keydown", function(e) { //previene i comportamenti di default del browser quando vengono premute le freccie direzionali
		if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);

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


// export function playerCollisions() {

// 	const result = worldOctree.capsuleIntersect(playerCollider);
// 	const coralloInt = coralloOctree.capsuleIntersect(playerCollider);
	
// 	playerOnFloor = false;

// 	if (coralloInt){
// 		playerCollider.translate(coralloInt.normal.multiplyScalar(coralloInt.depth));
// 	} 

// 	if (result ) {

// 		playerOnFloor = result.normal.y > 0;
		

// 		if (!playerOnFloor) {

// 			playerVelocity.addScaledVector(result.normal, - result.normal.dot(playerVelocity));
			

// 		}

// 		playerCollider.translate(result.normal.multiplyScalar(result.depth));
		

// 	}

// }

// export function updatePlayer(deltaTime) {

// 	let damping = Math.exp(- 4 * deltaTime) - 1;

// 	if (!playerOnFloor) {

// 		playerVelocity.y -= GRAVITY * deltaTime;

// 		// small air resistance
// 		damping *= 0.1;

// 	}

// 	playerVelocity.addScaledVector(playerVelocity, damping);

// 	const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
// 	playerCollider.translate(deltaPosition);

// 	playerCollisions();

// 	camera.position.copy(playerCollider.end);

// }


// export function getForwardVector() {

// 	camera.getWorldDirection(playerDirection);
// 	playerDirection.y = 0;
// 	playerDirection.normalize();

// 	return playerDirection;

// }

// export function getSideVector() {

// 	camera.getWorldDirection(playerDirection);
// 	playerDirection.y = 0;
// 	playerDirection.normalize();
// 	playerDirection.cross(camera.up);

// 	return playerDirection;

// }

// export function controls(deltaTime) {

// 	//Input per il movimento
// 	const speedDelta = deltaTime * (playerOnFloor ? 25 : 8);

// 	if (keyStates['KeyW'] || keyStates['ArrowUp']  ) {

// 		playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));

// 	}

// 	if (keyStates['KeyS'] || keyStates['ArrowDown'] ) {

// 		playerVelocity.add(getForwardVector().multiplyScalar(- speedDelta));

// 	}

// 	if (keyStates['KeyA'] || keyStates['ArrowLeft'] ) {

// 		playerVelocity.add(getSideVector().multiplyScalar(- speedDelta));

// 	}

// 	if (keyStates['KeyD'] || keyStates['ArrowRight']) {

// 		playerVelocity.add(getSideVector().multiplyScalar(speedDelta));

// 	}

// 	if (playerOnFloor) {

// 		if (keyStates['Space']) {

// 			playerVelocity.y = 15;

// 		}

// 	}
// 	if (keyStates['KeyT']) {
// 		Teleport(0, 1, 0);
// 	}
// }
//Se l'utente esce dalla mappa
// export function teleportPlayerIfOob() {
// 	if (camera.position.y <= - 25) {

// 		playerCollider.start.set(0, 0.35, 0);
// 		playerCollider.end.set(0, 1, 0);
// 		playerCollider.radius = 0.35;
// 		camera.position.copy(playerCollider.end);
// 		camera.rotation.set(0, 0, 0);

// 	}
// }

export const player = new Player(); 