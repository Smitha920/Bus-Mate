const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// Student Login
const studentLogin = async (req, res) => {
  try {
    const { usn, password } = req.body

    if (!usn || !password) {
      return res.status(400).json({ message: 'Please provide USN and password' })
    }

    const user = await User.findOne({ usn: usn.toUpperCase(), role: 'student' })

    if (!user) {
      return res.status(401).json({ message: 'Invalid USN or not registered' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      usn: user.usn,
      role: user.role,
      assignedStop: user.assignedStop,
      phone: user.phone,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Driver Login
const driverLogin = async (req, res) => {
  try {
    const { driverId, password } = req.body

    if (!driverId || !password) {
      return res.status(400).json({ message: 'Please provide Driver ID and password' })
    }

    const user = await User.findOne({ driverId: driverId.toUpperCase(), role: 'driver' })

    if (!user) {
      return res.status(401).json({ message: 'Invalid Driver ID or not registered' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      driverId: user.driverId,
      role: user.role,
      phone: user.phone,
      busNumber: user.busNumber,
      assignedRoute: user.assignedRoute,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' })
    }

    const user = await User.findOne({ uniqueId: username, role: 'admin' })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get current user
const getMe = async (req, res) => {
  res.json(req.user)
}

module.exports = { studentLogin, driverLogin, adminLogin, getMe }