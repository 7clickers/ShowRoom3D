const Lights = () => {
    return (
      <>
        <directionalLight position={[3, 0, 3]} intensity={0.5} castShadow />
        <pointLight position={[0, 0, -3]} intensity={0.6} castShadow />
        <pointLight position={[0, 0, 4]} intensity={0.6} castShadow />
        <ambientLight intensity={0.6} />
      </>
    );
  };
  
  export default Lights;
  