import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Octree } from 'three/addons/math/Octree.js';
import { OctreeHelper } from 'three/addons/helpers/OctreeHelper.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { scene } from './showroom_poc.js';

export const worldOctree = new Octree();

const loader = new GLTFLoader().setPath('../');
const texture = new THREE.TextureLoader().load('../source/texture/sand.jpg');
texture.encoding = THREE.sRGBEncoding;

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