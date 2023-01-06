import * as THREE from 'three';
import { Lights } from './lights.js';
import { MovementListeners} from './player.js';
import { animate, renderer, onWindowResize, stats } from './renderer.js';


export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.background = new THREE.Color(0x56a1c7);
scene.fog = new THREE.Fog(0x88ccee, 0, 50);

camera.rotation.order = 'YXZ';

// LUCI
Lights.forEach(function(light) {
    scene.add(light);
});

//RENDERER
const container = document.getElementById('container');
container.appendChild(renderer.domElement);

/* fps counter */
container.appendChild(stats.domElement);

//Event listener per i movimenti del player
MovementListeners();

// cambia aspect ratio on resize della finestra 
window.addEventListener('resize', onWindowResize);

animate();

