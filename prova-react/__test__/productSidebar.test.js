import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import {describe, expect, it} from '@jest/globals';
import { fireEvent,render,screen } from "@testing-library/react";
import React from "react";
import store from '../src/app/Store'
import ProductSidebar from "../src/features/UI/Product_UI/ProductSidebar";
import productsData from "../src/features/products/products.json";

describe('ProductSidebar tests', () => { 
    /* Test di Unità - ProductSidebar  */
    it('Should change the variable selectedColor to the product in example', () => {
        act(() => { render(<Provider store={store}><ProductSidebar product={productsData[0]} isVisible={true}/></Provider>)});
        const btn = screen.getByLabelText("green");
        fireEvent.click(btn);
        const product = store.getState().product.products.find((product) => product.id === "1" );
        expect( product ).toHaveProperty('selectedColor','green');               
    });
    /* Test di Unità - ProductSidebar */
    it('Should remove the selected color if the button with the current color is pressed, putting the standard color to the item',()=>{
        act(() => { render(<Provider store={store}><ProductSidebar product={productsData[0]} isVisible={true}/></Provider>)});
        const btn2 = screen.getByLabelText(productsData[0].selectedColor);
        fireEvent.click(btn2);
        const product = store.getState().product.products.find((product) => product.id === "1" );
        expect( product ).toHaveProperty('selectedColor','standard');       
    });
    /* Test di Unità - ProductSidebar */
    it('Should add more then one quantity of the item selected',()=>{
        act(() => { render(<Provider store={store}><ProductSidebar product={productsData[0]} isVisible={true}/></Provider>)});
        const btn3 = screen.getByText(">");
        fireEvent.click(btn3);
        const inputvalue = screen.getByRole("spinbutton");
        expect(inputvalue.getAttribute("value")).toBe("2");
    });
    /* Test di Unità - ProductSidebar */
    it('Should decrease of one the quantity of the item',()=>{
        act(() => { render(<Provider store={store}><ProductSidebar product={productsData[0]} isVisible={true}/></Provider>)});
        const btn4 = screen.getByText(">");
        fireEvent.click(btn4);
        const btn5 = screen.getByText("<");
        fireEvent.click(btn5);
        const inputvalue = screen.getByRole("spinbutton");
        expect(inputvalue.getAttribute("value")).toBe("1");
    });
    /* Test di Integrità - ProductSidebar + Cart */
    it('Should add an item to the cart',()=>{
        act(() => { render(<Provider store={store}><ProductSidebar product={productsData[0]} isVisible={true}/></Provider>)});
        const addItem = screen.getByText("Aggiungi al carrello");
        fireEvent.click(addItem);
        expect( store.getState().cart.cartItems.length ).toBe(1);
    });
    /* Test di Integrità - ProductSidebar + Cart */
    it('Should add more than one quantity of the item to the cart, testing also if it adds the quantity to the item that is already in the cart',()=>{
        act(() => { render(<Provider store={store}><ProductSidebar product={productsData[0]} isVisible={true}/></Provider>)});
        const btn6 = screen.getByText(">");
        fireEvent.click(btn6);
        fireEvent.click(btn6);
        const addItem2 = screen.getByText("Aggiungi al carrello");
        fireEvent.click(addItem2);
        expect( store.getState().cart.cartItems.length ).toBe(1);
        expect( store.getState().cart.cartItems[0].quantity ).toBe(4);
    });
});