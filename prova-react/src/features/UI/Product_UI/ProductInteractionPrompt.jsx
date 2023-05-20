import React from 'react';
import '../ui.css';

const ProductInteractionPrompt = ({ productTitle, intersectedProductID }) => {

  return (
    <div className="model-interaction-prompt">
      {intersectedProductID === "decoration" ? "Coming soon" : productTitle}
    </div>
  );
};

export default ProductInteractionPrompt;
