import React from 'react';
import CartItem from './CartItem';
import { removeAllItems, selectorCartItems } from './cartSlice';
import { selectorTotalCost } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./cart.css";

const Cart = () =>{
    const items = useSelector(selectorCartItems);
    const totalCost = useSelector(selectorTotalCost);
    const dispatch = useDispatch();
    return(
        <div id="cart">
            <h2 id="cart-title">Shopping Cart</h2>
            {items.map((cartitem)=>{
                return <CartItem name={cartitem.id} quantity={cartitem.quantity} price={cartitem.price} />
            })}
            <hr id="separator"/>
            <div id="group-cart">
                <button id="remove-all" onClick={()=>dispatch(removeAllItems())}>Rimuovi tutto</button>
                <p id="total-cost">{totalCost} €</p>
            </div>
        </div>
    );
}

export default Cart;