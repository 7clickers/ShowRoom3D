import React, { useRef, useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardInput } from "../UI_Listeners/movementKeyboardInput";
import * as THREE from "three";

const Player = (props) => {
  // Accedi alla camera dalla scena
  const { camera } = useThree();
  
  // Definisci i tasti da ascoltare
  const keysToListen = ["w", "s", "a", "d", " "];
  
  // Ottieni lo stato dei tasti usando il custom hook
  const keysPressed = useKeyboardInput(keysToListen);
  
  // Inizializza direction, frontVector e sideVector come vettori vuoti
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  
  // Crea i useRef per velocità e accelerazione e inizializzali con vettori vuoti
  const velocity = useRef(new THREE.Vector3());
  const speed = useRef(new THREE.Vector3());
  
  // Costanti per la velocità di movimento e la potenza di salto
  const SPEED = 5;
  const JUMP_POWER = 4;

  // Crea una sfera con la posizione e massa specificate
  const [ref, api] = useSphere((index) => ({
    mass: 1,
    type: "Dynamic",
    position: props.position,
  }));

  // Sottoscrivi agli aggiornamenti della velocità e archiviali nel useRef velocity
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = new THREE.Vector3().fromArray(v))), []);

  // Ad ogni frame, aggiorna il movimento del giocatore, la velocità e sincronizza la posizione della camera
  useFrame(() => {
    // Aggiorna frontVector in base ai tasti "w" e "s"
    frontVector.set(0, 0, Number(keysPressed["s"]) - Number(keysPressed["w"]));
    // Aggiorna sideVector in base ai tasti "a" e "d"
    sideVector.set(Number(keysPressed["a"]) - Number(keysPressed["d"]), 0, 0);

    // Calcola il vettore di direzione per il movimento
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // Copia i valori di velocità correnti in speed.current
    speed.current.fromArray(velocity.current.toArray());
    // Aggiorna la velocità del giocatore in base alla direzione calcolata
    api.velocity.set(direction.x, speed.current.y, direction.z);

    // Se la barra spaziatrice è premuta e il giocatore è a terra, applica la potenza di salto
    if (keysPressed[" "] && Math.abs(speed.current.y) < 0.05) {
      api.velocity.set(speed.current.x, JUMP_POWER, speed.current.z);
    }

    // Ottieni la posizione del giocatore e aggiorna la posizione della camera
    const worldPos = new THREE.Vector3();
    ref.current.getWorldPosition(worldPos);
    camera.position.copy(worldPos);
  });

  // Restituisci una mesh sferica con la posizione e la scala specificate
  return (
    <mesh ref={ref} position={props.position}>
      <sphereBufferGeometry args={[props.args]} />
      <meshStandardMaterial color="#FFFF00" />
    </mesh>
  );
};

export default Player;
