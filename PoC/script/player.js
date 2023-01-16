import * as THREE from 'three';
import { Capsule } from 'three/addons/math/Capsule.js';
import { camera, scene } from './showroom_poc.js';
import { worldOctree } from './world.js';
import { coralloOctree } from './world.js';

const spotLight = new THREE.SpotLight(0xFFC3EE, 1, 0, Math.PI / 8);
spotLight.position.set(0, 12, -10);

const geometry = new THREE.RingGeometry(2.5, 3, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const ring = new THREE.Mesh(geometry, material);

ring.position.x = 0;
ring.position.y = 0.7;
ring.position.z = -10;
ring.rotateX(Math.PI / 2);

var y = document.getElementById("info2");
var flag = false;

document.getElementById("corallo").onclick = function () { Teleport(0, 2, -6.5) };

//PLAYER
const GRAVITY = 30;
const playerCollider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);

const playerVelocity = new THREE.Vector3();
const playerDirection = new THREE.Vector3();
let playerOnFloor = false;
let mouseTime = 0;


const keyStates = {};


export function Teleport(x, y, z) {
	playerCollider.start.set(x, y - 0.65, z);
	playerCollider.end.set(x, y, z);
	playerCollider.radius = 0.35;
	camera.position.copy(playerCollider.end);
	camera.rotation.set(0, 0, 0);
}

function showInfo() {
	var x = document.getElementById("corallo");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
	flag = false;
}

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


export function playerCollisions() {

	const result = worldOctree.capsuleIntersect(playerCollider);
	const coralloInt = coralloOctree.capsuleIntersect(playerCollider);
	
	playerOnFloor = false;

	if (coralloInt){
		playerCollider.translate(coralloInt.normal.multiplyScalar(coralloInt.depth));
	} 

	if (result ) {

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

	if (keyStates['KeyW'] || keyStates['ArrowUp']  ) {

		playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));

	}

	if (keyStates['KeyS'] || keyStates['ArrowDown'] ) {

		playerVelocity.add(getForwardVector().multiplyScalar(- speedDelta));

	}

	if (keyStates['KeyA'] || keyStates['ArrowLeft'] ) {

		playerVelocity.add(getSideVector().multiplyScalar(- speedDelta));

	}

	if (keyStates['KeyD'] || keyStates['ArrowRight']) {

		playerVelocity.add(getSideVector().multiplyScalar(speedDelta));

	}

	if (playerOnFloor) {

		if (keyStates['Space']) {

			playerVelocity.y = 15;

		}

	}
	if (keyStates['KeyT']) {
		Teleport(0, 1, 0);
	}
	//-6,7,7
	if (-5 < camera.position.x && -5 < camera.position.z + 10 && 5 > camera.position.x && 5 > camera.position.z + 10) {
		scene.add(ring);
		spotLight.target = ring;
		scene.add(spotLight);
		y.style.display = "block";

		if (keyStates['KeyE'] && flag == false) {
			flag = true;
			setTimeout(showInfo, 200);

		}

	}
	else {
		scene.remove(spotLight);
		scene.remove(ring);
		y.style.display = "none";
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