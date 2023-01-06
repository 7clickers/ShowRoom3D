import * as THREE from 'three';
import { Light } from 'three';

export const Lights = [];

//Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(- 5, 25, - 1);

    /* castShadow costoso in termini di prestazioni */
    directionalLight.castShadow = true;

    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = - 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = - 30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = - 0.00006;

    Lights.push(directionalLight);

/* luce generica senza ombre */
    const fillLight1 = new THREE.HemisphereLight(0x4488bb, 0x002244, 0.5);
    fillLight1.position.set(2, 1, 1);

    Lights.push(fillLight1);