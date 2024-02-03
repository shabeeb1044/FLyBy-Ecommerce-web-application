import express from "express";
const router = express.Router()
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    updateUserProfile

} from "../controller/userControll.js";

import {admin, protect} from "../middleware/authMiddleware.js"

router.route("/").post(registerUser).get(protect,admin,getUsers);
router.post("/logout" ,logoutUser);
router.post("/login" ,authUser);
router.route("/profile").get(protect,admin,getUserProfile).put(protect,updateUserProfile);
router.route("/:id").delete(protect,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)







export default router