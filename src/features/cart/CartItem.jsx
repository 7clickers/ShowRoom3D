import React from 'react';
import { removeItem } from './cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = (props) =>{    
    const dispatch = useDispatch();
    return(
        <div className="cart-item">
            <div className="item">
                <p className="product-name">{props.name} - {props.color}</p>
                <p className="product-price">{(props.price).toFixed(2)} €</p>
            </div>
            <div className="delete-quantity">
                <p className="quantity">{props.quantity}</p>
                <button className="single-delete" onClick={()=>dispatch(removeItem({id: props.name,quantity: props.quantity,basePrice: props.price ,color: props.color}))}>X</button>
            </div>
        </div>
    );
}


export default CartItem;