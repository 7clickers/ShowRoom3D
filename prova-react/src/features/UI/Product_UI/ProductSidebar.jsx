import React from 'react';
import { useState } from 'react';
import '../ui.css';
import { useDispatch,useSelector } from 'react-redux';
import { addItem,removeAllItems,selectorCartItems,selectorTotalCost} from '../../cart/cartSlice';

const ProductSidebar = ({ product, isVisible }) => {

  if (!product) {
    return null;
  }

  const visibleClass = isVisible ? 'visible' : '';

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity - 1);

  const dispatch = useDispatch();

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
        {product.variants.map((variant) => (
          <div key={variant.id} className="color-option">
            <label htmlFor={`color-${variant.id}`}>{variant.color}</label>
            <input
              type="radio"
              id={`color-${variant.id}`}
              name="color"
              className="radio-color"
              value={variant.id}
              checked={variant.id === selectedVariantID}
              onChange={() => setSelectedVariantID(variant.id)}
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
        <button className="add-btn" onClick={()=>dispatch(addItem({id: product.title, basePrice: product.price, quantity: quantity}))} >Aggiungi al carrello</button>
      </div>
    </div>
  );
};

export default ProductSidebar;
