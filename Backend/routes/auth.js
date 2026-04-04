const express = require('express')
const router = express.Router()
const { studentLogin, driverLogin, adminLogin, getMe } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

router.post('/student/login', studentLogin)
router.post('/driver/login', driverLogin)
router.post('/admin/login', adminLogin)
router.get('/me', protect, getMe)

module.exports = router