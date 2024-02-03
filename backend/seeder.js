import mongoose from "mongoose";
import dotenv from "dotenv";
import users from './data/user.js';
import products from "./data/products.js";
import colors from  "colors"
//models
import User from "./model/userModel.js";
import Product from "./model/productsModel.js";
import Order from "./model/orderModel.js";
/////////
import connetedDb from "./config/db.js";

dotenv.config();

connetedDb();

const importData = async () => {
    try {

        await Order.deleteMany()
        await Product.deleteMany();
        await User.deleteMany();

        

        const createUser = await User.insertMany(users);
        
        const adminUser = createUser[0]._id;
        const sampleproducts = products.map((product) => {
            return { ...product, user: adminUser }

        })
        await Product.insertMany(sampleproducts);
        console.log("data imported");
        process.exit()
    } catch (error) {
        console.log(`${error}`);
        process.exit(1)
    }
}

const distoryData = async () => {
    try {

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("distroy data ");
        process.exit()

    } catch (error) {

        console.log(`${error}`);
        process.exit(1)
    }
}



if(process.argv[2] ==  '-d'){

    distoryData()

}else{
    importData()
}