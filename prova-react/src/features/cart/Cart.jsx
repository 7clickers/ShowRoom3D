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

    addEventListener("wheel",(e)=>{
        if(e.wheelDelta<0){
            document.getElementsByClassName("item-scroll")[0].scrollBy(0,80);
        }else if(e.wheelDelta>0){
            document.getElementsByClassName("item-scroll")[0].scrollBy(0,-80);
        }
    });

    let n=0;

    return(
        <div id="cart">
            <h2 id="cart-title">Shopping Cart</h2>
            <ul className="item-scroll">
                {items.map((cartitem)=>{
                    n += 1;
                    return <li key={n}><CartItem name={cartitem.id} quantity={cartitem.quantity} price={cartitem.price} color={cartitem.color}/></li>
                })}
            </ul>
            <hr id="separator"/>
            <p id="total-cost">Total: {totalCost.toFixed(2)} €</p>
            <div id="group-cart">
                <button id="fakebuy">Checkout</button>
                <button id="remove-all" onClick={()=>dispatch(removeAllItems())}>Remove all</button>
            </div>
        </div>
    );
}

export default Cart;