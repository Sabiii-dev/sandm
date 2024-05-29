import mongoose from 'mongoose';


const userPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardholderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true }, 
  cvv: { type: String, required: true }
}); 


const userPaymentModel = mongoose.models.userPayment || mongoose.model('userPayment', userPaymentSchema);

export default userPaymentModel;
