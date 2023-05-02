import { createContext } from "react";

const ProductInteractionContext = createContext({
  intersectedProductID: null,
  setIntersectedProductID: () => {},
});

export default ProductInteractionContext;