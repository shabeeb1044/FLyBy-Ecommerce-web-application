import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',

    },
    userName:{
        type:String,
        require:true,
        
    },
    orderItems: [
        {
            name: { type: String, require: true, },
            qty: { type: Number, require: true, },
            image: { type: String, require: true, },
            price: { type: Number, require: true, },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: "Product",

            },

        },
    ],
    shippingAddress: {
        address: { type: String, require: true },
        city: { type: String, require: true },
        postalCode: { type: String, require: true },
        country: { type: String, require: true },
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    itemPrice: {
        type:Number,
        require:true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    shippingPrize:{
        type:Number,
        require:true,
        default:0.0,
    },
    totalPrice:{
        type:Number,
        require:true,
        default:0.0,
    },
    isPaid:{
        type:Boolean,
        require:true,
        default:false,
    },
    paidAt:{
        type:Date,

    },
    isDeliverd:{
        type:Boolean,
        require:true,
        default:false,
    },
    deliveredAt:{
        type:Date,
    },

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);
export default Order