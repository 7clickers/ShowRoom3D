import React from 'react';
import { useState, forwardRef } from 'react';
import '../ui.css';
import { useDispatch } from 'react-redux';
import { addItem,removeAllItems,selectorCartItems,selectorTotalCost} from '../../cart/cartSlice';
import { setSelectedColor } from '../../products/productSlice';

const ProductSidebar = forwardRef(({ product, isVisible }, ref) => {

  if (!product) {
    return null;
  }


  const visibleClass = isVisible ? 'visible' : '';

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity - 1);

  const dispatch = useDispatch();
  const selectedColor = product.selectedColor;

  return (
    <div ref={ref} id="product-sidebar" className={`product-sidebar ${visibleClass}`}>
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
          <div key={variant.colorName} className="color-option">
            <label htmlFor={`color-${variant.colorName}`}>{variant.colorName}</label>
            <input
              type="radio"
              id={`color-${variant.colorName}`}
              name="color"
              className="radio-color"
              value={variant.id}
              checked={variant.colorName === selectedColor}
              onClick={(e) => {
                if (e.target.checked && variant.colorName === selectedColor) {
                  e.target.checked = false;
                  setSelectedColor("standard");
                  dispatch(setSelectedColor({ productID: product.id, colorName: "standard" }));
                } else {
                  setSelectedColor(variant.colorName);
                  dispatch(setSelectedColor({ productID: product.id, colorName: variant.colorName }));
                }
              }}
              onChange={() => {}}
              
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
        <button className="add-btn" onClick={()=>dispatch(addItem({id: product.title, basePrice: product.price, quantity: quantity,color: selectedColor}))} >Aggiungi al carrello</button>
      </div>
    </div>
  );
});

export default ProductSidebar;
