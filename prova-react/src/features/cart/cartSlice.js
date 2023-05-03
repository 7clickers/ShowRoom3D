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
            if(index===-1){
                state.cartItems.push({
                    id:action.payload.id,
                    quantity: action.payload.quantity,
                    basePrice: action.payload.basePrice,
                    price: action.payload.basePrice*action.payload.quantity,
                });
            }else{
                state.cartItems[index].quantity += action.payload.quantity;
                state.cartItems[index].price += action.payload.basePrice*action.payload.quantity;
            }
            state.totalCost = parseFloat(
                (state.totalCost + action.payload.basePrice * action.payload.quantity).toFixed(2)
              );
        },
        removeItem: (state,action)=>{
            const indexOfItem = state.cartItems.findIndex((item)=> item.id===action.payload.id);
            state.totalCost = state.totalCost - state.cartItems[indexOfItem].basePrice;
            if(state.cartItems[indexOfItem].quantity==1){
                state.cartItems.splice(indexOfItem,1);
            }else{
                state.cartItems[indexOfItem].quantity-=1;
                state.cartItems[indexOfItem].price = parseFloat((state.cartItems[indexOfItem].price - state.cartItems[indexOfItem].basePrice).toFixed(2));   
            }
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