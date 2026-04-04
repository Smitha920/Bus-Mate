const mongoose = require('mongoose')

const stopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    route: {
      type: String,
      default: 'Route A',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Stop', stopSchema)