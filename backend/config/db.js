import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://bhali_tech:billi..12@cluster0.1z8qh03.mongodb.net/food').then(()=>console.log("DB connected"));
}