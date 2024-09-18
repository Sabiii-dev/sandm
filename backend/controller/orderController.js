import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Placing user order without Stripe
const placeOrder = async (req, res) => {
  try {
    // Create the order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false // Cash on Delivery, payment is pending
    });

    await newOrder.save();
    
    // Clear the cart for the user after placing order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully with Cash on Delivery." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Verify order function no longer required, as no payment confirmation needed

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// List all orders in admin panel
const orderList = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error listing orders" });
  }
};

// Update order status (e.g., from "Item processing" to "Delivered")
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, userOrders, orderList, updateStatus };
