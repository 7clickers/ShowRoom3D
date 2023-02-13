import '../css/main.css';
import {
	PerspectiveCamera,
	Scene,
	Color,
  Fog,
  Raycaster,
  RingGeometry,
  MeshBasicMaterial,
  Mesh,
  SpotLight,
  DoubleSide,
  } from "../node_modules/three/build/three.module.js";
import { Lights } from './lights.js';
import { MovementListeners} from './player.js';
import { animate, renderer, onWindowResize, stats } from './renderer.js';
import { UIClickListeners } from "./UI_listeners.js";


export const scene = new Scene();
export const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

//COORDINATES
export var coords = document.createElement('div');

//raycaster
export const raycaster = new Raycaster();
//export var movementInfo = document.getElementById('movement-info');

export const interactionBar = document.getElementById('product-selection-info');
export const infoTab = document.getElementById('product-info');
export const cartContainer = document.getElementById('cart-container');

scene.background = new Color(0x56a1c7);
scene.fog = new Fog(0x88ccee, 0, 50);

camera.rotation.order = 'YXZ';

// LUCI
Lights.forEach(function(light) {
    scene.add(light);
});


coords.style.position = 'absolute';
coords.style.color = 'white';
coords.style.top = '56px';
coords.style.left = '10px';
coords.innerHTML = '0, 0, 0';
document.body.appendChild(coords); 

//RENDERER
const container = document.getElementById('container');
container.appendChild(renderer.domElement);

/* fps counter */
container.appendChild(stats.domElement);

//Event listener per i movimenti del player
MovementListeners();

// cambia aspect ratio on resize della finestra 
window.addEventListener('resize', onWindowResize);




const geometry = new RingGeometry(1.75, 2, 32);
const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
export var ring = new Mesh(geometry, material);
scene.add(ring);
ring.rotateX(Math.PI / 2);
ring.visible = true;

export var ProductSpotLight = new SpotLight(0xFFC3EE, 0.5, 0, Math.PI / 8);
scene.add(ProductSpotLight);

UIClickListeners();
animate();

// if (window.attachEvent) {window.attachEvent('onload', animate);}
// else if (window.addEventListener) {window.addEventListener('load', animate, false);}
// else {document.addEventListener('load', animate, false);}

 