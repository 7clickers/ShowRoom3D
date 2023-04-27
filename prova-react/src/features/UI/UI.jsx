import { useContext } from 'react';
import ProductInteractionContext from '../../common/ProductInteractionContext';
import ModelInteractionPrompt from "./UI_elements/ModelInteractionPrompt";
import PlayerPosition from "./UI_elements/PlayerPosition";
import Crosshair from './UI_elements/Crosshair';

const UI = () => {
    const { intersectedProductName } = useContext(ProductInteractionContext);

    return(
        <>  
            <Crosshair />
            <PlayerPosition />
            {intersectedProductName && (
                <ModelInteractionPrompt productName={intersectedProductName} />
            )}
        </>
   
    )
}

export default UI;