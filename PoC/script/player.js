import {
	Vector3,
	Vector2,	
  } from "../node_modules/three/build/three.module.js";
import { Capsule } from 'three/addons/math/Capsule.js';
import { camera} from './showroom_poc.js';
import { worldOctree, objectOctree } from './source_loader.js';

const GRAVITY = 30;
let mouseTime = 0;
// Create a vector that represents the mouse position
export var mouse = new Vector2();
export const keyStates = {};

class Player {
	constructor(){
		this.playerCollider = new Capsule(new Vector3(0, 0.35, 10), new Vector3(0, 1, 10), 0.35);
		this.playerVelocity = new Vector3();
		this.playerDirection = new Vector3();
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
		
		const worldInt = worldOctree.capsuleIntersect(this.playerCollider);
		const objectInt = objectOctree.capsuleIntersect(this.playerCollider);
		
		this.playerOnFloor = false;
	
		if (objectInt){
			this.playerCollider.translate(objectInt.normal.multiplyScalar(objectInt.depth));
		} 
		
		if (worldInt) {
			
			this.playerOnFloor = worldInt.normal.y > 0;
			
			if (!this.playerOnFloor) {
				this.playerVelocity.addScaledVector(worldInt.normal, - worldInt.normal.dot(this.playerVelocity));
			}
	
			this.playerCollider.translate(worldInt.normal.multiplyScalar(worldInt.depth));
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
			this.Teleport(0, 1, 10);
		}

	}

	teleportPlayerIfOob() {
		if (camera.position.y <= - 25) {
	
			this.playerCollider.start.set(0, 0.35, 10);
			this.playerCollider.end.set(0, 1, 10);
			this.playerCollider.radius = 0.35;
			camera.position.copy(this.playerCollider.end);
			camera.rotation.set(0, 0, 0);
	
		}
	}

}




document.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}



export function MovementListeners() {

	//previene i comportamenti di default del browser quando vengono premute le freccie direzionali
	window.addEventListener("keydown", function (e) { 
		if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	}, false);

	document.addEventListener('keydown', (event) => {
		keyStates[event.code] = true;
	});

	document.addEventListener('keyup', (event) => {
		keyStates[event.code] = false;
	});
	
	//blocca il puntatore onclick
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

export const player = new Player(); 