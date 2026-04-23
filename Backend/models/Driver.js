const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    driverId: { type: String, required: true, unique: true, trim: true, uppercase: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    address: { type: String },
    dob: { type: Date },
    licenseNumber: { type: String, trim: true },
    experience: { type: Number, default: 0 },
    assignedRoute: { type: String },
    photo: { type: String, default: '' },
  },
  { timestamps: true }
)

driverSchema.pre('save', async function () {
  if (!this.isModified('password')) return 
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  
})

driverSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Driver', driverSchema)