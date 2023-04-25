import Coral from "./model/Coral";

const Models = () => {
    
    return(
    <>
     <Coral
        key="coral1"
        position={[4, 0.2, -10]}
        scale={0.5}
        glbURL={"./src/assets/models/reed_coral.glb"}
    />
    <Coral
        key="coral2"
        position={[4, 0.3, 10]}
        scale={1}
        glbURL={"./src/assets/models/reed_coral.glb"}
    />
    <Coral
        key="coral3"
        position={[-10, 0.3, 2]}
        scale={2}
        glbURL={"./src/assets/models/reed_coral.glb"}
    />
    </>
    )
}

export default Models;