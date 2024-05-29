import foodModel from '../models/foodModel.js'
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'

const foodData = async (req,res)=>{
    try {
        const allFoods = await foodModel.find()

        res.json({success:true,allFoods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const userData = async (req,res)=>{
    try {
        const allUsers = await userModel.find()

        res.json({success:true,allUsers})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const orderData = async (req,res)=>{
    try {
        const allOrders = await orderModel.find()

        res.json({success:true,allOrders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export { foodData , userData , orderData }