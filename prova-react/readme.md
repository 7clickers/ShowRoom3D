# Table of Contents

- [Introduzione](#introduzione)
- [Installazione](#installazione)
- [File system](#organizzazione-file)
- [Spiegazioni](#spiegazioni)
  - [Movimento](#movimento)
    - [Player](#player.jsx)
    - [movementKeyboardInput](#movementKeyboardInput.js)
- [React Hooks](#react-hooks)

# Introduzione

Questo progetto è una semplice applicazione di esempio basata su React e Three.js. Lo scopo dell'applicazione è mostrare un'implementazione di base di un ambiente 3D con una scena che contiene un personaggio controllabile dall'utente e un terreno.

# Installazione

Per eseguire il progetto localmente, seguire questi passaggi:

1. Clona il repository nella tua macchina locale.
2. Esegui npm install per installare tutte le dipendenze necessarie.
3. Esegui npm start dev per avviare il server di sviluppo

```bash
npm install
```

```bash
npm run dev
```

# Organizzazione file

Il progetto è strutturato nei seguenti file e componenti:

### main.jsx

### App.jsx

### Store.jsx (al momento non attivo)

### index.css

### components

### |--- Lights.jsx

### |--- Map.jsx

### |--- Player.jsx

### |--- Scene.jsx

### UI_Listeners

### |--- movementKeyboardInput.js

### assets

### |--- models

### redux

### |--- actions

### |--- reducers

Scene.jsx
Player.jsx
Map.jsx
movementKeyboardInput.js

## 1. main.jsx

Il punto di ingresso dell'applicazione. In questo file, viene inizializzato il Redux store, e viene effettuato il rendering dell'intera applicazione utilizzando il componente <App> all'interno di un <Provider> di Redux.

```javascript
import { Provider } from "react-redux";
import { Store } from "./Store";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## 2. App.jsx

Il componente principale dell'applicazione. In questo file viene utilizzato il componente <Canvas> per creare un ambiente 3D e viene inserito il componente <Scene>.

```javascript
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";

export default function App() {
  return (
    <>
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}
```

## 3. Scene.jsx

Il componente che gestisce l'intera scena 3D. In questo file vengono configurati i componenti <Physics> per l'aggiunta delle leggi fisiche, <PointerLockControls> per il controllo della telecamera e il componente <Lights> per le luci, oltre ai componenti personalizzati <Player> e <Map>.

```javascript
import React, { useEffect, useRef, useState } from "react";

// Physics
import { Physics } from "@react-three/cannon";

// Three
import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

import Player from "./Player.jsx";
import Map from "./Map.jsx";
import Lights from "./Lights.jsx";

export const Scene = () => {
  const { camera, gl } = useThree();
  const controls = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    camera.layers.enable(0);
    camera.layers.enable(1);
  }, [camera]);

  useEffect(() => {
    const handleFocus = () => {
      controls.current.lock();
    };
    document.addEventListener("click", handleFocus);

    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [gl]);

  return (
    <>
      {/** Pointer lock */}
      <PointerLockControls ref={controls} args={[camera, gl.domElement]} />
      {/** Lighting */}
      <Lights />
      {/** Physic objects */}
      <Physics
        gravity={[0, -9.81, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"SAP"}
      >
        {/** Player */}
        <Player position={[-5, 0, -5]} args={[0.5]} />
        {/** Plane */}
        <Map />
      </Physics>
    </>
  );
};
```

## 4. Player.jsx

Il componente Player crea una sfera con una posizione e massa specificate che rappresenta il personaggio controllabile. Utilizza la funzione [***useFrame***] per aggiornare il movimento del giocatore, la velocità e sincronizzare la posizione della camera ad ogni frame. La logica di movimento viene calcolata in base ai tasti premuti e alla rotazione della camera, per permettere al personaggio di muoversi nella direzione desiderata. Inoltre, implementa il controllo del salto quando viene premuta la barra spaziatrice.

### 4.1 movementKeyboardInput.js

Il custom hook useKeyboardInput si occupa di gestire gli input della tastiera per il movimento del personaggio. Accetta un array di tasti da ascoltare e restituisce un oggetto che contiene lo stato (premuto o rilasciato) di ogni tasto. Gli event listener per "keydown" e "keyup" vengono aggiunti e rimossi quando il componente si monta e si smonta, rispettivamente. Il custom hook è separato dal componente Player per modularizzare e rendere il codice più leggibile, permettendo una migliore manutenzione.

## 5. Map.jsx

Il componente che rappresenta il terreno dell'ambiente 3D. In questo file viene creato un componente <mesh> con una geometria a piano e un materiale Phong per le ombre. Viene anche configurato il componente <usePlane> di react-three-cannon per aggiungere una collisione al terreno.

## 6. Lights.jsx

Il componente responsabile per l'aggiunta di luci alla scena. In questo file, vengono creati diversi tipi di luci, come <directionalLight>, <pointLight> e <ambientLight>, per creare un'illuminazione adeguata nella scena.

## 7. Store.js (al momento non attivo)

Il file dove viene creato e configurato il Redux store. Il Redux store è utilizzato per gestire lo stato dell'applicazione e permettere ai componenti di accedere e modificare lo stato in modo centralizzato.

# Spiegazioni

## Movimento

il movimento in prima persona viene gestito principalmente dal componente **_Player_** e dal custom hook **_useKeyboardInput_**.

### Player.jsx

#### Accedere alla camera

Il componente **_Player_** utilizza il hook [**_useThree_**](#usethree) per accedere alla camera della scena.

```javascript
const { camera } = useThree();
```

#### Tasti da ascoltare

Viene definito un array di tasti da ascoltare per il movimento del personaggio, come ad esempio "w", "s", "a", "d" e la barra spaziatrice.

```javascript
const keysToListen = ["w", "s", "a", "d", " "];
```

#### Utilizzo di useKeyboardInput

Il custom hook **_useKeyboardInput_** viene utilizzato per ottenere lo stato dei tasti premuti.

```javascript
const keysPressed = useKeyboardInput(keysToListen);
```

#### Inizializzazione dei vettori

Vengono inizializzati i vettori per la direzione del movimento (direction), il movimento in avanti e indietro (frontVector) e il movimento laterale (sideVector).

```javascript
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
```

#### Velocità e accelerazione

Viene creato un [**_useRef_**](#useref) per memorizzare la velocità e l'accelerazione del personaggio.

```javascript
const velocity = useRef(new THREE.Vector3());
const speed = useRef(new THREE.Vector3());
```

#### Costanti per la velocità e la potenza di salto

Vengono definite costanti per la velocità di movimento (SPEED) e la potenza di salto (JUMP_POWER).

```javascript
const SPEED = 5;
const JUMP_POWER = 4;
```

#### Creazione della sfera

Viene utilizzato il hook [**_useSphere_**](#usesphere) di @react-three/cannon per creare una sfera che rappresenta il personaggio controllabile.

```javascript
const [ref, api] = useSphere((index) => ({
  mass: 1,
  type: "Dynamic",
  position: props.position,
}));
```

#### Gestione degli aggiornamenti della velocità

Utilizzando [**_useEffect_**](#useeffect), il componente si sottoscrive agli aggiornamenti della velocità del personaggio e li memorizza nel [**_useRef_**](#useref) velocity.

```javascript
useEffect(
  () =>
    api.velocity.subscribe(
      (v) => (velocity.current = new THREE.Vector3().fromArray(v))
    ),
  []
);
```

### Aggiornamento del movimento

La funzione [**_useFrame_**](#useframe) viene utilizzata per aggiornare il movimento del personaggio, calcolare la velocità e sincronizzare la posizione della camera ad ogni frame.

- Aggiorna frontVector in base ai tasti "w" e "s".
- Aggiorna sideVector in base ai tasti "a" e "d".
- Calcola il vettore di direzione per il movimento.
- Applica la rotazione della camera al vettore di direzione.
- Imposta la velocità del giocatore in base alla direzione calcolata.
- Gestisce il salto quando viene premuta la barra spaziatrice e il personaggio è a terra.
- Sincronizza la posizione della camera con la posizione del personaggio.

```javascript
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
```

### movementKeyboardInput.js

#### Inizializzazione dello stato

Viene creato uno stato per memorizzare i tasti premuti usando un oggetto con i tasti come chiavi e valori booleani che rappresentano se il tasto è premuto o meno.

```javascript
const [keysPressed, setPressedKeys] = useState(getKeys().hookReturn);
```

#### Gestione degli eventi keydown e keyup

Utilizzando [**_useEffect_**](#useeffect), si aggiungono gli event listener per gli eventi "keydown" e "keyup". Quando viene premuto un tasto, il suo valore corrispondente nell'oggetto **_keysPressed_** viene impostato su true. Quando viene rilasciato un tasto, il valore corrispondente viene impostato su false.

```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    const lowerKey = e.key.toLowerCase();
    if (getKeys().lowerCaseArray.includes(lowerKey)) {
      setPressedKeys((keysPressed) => ({ ...keysPressed, [lowerKey]: true }));
    }
  };
  const handleKeyUp = (e) => {
    const lowerKey = e.key.toLowerCase();
    if (getKeys().lowerCaseArray.includes(lowerKey)) {
      setPressedKeys((keysPressed) => ({
        ...keysPressed,
        [lowerKey]: false,
      }));
    }
  };

  // Aggiungi event listener per "keydown" e "keyup"
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  // Rimuovi event listener quando il componente si smonta
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
  };
}, [keysToListen, getKeys]);
```

# React Hooks

In questa sezione vengono spiegati i vari hook usati che fanno parte delle varie librerie.

## React

### useState

Questo hook consente di gestire lo stato di un componente React. Viene utilizzato per definire una variabile di stato e una funzione per modificarla. Quando la variabile di stato viene modificata, il componente viene nuovamente renderizzato con il nuovo valore di stato. L'hook restituisce una coppia di valori: il valore corrente dello stato e una funzione per modificarlo. Il valore iniziale dello stato può essere passato come argomento alla funzione useState.

### useEffect

Questo hook consente di eseguire effetti collaterali nei componenti. Puoi usarlo per recuperare dati, configurare ascoltatori di eventi o modificare il DOM. Prende una funzione come suo primo argomento, che viene chiamata dopo ogni render. Puoi anche specificare un array di dipendenze come secondo argomento, che attiverà l'effetto solo quando una delle dipendenze cambia. Se restituisci una funzione dall'effetto, verrà chiamata prima che venga attivato il prossimo effetto o prima che il componente venga smontato.

### useRef

Questo hook crea un oggetto di riferimento mutabile che può essere utilizzato per memorizzare qualsiasi valore. Consente di mantenere i valori attraverso i re-render di un componente senza innescare un nuovo render. È possibile modificare direttamente il valore dell'oggetto di riferimento utilizzando la proprietà **_.current_**. È utile per memorizzare nodi DOM, gestori di eventi e qualsiasi altro valore che deve persistere tra i render.

### useCallback

Questo hook consente di memorizzare una funzione in modo che non venga ricreato ad ogni renderizzazione del componente. Viene utilizzato quando si ha bisogno di passare una funzione come prop a un componente figlio, in modo che il componente figlio non debba essere re-renderizzato ad ogni modifica della funzione. La funzione memorizzata viene creata solo una volta, al momento del rendering iniziale del componente. Il hook restituisce una funzione che può essere passata come prop a un componente figlio.

## @react-three/fiber

### useFrame

Questo hook consente di eseguire una funzione su ogni frame del ciclo di rendering di @react-three/fiber. Puoi usarlo per aggiornare la posizione, la rotazione o qualsiasi altra proprietà di un oggetto 3D, o per eseguire qualsiasi altra operazione che deve avvenire ad ogni frame. La funzione che passi a useFrame riceve un oggetto di stato come argomento, che contiene informazioni sul frame corrente, come il timestamp e il tempo trascorso dal frame precedente.

### useThree

Questo hook ti dà accesso al contesto di rendering di @react-three/fiber, che contiene informazioni sulla **_scena_**, la **_fotocamera_** e il **_renderer_**. Puoi usarlo per accedere alla fotocamera, configurare gli ascoltatori di eventi o modificare le proprietà della scena. Restituisce un oggetto con riferimenti agli oggetti di scena, fotocamera e renderer gl, oltre ad altre proprietà utili come la funzione **_setSize_** per ridimensionare il renderer.

## @react-three/drei

## @react-three/cannon

### useSphere

Questo hook crea una sfera 3D nel motore fisico utilizzato da @react-three/cannon. Restituisce una tupla con un riferimento alla sfera e un'API per modificare le sue proprietà, come la sua posizione, velocità e massa. Puoi usarlo per creare oggetti interattivi che possono collidere e interagire con altri oggetti nella scena.
