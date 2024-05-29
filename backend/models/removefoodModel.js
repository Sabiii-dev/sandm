import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


foodItemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


const foodItemModel = mongoose.models.foodItem || mongoose.model("foodItem", foodItemSchema);

export default foodItemModel;
