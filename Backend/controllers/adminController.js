const User = require('../models/User')

// Add Student
const addStudent = async (req, res) => {
  try {
    const { name, usn, password, phone, year, assignedStop } = req.body

    if (!name || !usn || !password || !phone) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    const exists = await User.findOne({ usn: usn.toUpperCase() })
    if (exists) {
      return res.status(400).json({ message: 'Student with this USN already exists' })
    }

    const student = await User.create({
      name,
      usn: usn.toUpperCase(),
      uniqueId: usn.toUpperCase(),
      password,
      phone,
      year,
      assignedStop,
      role: 'student',
    })

    res.status(201).json({
      _id: student._id,
      name: student.name,
      usn: student.usn,
      role: student.role,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Add Driver
const addDriver = async (req, res) => {
  try {
    const { name, driverId, password, phone, address, dob, licenseNumber, experience, assignedRoute } = req.body

    if (!name || !driverId || !password || !phone || !licenseNumber) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    const exists = await User.findOne({ driverId: driverId.toUpperCase() })
    if (exists) {
      return res.status(400).json({ message: 'Driver with this ID already exists' })
    }

    const driver = await User.create({
      name,
      driverId: driverId.toUpperCase(),
      uniqueId: driverId.toUpperCase(),
      password,
      phone,
      address,
      dob,
      licenseNumber,
      experience,
      assignedRoute,
      role: 'driver',
    })

    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      driverId: driver.driverId,
      role: driver.role,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .populate('assignedStop', 'name')
      .sort({ createdAt: -1 })
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all drivers
const getDrivers = async (req, res) => {
  try {
    const drivers = await User.find({ role: 'driver' })
      .select('-password')
      .sort({ createdAt: -1 })
    res.json(drivers)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete student
const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Student deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete driver
const deleteDriver = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Driver deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = {
  addStudent, addDriver,
  getStudents, getDrivers,
  deleteStudent, deleteDriver
}