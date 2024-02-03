import jwt from "jsonwebtoken"

const genrateToken = (res,userId)=>{
    console.log("user id : ", userId);
    const token = jwt.sign({userId}, process.env.JWT_SECRET_CODE,
        {
            expiresIn: "30d"
        }
    )

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}

export default  genrateToken                                        