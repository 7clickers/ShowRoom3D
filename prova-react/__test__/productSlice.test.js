import { fireEvent,render,screen } from "@testing-library/react";
import React from "react";
import store from '../src/app/Store'
import { productSlice,setSelectedColor,selectedColorSelector } from "../src/features/products/productSlice";
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import {describe, expect, it} from '@jest/globals';
import ProductSidebar from "../src/features/UI/Product_UI/ProductSidebar";
import productsData from "../src/features/products/products.json";


describe('productSlice tests', () => {
    /*
        Test di Unità - Controlla se la modifica su productSlice funziona
    */
    it('Should change color to the product in example', () => {
        const initialState = {products:[{id:"1",selectedColor: "red"}]};
        const action = setSelectedColor({productID:"1", colorName: "blue"});
        const state = productSlice.reducer(initialState, action);
        expect(state).toEqual({products:[{id: "1",selectedColor: "blue"}]});
    });

    /*
        Test di Integrazione - Controlla se la modifica sul primo prodotto del file JSON funziona
    */
    it('Should change color to the product with the ID=1 imported from the JSON file',()=>{
        const action = setSelectedColor({productID: "1", colorName: "green"});
        const state = productSlice.reducer(productSlice.getInitialState(), action);
        const product = state.products.find((product) => product.id === "1" );
        expect( product ).toHaveProperty('selectedColor','green');
    });
});


