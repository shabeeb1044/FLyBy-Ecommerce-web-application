import express from "express";
const router = express.Router()
import {createProduct, getProduct,getProductById, updateProduct,deleteProduct,createProductReview,getTopRatedProduct} from "../controller/productControll.js"
import asyncHandler from "../middleware/asyncHandle.js";
import { admin ,protect} from "../middleware/authMiddleware.js";
router.get("/top",getTopRatedProduct)

// import Product from "../model/productsModel.js"

router.route("/").get(getProduct).post(protect,admin,createProduct)
router.route("/:id").get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)
router.route("/:id/reviews").post(protect,createProductReview);


export default router