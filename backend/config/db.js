import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://sandm:123@cluster0.whyuq.mongodb.net/sandm').then(()=>console.log("DB connected"));
}