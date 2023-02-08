//import * as THREE from 'three';
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
import { cart, products} from './products.js';


export const scene = new Scene();
export const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.background = new Color(0x56a1c7);
scene.fog = new Fog(0x88ccee, 0, 50);

camera.rotation.order = 'YXZ';

// LUCI
Lights.forEach(function(light) {
    scene.add(light);
});

//COORDINATES
export var coords = document.createElement('div');
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

//raycaster
export var raycaster = new Raycaster();
export var y = document.getElementById("info2");


const geometry = new RingGeometry(1.75, 2, 32);
const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
export var ring = new Mesh(geometry, material);
scene.add(ring);
ring.rotateX(Math.PI / 2);
ring.visible = true;

export var ProductSpotLight = new SpotLight(0xFFC3EE, 0.5, 0, Math.PI / 8);
scene.add(ProductSpotLight);

export var interactionBar = document.getElementById("info2");
export var infoTab = document.getElementById('product-info');
export var cartContainer = document.getElementById('cart-container');

$('.product-info__close-btn').click(function() {
  infoTab.style.display = 'none';
  document.body.requestPointerLock();
});

$('.product-info__add-btn').click(function(){
  let key = $(this).attr('data');
  cart.addItem(products[key]);
});

$("#cart-container").on("click", ".teleport-icon", function() {
  let x = $(this).parent().attr("x");
  let y = $(this).parent().attr("y");
  let z = $(this).parent().attr("z");
  //Teleport(x,y,z);
});

$("#cart-container").on("click", ".trash-icon", function() {
  //let key = $(this).parent().attr("name");
  let id = $(this).parent().attr("cart-item-id");
  console.log(id);
  cart.removeItemById(id);
});

animate();


