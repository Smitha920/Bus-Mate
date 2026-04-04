const express = require('express')
const router = express.Router()
const { getStops, addStop } = require('../controllers/stopController')
const { protect } = require('../middleware/authMiddleware')
const { roleCheck } = require('../middleware/roleMiddleware')

router.get('/', protect, getStops)
router.post('/', protect, roleCheck('admin'), addStop)

module.exports = router