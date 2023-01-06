import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { scene, camera } from './showroom_poc.js';
import { controls, updatePlayer, teleportPlayerIfOob } from './player.js';

const STEPS_PER_FRAME = 5;

const clock = new THREE.Clock();

export const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

export function animate() {
	const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;

	for (let i = 0; i < STEPS_PER_FRAME; i++) {

		controls(deltaTime);
		updatePlayer(deltaTime);
		teleportPlayerIfOob();

	}

	renderer.render(scene, camera);

	stats.update();

	requestAnimationFrame(animate);
}


export function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}
