import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSidebarVisible } from '../uiSlice';
import ProductInteractionPrompt from "./ProductInteractionPrompt";
import ProductSidebar from './ProductSidebar';

const ProductUI = () => {
    const dispatch = useDispatch();
    const sidebarRef = useRef();

    const intersectedProductID = useSelector(
      (state) => state.raycaster.intersectedProductID
    );

    const isSidebarVisible = useSelector((state) => state.ui.isSidebarVisible);
    const [lastInteractedProduct, setLastInteractedProduct] = useState(null);

    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        console.log('isSidebarVisible:', isSidebarVisible);
      }, [isSidebarVisible]);

    useEffect(() => {
        if (intersectedProductID == "decoration"){
          setLastInteractedProduct(null);
        }
        if (intersectedProductID) {
          const product = products.find((p) => p.id === intersectedProductID);
          setLastInteractedProduct(product);
        }
      }, [intersectedProductID, products]);

        const handleLeftClick = (event) => {
            if (event.button === 0) {
            if (isSidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                dispatch(setIsSidebarVisible(false));
            } else if (intersectedProductID && intersectedProductID != "decoration") {
                dispatch(setIsSidebarVisible(true));
            }
            }
        };

      // Replace the previous event listener code with this one
      useEffect(() => {
        document.addEventListener("mousedown", handleLeftClick);
        return () => {
          document.removeEventListener("mousedown", handleLeftClick);
        };
      }, [setIsSidebarVisible, intersectedProductID, isSidebarVisible]);
      

    return(
        <>
          {(intersectedProductID && (lastInteractedProduct || intersectedProductID === "decoration")) && (
            <ProductInteractionPrompt productTitle={lastInteractedProduct?.title} intersectedProductID={intersectedProductID} />
          )}
            <ProductSidebar
            ref={sidebarRef} 
            product={lastInteractedProduct} 
            isVisible={isSidebarVisible}
            />

        </> 
    )
}

export default ProductUI;
