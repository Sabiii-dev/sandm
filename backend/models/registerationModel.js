import mongoose from 'mongoose'

const registerationSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
})

const registerationModel = mongoose.models.registeration || mongoose.model("registeration",registerationSchema)

export default registerationModel