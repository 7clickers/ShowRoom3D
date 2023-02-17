import {
	TextureLoader,
	sRGBEncoding,
	LoadingManager,
} from "../node_modules/three/build/three.module.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { scene } from './showroom_poc.js';
import { products } from './products.js';

export const worldOctree = new Octree();
export const objectOctree = new Octree();
const loadingM = new LoadingManager();
export const loader = new GLTFLoader(loadingM).setPath('../');


const progressBar = document.getElementById('progress-bar');
const containerBar = document.getElementsByClassName("progress-bar-container");
const content = document.getElementById('content');

loadingM.onStart = function (url, item, total) {
	content.style.display = "none";
}
loadingM.onProgress = function (url, loaded, total) {

	progressBar.value = (loaded / total) * 100;
}
loadingM.onLoad = function (url, loaded, total) {
	for (let i = 0; i < containerBar.length; i++) {
		containerBar[i].style.display = "none";
	}
	content.style.display = "block";
}


// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '../node_modules/three/examples/jsm/libs/draco/gltf/');
// loader.setDRACOLoader(dracoLoader);

const texture = new TextureLoader().load('../source/texture/sand.jpg');
texture.encoding = sRGBEncoding;

//carica mappa
loader.load('source/glb/fondale.glb', (gltf) => {

	scene.add(gltf.scene);
	worldOctree.fromGraphNode(gltf.scene);
	

	gltf.scene.traverse(child => {

		if (child.isMesh) {
			child.material.map = texture;
			child.castShadow = true;
			child.receiveShadow = true; // This is

			if (child.material.map) {

				child.material.map.anisotropy = 4;

			}
		}
	});

	// const helper = new OctreeHelper(worldOctree);
	
	// helper.visible = false;
	// scene.add(helper);

	// const gui = new GUI({ width: 200 });
	// gui.add({ debug: false }, 'debug')
	// 	.onChange(function (value) {

	// 		helper.visible = value;
	// 	});
});


// array vuoto per oggetti Three.js
export var threeProducts = [];

// Itera prodotti
for (let key in products) {
  // prodotto corrente
  let product = products[key];
  let x = product.x;
  let y = product.y;
  let z = product.z;

  // Load the GLTF model using the loader
  loader.load(product.path, function (gltf) {
    let object = gltf.scene; 
    scene.add(object);
	
  object.name = key; // imposta il key del prodotto come nome del oggetto
  object.position.set(x, y, z);
  objectOctree.fromGraphNode(object); 
    // Aggiungi il prodtto all'array degli oggetti Threejs
    threeProducts.push(object);
  });
}
