import asyncHandler from "../middleware/asyncHandle.js"
import Order from "../model/orderModel.js"


//@desc : Upadate order to paid
//@desc : Get logged in user
//@route: Get /api/orders/mine
//@access: Private

const getMyOrders = asyncHandler(async (req, res) => {
    // res.send("get my  order items");
    const orders = await Order.find({
        user: req.user._id
    });

    res.status(200).json(orders)
});


//@desc : get order  by id
//@route: Get /api/orders/:id
//@access: Private
const getOrdersById = asyncHandler(async (req, res) => {

    
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
      );
    
    if(order){
        res.status(201).json(order);

    }else{
        res.status(404);
        throw new Error('Order not found');
        
    }

    res.send("get order  by id")

});

//@desc : create new order
//@route: POST /api/orders
//@access: Private
const addOrderItems = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,


    } = req.body;
    // req.orderItems = orderItems;
    if (orderItems && orderItems.length === 0) {
        res.status(404)
        throw new Error("No Order items")
    }else{
        const order = new Order({
            orderItems: orderItems.map((x) =>({
              ...x,
              product: x._id,
              _id: undefined,
            })),   
          
            user: req.user._id,
            userName:req.user.name,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        // console.log(order.user,"lllll");
        res.status(201).json(createdOrder);

    }

});



//@route: PUT /api/orders/:id/pay
//@access: Private/
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    
    const details =  req.body;
    console.log("kkkk",details,"details of deliverd ");
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        console.log("req.params :" ,req.params);
        console.log(req.body.status,"req.body.status,");
        order.paymentResult= {
            id:req.params.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address: req.body.payer.email_address
        }
        
        const UpdateOrder = await order.save();
        console.log(UpdateOrder);
        res.status(200).json(UpdateOrder)

    }else{
        res.status(404);
        throw new Error('Order not found');


    }

});
//@desc : Update order to delivered
//@route: PUT /api/orders/:id/deliver
//@access: Private/admin
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
const order = await Order.findById(req.params.id);
console.log("ppppppppp");
    if(order) {
        order.isDeliverd = true;
        order.deliveredAt =Date.now();

        // const updateOrder = await order.save();

        const updateOrder = await order.save();
if (updateOrder.errors) {
  console.log(updateOrder.errors);
  console.log("hhhhhh");
}
            res.status(200).json(updateOrder);


    }else{
        res.status(404);
        throw new Error("Order not found")
    }

});
//@desc : Update order to delivered
//@route: Get /api/orders
//@access: Private
const getOrders = asyncHandler(async (req, res) => {

    const orders =  await Order.find({}).populate('user','id name')
    res.status(200).json(orders);
    
});

export {
    addOrderItems,
    getMyOrders,
    getOrdersById,
    UpdateOrderToPaid,
    UpdateOrderToDelivered,
    getOrders,
}