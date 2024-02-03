import mongoose from "mongoose";


const connetedDb = async ()=>{
    try {
        const connt =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongo db connected with: ${connt.connection.host}`);
    } catch (error) {
        console.log(`Error :${error.message}`);
        process.exit(1)
    }
    
}
export default  connetedDb