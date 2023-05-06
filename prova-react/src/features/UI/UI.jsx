import { useContext, useEffect, useState } from "react";
import PlayerPosition from "./UI_elements/PlayerPosition";
import Crosshair from './UI_elements/Crosshair';
import ProductUI from "./Product_UI/ProductUI";
import Cart from "../cart/Cart";

import SidebarContext from "../../common/SidebarContext";

const UI = ({ controlsRef }) => {
    const { isSidebarVisible, setIsSidebarVisible } = useContext(SidebarContext);
    const [ready,setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setReady(!ready);
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

    return(
        <>  
        <div>
            <Crosshair />
            <PlayerPosition />
            <ProductUI controlsRef={controlsRef} />
            {ready && <Cart />}
        </div>

        </>
   
    )
}

export default UI;
