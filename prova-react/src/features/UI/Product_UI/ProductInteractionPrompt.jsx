import React from 'react';
import '../ui.css';

const ProductInteractionPrompt = ({ productTitle }) => {

  return (
    <div className="model-interaction-prompt">
      {productTitle}
    </div>
  );
};

export default ProductInteractionPrompt;
