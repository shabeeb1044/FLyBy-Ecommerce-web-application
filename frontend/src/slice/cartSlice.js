import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtil";
const initialState = localStorage.getItem("cart") ? JSON.parse
    (localStorage.getItem("cart")) : { cartItems: [],shippingAddress:{} , PaymentMethod: "PayPal"};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            console.log(item);
            const existItem = state.cartItems.find((x) => x._id === item._id);
            console.log("existItem: ", existItem);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);

            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart:(state,action) =>{
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
        },
        saveShippingAddress:(state,action)=> {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },
        savePaymentMethod:(state,action)=>{
            state.PaymentMethod = action.payload;
            return updateCart(state)
        },
        clearCartItems:(state,action) => {
            state.cartItems = [];
            return updateCart(state)
        }

    }
})
export const { addToCart,removeFromCart ,saveShippingAddress,savePaymentMethod,clearCartItems} = cartSlice.actions
export default cartSlice.reducer

