const Trip = require('../models/Trip')
const User = require('../models/User')

// Driver Check In
const checkIn = async (req, res) => {
  try {
    const driver = await User.findById(req.user._id)

    // Check if already active trip
    const existingTrip = await Trip.findOne({
      driver: req.user._id,
      status: 'active'
    })

    if (existingTrip) {
      return res.status(400).json({ message: 'You already have an active trip' })
    }

    const today = new Date().toLocaleDateString('en-IN', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    })

    const trip = await Trip.create({
      driver: req.user._id,
      driverName: driver.name,
      driverPhone: driver.phone,
      route: driver.assignedRoute || 'Route A',
      date: today,
      checkInTime: new Date(),
      status: 'active',
    })

    res.status(201).json(trip)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Driver Check Out
const checkOut = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      driver: req.user._id,
      status: 'active'
    })

    if (!trip) {
      return res.status(404).json({ message: 'No active trip found' })
    }

    const checkOutTime = new Date()
    const dutyHours = ((checkOutTime - trip.checkInTime) / (1000 * 60 * 60)).toFixed(2)

    trip.status = 'completed'
    trip.checkOutTime = checkOutTime
    trip.dutyHours = dutyHours
    await trip.save()

    res.json(trip)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get active trip
const getActiveTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ status: 'active' }).populate('driver', 'name phone')
    if (!trip) {
      return res.status(404).json({ message: 'No active trip' })
    }
    res.json(trip)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Update bus location
const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude, placeName, speed } = req.body

    const trip = await Trip.findOne({
      driver: req.user._id,
      status: 'active'
    })

    if (!trip) {
      return res.status(404).json({ message: 'No active trip found' })
    }

    trip.currentLocation = { latitude, longitude, placeName, speed }
    await trip.save()

    res.json({ message: 'Location updated' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Get driver trip history
const getDriverHistory = async (req, res) => {
  try {
    const trips = await Trip.find({ driver: req.params.id })
      .sort({ createdAt: -1 })
    res.json(trips)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all trips - admin
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('driver', 'name phone driverId')
      .sort({ createdAt: -1 })
    res.json(trips)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  checkIn, checkOut, getActiveTrip,
  updateLocation, getDriverHistory, getAllTrips
}