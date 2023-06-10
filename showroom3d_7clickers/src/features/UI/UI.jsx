import PlayerPosition from "./UI_elements/PlayerPosition";
import Crosshair from './UI_elements/Crosshair';
import ProductUI from "./Product_UI/ProductUI";
import Cart from "../cart/Cart";

const UI = ({ controlsRef }) => {

    return(
        <>  
        <div>
            <Crosshair />
            <PlayerPosition />
            <ProductUI controlsRef={controlsRef} />
            <Cart />
        </div>

        </>
   
    )
}

export default UI;
