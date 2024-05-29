import mongoose from 'mongoose';

const userAddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userAddressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const userAddressModel = mongoose.models.userAddress || mongoose.model('userAddress', userAddressSchema);

export default userAddressModel;
