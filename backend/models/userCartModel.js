import mongoose from 'mongoose';


const userCartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  userCartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Create the model
  const userCartModel = mongoose.models.userCart || mongoose.model('userCart', userCartSchema);
  
  export default userCartModel;