import asyncHandler from "../middleware/asyncHandle.js"
import User from "../model/userModel.js"
import genrateToken from "../utils/genrateToken.js";

//@desc : Auth user && jwt 
//@route: post /users/login
//@acces: public


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("authUser");
    if (user && (await user.matchPassword(password))) {

        genrateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


//@desc : register user && clear cookie 
//@route: post /api/users
//@acces: public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exit");
    }

    const user = await User.create({
        name,
        email,
        password,

    });
    if (user) {
        genrateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
        })

    } else {
        res.status(400);
        throw new Error("invalid user data")
    }

});

//@desc : logout  user && clear cookie 
//@route: get /api/users
//@acces: public
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)

    })
    res.status(200).json({
        message: "Log out successfully"
    })


});

//@desc : get user profile
//@route: get /api/users/profile
//@acces: Private


const getUserProfile = asyncHandler(async (req, res) => {


    console.log("5555000");
    const user = User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status("404");
        throw new Error("User not found")
    }


});

//@desc : update user profile
//@route: put /api/users/profile
//@acces: Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        // console.log(user.name, ".....", user.email);
        if (req.body.password) {
            user.password = req.body.password
        }
        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    }

});

//@desc : update user profile
//@route: put /api/users/profile
//@acces: Private/admin
const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({});
    res.status(200).json(users)
});



//@desc : delete user profile
//@route: delete /api/users/:id
//@acces: Private/admin
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("Cannot delete admin user");

        }
        await user.deleteOne({_id:user._id});
        res.status(200).json({message:"User Delete Successfully"})
    }else{
        res.status(404);
        throw new Error("User not Found")
    }
});
//@desc : get user by id 
//@route: get /api/users/:id
//@acces: Private/Admin
const getUserById = asyncHandler(async (req, res) => {
const user = await User.findById(req.params.id).select('-password');
if(user){
    res.status(200).json(user)

}else{
    res.status(404);
    throw new Error("User not found")
}
});

//@desc : update user profile
//@route: put /api/users/:id
//@acces: Private/admin
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            
        })

    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    updateUserProfile,


}