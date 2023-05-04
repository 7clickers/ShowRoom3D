import { render } from "@testing-library/react";
import React from "react";
import Cart from '../src/features/cart/Cart';
import { Provider } from "react-redux";
import store from '../src/app/Store'
import { addItem, removeAllItems, removeItem } from "../src/features/cart/cartSlice";
import { act } from 'react-dom/test-utils';

describe('Cart tests', () => {

    //act is used whenever a test needs to produce a state change in the store
    act(() => { render(
        <Provider store={store}>
            <Cart />
        </Provider>
    );

    });

    //mock products 
    const testProd1 = {id: 1, quantity: 1, basePrice: 100, color: 'black', price: 100};

    const testProd1double = {id: 1, quantity: 2, basePrice: 100, color: 'black', price: 200};

    const testProd2 = {id: 2, quantity: 1, basePrice: 200, color: 'white', price: 200};

    const testProd3 = {id: 3, quantity: 1, basePrice: 300, color: 'red', price: 300};

    describe('addItem() tests', () => {

        it('Should add a new item to the cart when calling addItem()', () => {

            act(() => { 
    
            store.dispatch(addItem(testProd1));
            store.dispatch(addItem(testProd2));
            store.dispatch(addItem(testProd3));
    
            });
    
            expect(store.getState().cart.cartItems).toStrictEqual([testProd1, testProd2, testProd3]);
        });

        it('Should increase quantity of product in cart when adding a product with the same id when calling addItem()', () => {
            
            act(() => { 

            store.dispatch(addItem(testProd1));

            });
    
            expect(store.getState().cart.cartItems).toStrictEqual([testProd1double, testProd2, testProd3]);
        });

    });

    describe('removeItem() tests', () => {

        it('Should decrease quantity of product in cart when removing a product with the same id when calling removeItem()', () => {

            act(() => { 
    
            store.dispatch(removeItem(testProd1));
    
            });
    
            expect(store.getState().cart.cartItems).toStrictEqual([testProd1, testProd2, testProd3]);
        });

        it('Should remove product from the cart when removing the last unit with the same id when calling removeItem()', () => {

            act(() => { 
    
            store.dispatch(removeItem(testProd3));
    
            });
    
            expect(store.getState().cart.cartItems).toStrictEqual([testProd1, testProd2]);
        });
    });
    
    it('Should remove all items from the cart when calling removeAllItems()', () => {

        act(() => { 

        store.dispatch(removeAllItems());

        });

        expect(store.getState().cart.cartItems).toStrictEqual([]);
    });
});