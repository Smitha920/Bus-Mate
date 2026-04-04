const express = require('express')
const router = express.Router()
const {
  checkIn, checkOut, getActiveTrip,
  updateLocation, getDriverHistory, getAllTrips
} = require('../controllers/tripController')
const { protect } = require('../middleware/authMiddleware')
const { roleCheck } = require('../middleware/roleMiddleware')

router.post('/checkin', protect, roleCheck('driver'), checkIn)
router.post('/checkout', protect, roleCheck('driver'), checkOut)
router.patch('/location', protect, roleCheck('driver'), updateLocation)
router.get('/active', protect, getActiveTrip)
router.get('/history/:id', protect, roleCheck('admin'), getDriverHistory)
router.get('/all', protect, roleCheck('admin'), getAllTrips)

module.exports = router