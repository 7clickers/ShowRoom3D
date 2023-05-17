import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Cart from '../src/features/cart/Cart';
import { Provider } from "react-redux";
import store from '../src/app/Store'
import { addItem } from "../src/features/cart/cartSlice";
import { act } from 'react-dom/test-utils';


//mock products 
const testProd1 = {id: 1, quantity: 1, basePrice: 100, color: 'black', price: 100};

const testProd2 = {id: 2, quantity: 1, basePrice: 200, color: 'white', price: 200};

describe('CartItem rendering tests', () => {
    it('Should stop rendering item in cart when clicking "X" button', () => {
        act(() => { render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
            store.dispatch(addItem(testProd1));
        });

        const removeItemButton = screen.getByText('X');

        fireEvent.click(removeItemButton);

        expect(store.getState().cart.cartItems).toStrictEqual([]);

    });
});

describe('Cart rendering tests', () => {
    it('Should stop rendering all items in cart when clicking "Remove all" button', () => {
        act(() => { render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
            store.dispatch(addItem(testProd1));
            store.dispatch(addItem(testProd2));
        });

        const removeAllItemButton = screen.getByText('Remove all');

        fireEvent.click(removeAllItemButton);

        expect(store.getState().cart.cartItems).toStrictEqual([]);

    });
    it('Should try to remove the items and work even if cart is empty',()=>{
        act(() => { render(
            <Provider store={store}>
                <Cart />
            </Provider>
        )});

        const removeAllItemButton = screen.getByText('Remove all');

        fireEvent.click(removeAllItemButton);

        expect(store.getState().cart.cartItems).toStrictEqual([]);
    });
});