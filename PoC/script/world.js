//import * as THREE from 'three';
import {
	TextureLoader,
	sRGBEncoding,
} from "../node_modules/three/build/three.module.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { scene } from './showroom_poc.js';
import { products } from './products.js';

export const worldOctree = new Octree();
export const objectOctree = new Octree();
export const loader = new GLTFLoader().setPath('../');

const texture = new TextureLoader().load('../source/texture/sand.jpg');
texture.encoding = sRGBEncoding;

//carica mappa
loader.load('source/glb/sea_map_nocolor.glb', (gltf) => {

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

	const helper = new OctreeHelper(worldOctree);
	
	helper.visible = false;
	scene.add(helper);

	const gui = new GUI({ width: 200 });
	gui.add({ debug: false }, 'debug')
		.onChange(function (value) {

			helper.visible = value;
		});
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
