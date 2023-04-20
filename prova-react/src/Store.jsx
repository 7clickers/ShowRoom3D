import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {value: { forward: false, backward: false, left: false, right: false, jump: false }};
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        movement: (state, action) => {
            switch(action.payload){
                case 'ArrowUp': state.value.forward = true ; break;
                case 'ArrowDown': state.value.backward = true; break;
                case 'ArrowLeft': state.value.left = true; break;
                case 'ArrowRight': state.value.right = true; break;
                case 'Space': state.value.jump = true; break;
                default: state = initialState;
            }
        },
        stop: (state, action) => {   
            switch(action.payload){
                case 'ArrowUp': state.value.forward = false ; break;
                case 'ArrowDown': state.value.backward = false; break;
                case 'ArrowLeft': state.value.left = false; break;
                case 'ArrowRight': state.value.right = false; break;
                case 'Space': state.value.jump = false; break;
                default: state = initialState;
            }
        },
    },
});

export const { movement, stop } = playerSlice.actions;
export const Store = configureStore({
    reducer: {
        player: playerSlice.reducer,
    },
});




