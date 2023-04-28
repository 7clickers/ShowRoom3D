import React from 'react';
import '../ui.css';

const ProductSidebar = ({ product, isVisible }) => {

  if (!product) {
    return null;
  }

  const visibleClass = isVisible ? 'visible' : '';

  let quantity = 1;

  const handleIncrement = () => onChange(quantity + 1);
  const handleDecrement = () => onChange(quantity - 1);

  return (
    <div className={`product-sidebar ${visibleClass}`}>
      <div className="general-info">
        <h2 className='product-title'>{product.title}</h2>
        <p className='product-desc'>{product.description}</p>
        <div className="product-specs">
          <p className="product-dimensions">dimensioni: 20x30x10cm</p>
          <p className="product-weight">peso: 244g</p>
        </div>
      </div>
      <div className="color-selection">
        <p>Seleziona il colore:</p>
        {product.availableColors.map((color) => (
          <div key={color} className="color-option">
            <label htmlFor={`color-${color}`}>{color}</label>
            <input
              type="radio"
              id={`color-${color}`}
              name="color"
              className='radio-color'
              value={color}
              checked={color === product.defaultColor}
              readOnly
            />
          </div>
        ))}
      </div>
      <div className="product-quantity">
        <p>quantita': </p>
        <div className="quantity-number-input">
          <button onClick={handleDecrement} className="decrement">
            &lt;
          </button>
          <input type="number" value={quantity} readOnly className="number-input" />
          <button onClick={handleIncrement} className="increment">
            &gt;
          </button>
        </div>
      </div>
      <div className="product-cost">
        <p>costo: </p>
        <p className="amount">{product.price}€</p>
      </div>
      <div className="add-to-cart">
        <button className="add-btn">Aggiungi al carrello</button>
      </div>
    </div>
  );
};

export default ProductSidebar;
