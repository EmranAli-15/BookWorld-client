import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: 0
};

const myCart = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToMyCart: (state) => {
            state.cart = state.cart + 1;
        },
        setPreCart: (state, actions) => {
            state.cart = actions.payload;
        }
    }
});

export default myCart;
export const { addToMyCart, setPreCart } = myCart.actions;