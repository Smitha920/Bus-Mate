const Stop = require('../models/Stop')

// Get all stops
const getStops = async (req, res) => {
  try {
    const stops = await Stop.find().sort({ order: 1 })
    res.json(stops)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Add stop
const addStop = async (req, res) => {
  try {
    const { name, order, latitude, longitude, route } = req.body
    const stop = await Stop.create({ name, order, latitude, longitude, route })
    res.status(201).json(stop)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getStops, addStop }