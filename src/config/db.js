import mongoose from "mongoose";
export const dbConnect = async ()=>{


    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected...`)
    }catch(err){
        console.log('Error: ',err);
    }
}
