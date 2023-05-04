import { useContext } from "react";
import PlayerPosition from "./UI_elements/PlayerPosition";
import Crosshair from './UI_elements/Crosshair';
import ProductUI from "./Product_UI/ProductUI";
import Cart from "../cart/Cart";

import SidebarContext from "../../common/SidebarContext";

const UI = ({ controlsRef }) => {
    const { isSidebarVisible, setIsSidebarVisible } = useContext(SidebarContext);

    return(
        <>  
        <div>
            <Crosshair />
            <PlayerPosition />
            <ProductUI controlsRef={controlsRef} />
            {isSidebarVisible && <Cart />}
        </div>

        </>
   
    )
}

export default UI;
