import React from 'react';
import { removeItem } from './cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = (props) =>{    
    const dispatch = useDispatch();
    return(
        <div className="cart-item">
            <div className="item">
                <h2 className="product-name">{props.name} - {props.color}</h2>
                <h2 className="product-price">{(props.price).toFixed(2)} €</h2>
            </div>
            <div className="delete-quantity">
                <h2 className="quantity">{props.quantity}</h2>
                <button className="single-delete" onClick={()=>dispatch(removeItem({id: props.name,quantity: props.quantity,basePrice: props.price ,color: props.color}))}>X</button>
            </div>
        </div>
    );
}


export default CartItem;