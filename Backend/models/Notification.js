const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['departure', 'nearby', 'arrival'],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Notification', notificationSchema)