import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    // Make userId optional since we're allowing non-authenticated orders
    userId: { type: String, required: false },
    
    // Add customer information fields
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    
    // Keep existing fields
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Item processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false },
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel;