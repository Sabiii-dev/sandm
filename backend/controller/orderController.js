import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Placing user order without Stripe
const placeOrder = async (req, res) => {
  try {
    // Get userId from token if it exists
    let userId = null;
    if (req.headers.token) {
      try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (error) {
        console.log("Token verification failed:", error);
      }
    }

    // If userId wasn't found in token, try to get it from request body
    userId = userId || req.body.userId;

    // Create the order with customer information
    const newOrder = new orderModel({
      userId: userId, // This will be null if no userId was found
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false
    });

    await newOrder.save();
    
    // If userId exists, clear their cart
    if (userId) {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }

    res.json({ 
      success: true, 
      message: "Order placed successfully with Cash on Delivery.",
      orderId: newOrder._id 
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Verify order function no longer required, as no payment confirmation needed
const userOrders = async (req, res) => {
  try {
    let orders;
    
    if (req.body.userId) {
      // For logged-in users
      orders = await orderModel.find({ userId: req.body.userId });
    } else if (req.body.customerEmail || req.body.customerPhone) {
      // For non-logged-in users
      const query = {};
      if (req.body.customerEmail) query.customerEmail = req.body.customerEmail;
      if (req.body.customerPhone) query.customerPhone = req.body.customerPhone;
      
      orders = await orderModel.find(query).sort({ date: -1 });
    } else {
      return res.json({ success: false, message: "Please provide search criteria" });
    }

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};
const loginuserOrders = async (req, res) => {
  try {
    console.log
    const orders = await orderModel.find({ userId: req.body.userId });

    console.log("orders",orders)
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

export { placeOrder, userOrders, orderList, updateStatus,loginuserOrders };
