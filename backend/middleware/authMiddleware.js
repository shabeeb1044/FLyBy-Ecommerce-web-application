import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandle.js";
import User from "../model/userModel.js"


//protected routes 
   const protect = asyncHandler(async (req, res, next) => {
    let token;
    //read the jwt from the  cookie 
    token = req.cookies.jwt;
    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
            req.user = await User.findById(decoded.userId).select('-password');
            console.log(req.user);
            next()
                 
          
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized , no failed")
        }

    } else {
        res.status(401);
        throw new Error("Not authorized , no token")
    }
})

// admin middleware 

const admin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401);
            throw new Error("Not authorized admin")
    }
};

export {admin,protect}