import {apiSlice} from "./apiSlice";
import { ORDER_URL,PAYPAL_URL } from "../constence";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        createOrder:builder.mutation({
          query:(order) =>({
            url:ORDER_URL,
            method:"POST",
            body:{...order}
        })  
        }),
        getOrderDetails:builder.query({
            query:(orderId)=>({
                url:`${ORDER_URL}/${orderId}`,
                method:"GET",
            }),
            keepUnusedDataFor:5
        }),
        payOrder:builder.mutation({
            query:({orderId,details}) =>({
                url:`${ORDER_URL}/${orderId}/pay`,
                method: 'PUT',
                body:{...details},

            })
        }),
        getPaypalClientId:builder.query({
            query:()=>({
                url:PAYPAL_URL,
            }),
            keepUnusedDataFor:5,        
        }),
     getMyOrder:builder.query({
        query:() => ({
            url: `${ORDER_URL}/mine`,    
            method:'GET' 
        }),
        keepUnusedDataFor:5,        

     }),
     getOrders:builder.query({
        query:()=>({
          url:ORDER_URL,
        }),
        keepUnusedDataFor:5,
     }),
     deliverOrder:builder.mutation({
        query:(orderId) =>({
            url:`${ORDER_URL}/${orderId}/deliver`,
            method:'PUT'
        })
    })
    }),
    
})

export const { useCreateOrderMutation ,useGetOrderDetailsQuery
    ,usePayOrderMutation,useGetPaypalClientIdQuery,useGetMyOrderQuery,useGetOrdersQuery,useDeliverOrderMutation} = orderApiSlice;
