import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProductInteractionContext from '../../../common/ProductInteractionContext';
import SidebarContext from '../../../common/SidebarContext';

import ProductInteractionPrompt from "./ProductInteractionPrompt";
import ProductSidebar from './ProductSidebar';

const ProductUI = () => {
    const { intersectedProductID } = useContext(ProductInteractionContext);
    const { isSidebarVisible, setIsSidebarVisible } = useContext(SidebarContext);
    const [lastInteractedProduct, setLastInteractedProduct] = useState(null);

    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        if (intersectedProductID) {
          const product = products.find((p) => p.id === intersectedProductID);
          setLastInteractedProduct(product);
        }
      }, [intersectedProductID, products]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'e' || event.key === 'E') {
                setIsSidebarVisible((prevVisible) => !prevVisible);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [setIsSidebarVisible]);
      

    return(
        <>
        {intersectedProductID && lastInteractedProduct && (
            <ProductInteractionPrompt productTitle={lastInteractedProduct.title} />
        )}
        {isSidebarVisible && (
            <ProductSidebar product={lastInteractedProduct} isVisible={isSidebarVisible} />
        )}
        </> 
    )
}

export default ProductUI;
