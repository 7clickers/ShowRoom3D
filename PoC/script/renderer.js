import {
	WebGLRenderer,
	Clock,
	Vector3,
	VSMShadowMap,
	sRGBEncoding,
	ACESFilmicToneMapping,
  } from "../node_modules/three/build/three.module.js";
import Stats from 'three/addons/libs/stats.module.js';
import { scene, camera } from './showroom_poc.js';
import { player } from './player.js';
import { coords } from './showroom_poc.js';
import { Raycasting} from './raycasting.js';

const STEPS_PER_FRAME = 5;

const clock = new Clock();

export const stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';

export const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = VSMShadowMap;
renderer.outputEncoding = sRGBEncoding;
renderer.toneMapping = ACESFilmicToneMapping;

export let renderId;
export let renderPaused = false;



export function animate() {
	
	const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
	
	for (let i = 0; i < STEPS_PER_FRAME; i++) {
		player.controls(deltaTime);
		player.updatePlayer(deltaTime);
		player.teleportPlayerIfOob();
	}
	Raycasting();
	renderer.render(scene, camera);
	stats.update();
	renderId = requestAnimationFrame(animate);
	
	//COORDS
	var vector = new Vector3();
    vector.setFromMatrixPosition(camera.matrixWorld);
 	coords.innerHTML = 'x= ' + vector.x.toFixed(2) + '</br>y= ' + vector.y.toFixed(2) + '</br>z= ' + vector.z.toFixed(2);
}

export function pauseRender(id) {
	cancelAnimationFrame(id);
	renderPaused = true;
}

export function resumeRender() {
	renderId = requestAnimationFrame(animate);
	renderPaused = false;
}

export function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}
