import { createSlice } from "@reduxjs/toolkit";
type TOrderDetails = {
    productId: string,
    titile: string,
    price: number,
    image: string,
    quantity: number,
    need: number
}

const initialState = {
    cart: 0,
    orderDetails: <TOrderDetails[]>[]
};

const myCart = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToMyCart: (state) => {
            state.cart = state.cart + 1;
        },
        removeFromMyCart: (state) => {
            state.cart = state.cart - 1;
        },
        setPreCart: (state, actions) => {
            state.cart = actions.payload;
        },
        setOrderDetails: (state, actions) => {
            state.orderDetails = actions.payload;
        },
        resetOrderDetails: (state) => {
            state.orderDetails = [];
        },
        removeOrderDetails: (state, actions) => {
            const filtered = state.orderDetails.filter(p => p.productId !== actions.payload.productId);
            state.orderDetails = filtered;
        },
    }
});

export default myCart;
export const { addToMyCart, setPreCart, setOrderDetails, removeOrderDetails, resetOrderDetails, removeFromMyCart } = myCart.actions;