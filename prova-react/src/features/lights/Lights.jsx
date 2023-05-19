const Lights = () => {
    return (
      <>
        <directionalLight
          castShadow={true}
          position={[0, 30, 0]}
          intensity={0.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={10}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

      </>
    );
  };
  
  export default Lights;
  