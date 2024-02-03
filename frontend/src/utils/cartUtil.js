

export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}
export const updateCart  =(state) => {
            //calculate item price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

            // calculate shopping prize(if order over $100 then fee add $ 10 doller shipping fee )
 
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
            //calculate total price 15% tax

            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)))

            //calcultate total price 
            state.totalPrice = (Number(state.itemsPrice) +
                 Number(state.shippingPrice) +
                Number(state.taxPrice)).toFixed(2);

             localStorage.setItem("cart", JSON.stringify(state))
             return state

}