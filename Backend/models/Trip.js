const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    driverPhone: {
      type: String,
    },
    busNumber: {
      type: String,
    },
    route: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
    checkOutTime: {
      type: Date,
    },
    date: {
      type: String,
      required: true,
    },
    dutyHours: {
      type: Number,
      default: 0,
    },
    currentLocation: {
      latitude: { type: Number },
      longitude: { type: Number },
      placeName: { type: String, default: '' },
      speed: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Trip', tripSchema)