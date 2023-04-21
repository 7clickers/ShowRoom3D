const Lights = () => {
    return (
      <>
        <directionalLight position={[3, 0, 3]} intensity={3} castShadow />
        <pointLight position={[0, 0, -3]} intensity={1} castShadow />
        <pointLight position={[0, 0, 4]} intensity={1} castShadow />
        <ambientLight intensity={3} />
      </>
    );
  };
  
  export default Lights;
  