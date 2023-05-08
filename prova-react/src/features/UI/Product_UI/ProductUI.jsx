import { useContext, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import SidebarContext from '../../../common/SidebarContext';

import ProductInteractionPrompt from "./ProductInteractionPrompt";
import ProductSidebar from './ProductSidebar';

const ProductUI = () => {
    const sidebarRef = useRef();

    const intersectedProductID = useSelector(
      (state) => state.raycaster.intersectedProductID
    );

    const { isSidebarVisible, setIsSidebarVisible } = useContext(SidebarContext);
    const [lastInteractedProduct, setLastInteractedProduct] = useState(null);

    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        console.log('isSidebarVisible:', isSidebarVisible);
      }, [isSidebarVisible]);

    useEffect(() => {
        if (intersectedProductID) {
          const product = products.find((p) => p.id === intersectedProductID);
          setLastInteractedProduct(product);
        }
      }, [intersectedProductID, products]);

        const handleLeftClick = (event) => {
            if (event.button === 0) {
            if (isSidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarVisible(false);
            } else if (intersectedProductID) {
                setIsSidebarVisible(true);
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
        {intersectedProductID && lastInteractedProduct && (
            <ProductInteractionPrompt productTitle={lastInteractedProduct.title} />
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
