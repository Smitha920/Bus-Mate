const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'driver', 'admin'],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    // Student specific
    usn: {
      type: String,
      trim: true,
      uppercase: true,
    },
    year: {
      type: String,
    },
    assignedStop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stop',
    },
    fcmToken: {
      type: String,
      default: '',
    },
    // Driver specific
    driverId: {
      type: String,
      trim: true,
      uppercase: true,
    },
    licenseNumber: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    dob: {
      type: Date,
    },
    assignedRoute: {
      type: String,
    },
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)