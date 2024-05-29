import mongoose from 'mongoose';

// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }
}, { _id: false });

// Create the model
const itemCartSchema = mongoose.models.cartItem || mongoose.model('cartItem', userCartSchema);

export default itemCartSchema;