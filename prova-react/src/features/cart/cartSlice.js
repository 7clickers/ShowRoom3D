import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cartItems: [],
    totalCost: 0
};

const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem:(state,action)=>{
            const index=state.cartItems.findIndex(object=>{return object.id===action.payload.id;}); //Controlla l'object che combacia, in alternativa da -1 e aggiunge al carrello, else aggiunge +1 qtà
            if(index===-1)
                state.cartItems.push({
                id:action.payload.id,
                quantity:1
                });
            else
                state.cartItems[index].quantity+=1;

            state.totalCost+=action.payload.basePrice; //In ogni caso aumento il total cost
    },
    removeItem: (state,action)=>{
        const indexOfItem=state.cartItems.findIndex((item)=> item.id===action.payload.id);
        if(state.cartItems[indexOfItem].quantity==1)
            state.cartItems.splice(indexOfItem,1);
        else
            state.cartItems[indexOfItem].quantity-=1;
        state.totalCost-=action.payload.price;
    },
    removeAllItems: (state)=>{
        state.cartItems.splice(0);
        state.totalCost=0;
    },
    }
});
export const {addItem,removeItem,removeAllItems}=cartSlice.actions;
export const selectorCartItems=(state)=>state.cart.cartItems;
export const selectorTotalCost=(state)=>state.cart.totalCost;
export default cartSlice.reducer;