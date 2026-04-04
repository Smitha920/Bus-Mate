const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/User')
const Stop = require('./models/Stop')

const stops = [
  { name: 'Suburb Bus Stop',order: 1, latitude: 12.2958, longitude: 76.6394, route: 'Route A' },
  { name: 'R-gate', order: 2, latitude: 12.3020, longitude: 76.6450, route: 'Route A' },
  { name: 'Palace Gate',     order: 3, latitude: 12.3080, longitude: 76.6510, route: 'Route A' },
  { name: 'Dasappa', order: 4, latitude: 12.3140, longitude: 76.6570, route: 'Route A' },
  { name: 'Vontikoppal', order: 5, latitude: 12.3200, longitude: 76.6630, route: 'Route A' },
  { name: 'College',     order: 7, latitude: 12.3320, longitude: 76.6750, route: 'Route A' },
]

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await User.deleteMany()
    await Stop.deleteMany()
    console.log('Cleared existing data')

    // Add stops
    const createdStops = await Stop.insertMany(stops)
    console.log('Stops added:', createdStops.length)

    // Add admin
    const adminPassword = await bcrypt.hash('admin123', 10)
    await User.create({
      name: 'Admin',
      uniqueId: 'admin',
      password: adminPassword,
      role: 'admin',
    })
    console.log('Admin created — username: admin, password: admin123')

    // Add driver
    const driverPassword = await bcrypt.hash('driver123', 10)
    await User.create({
      name: 'Naveen',
      uniqueId: 'DRV001',
      driverId: 'DRV001',
      password: driverPassword,
      role: 'driver',
      phone: '9876543210',
      assignedRoute: 'Route A',
      licenseNumber: 'KA0120190012345',
      experience: 5,
    })
    console.log('Driver created — ID: DRV001, password: driver123')

    // Add student
    const studentPassword = await bcrypt.hash('student123', 10)
    await User.create({
      name: 'Test Student',
      uniqueId: '1VV22CS001',
      usn: '1VV22CS001',
      password: studentPassword,
      role: 'student',
      phone: '9876543211',
      year: '2nd Year',
      assignedStop: createdStops[2]._id,
    })
    console.log('Student created — USN: 1VV22CS001, password: student123')

    console.log('Seed completed successfully')
    process.exit()
  } catch (err) {
    console.log('Seed error:', err)
    process.exit(1)
  }
}

seedData()