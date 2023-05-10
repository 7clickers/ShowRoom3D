import store from '../src/app/Store'
import {describe, expect, it} from '@jest/globals';
import { cartSlice,addItem,removeItem,removeAllItems,selectorCartItems,selectorTotalCost } from "../src/features/cart/cartSlice";

/* Test di Unità - cartSlice */

describe('cartSlice tests',()=>{

    //Sample products
    const testProd1 = {id: 10, quantity: 1, basePrice: 100, color: 'black', price: 100};

    const testProd2 = {id: 20, quantity: 1, basePrice: 200, color: 'red', price: 200};

    const itemToDelete = {id: 30, quantity: 1, basePrice: 200, color: 'white'};

    const fakeItem = {name: "falso"};
   
    describe('cartSlice addItem tests',()=>{
    it('Should add an item to the array (that represents the logic of the cart) of the slice and increment the totalCost',()=>{
        const initialState = cartSlice.getInitialState();
        const action = addItem(testProd1);
        const state = cartSlice.reducer(initialState,action);
        expect(state).toEqual({cartItems:[testProd1],totalCost: testProd1.basePrice*testProd1.quantity});
   });

   it('Should be able to use the cartItems selector and the totalCost selector',()=>{
        store.dispatch(addItem(testProd2));
        const itemsCart = selectorCartItems(store.getState());
        const costTotal = selectorTotalCost(store.getState());
        const initialState = cartSlice.getInitialState();
        const action = addItem(testProd2);
        const state = cartSlice.reducer(initialState,action);
        expect(state).toEqual({cartItems:itemsCart,totalCost:costTotal});
   });
   }); 

   describe('cartSlice remove actions test',()=>{
    it('Should remove all the item in the cart',()=>{
        store.dispatch(addItem(itemToDelete));
        store.dispatch(removeAllItems());
        expect(store.getState().cart.cartItems.length).toEqual(0);    
       });
    
       it('Should remove the item in example',()=>{
        store.dispatch(addItem(itemToDelete));
        store.dispatch(removeItem(itemToDelete));
        expect(store.getState().cart.cartItems.length).toEqual(0);
       });     
   });

   describe('invalid actions on cartSlice',()=>{
    it('Should be able to work even if the item provided do not exist in the cart',()=>{
        expect(store.dispatch(removeItem(itemToDelete))).toBeTruthy();
    });
   it('Should remove all the items even if the cart is empty',()=>{
    expect(store.dispatch(removeAllItems())).toBeTruthy();
   });
   it('Should not be able to add this item',()=>{
    store.dispatch(addItem(fakeItem));
    expect(store.getState().cart.cartItems.length).toBe(0);
   });
});
});