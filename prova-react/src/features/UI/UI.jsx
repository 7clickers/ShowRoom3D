import PlayerPosition from "./UI_elements/PlayerPosition";
import Crosshair from './UI_elements/Crosshair';
import ProductUI from "./Product_UI/ProductUI";

const UI = ({ controlsRef }) => {

    return(
        <>  
            <Crosshair />
            <PlayerPosition />
            <ProductUI controlsRef={controlsRef} />
        </>
   
    )
}

export default UI;