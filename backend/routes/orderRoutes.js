import express from "express";
const router = express.Router()
import {
    addOrderItems,
    getMyOrders,
    getOrdersById,
    UpdateOrderToPaid,
    UpdateOrderToDelivered,
    getOrders,

} from "../controller/orderControll.js";

import {admin, protect} from "../middleware/authMiddleware.js"

router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders);
router.route("/mine").get(protect,getMyOrders);
router.route("/:id").get(protect,getOrdersById);
router.route("/:id/pay").put(protect,UpdateOrderToPaid);
router.route("/:id/deliver").put(protect,admin,UpdateOrderToDelivered);

export default router