const express = require('express')
const router = express.Router()
const {
  addStudent, addDriver,
  getStudents, getDrivers,
  deleteStudent, deleteDriver
} = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')
const { roleCheck } = require('../middleware/roleMiddleware')

router.post('/add-student', protect, roleCheck('admin'), addStudent)
router.post('/add-driver', protect, roleCheck('admin'), addDriver)
router.get('/students', protect, roleCheck('admin'), getStudents)
router.get('/drivers', protect, roleCheck('admin'), getDrivers)
router.delete('/student/:id', protect, roleCheck('admin'), deleteStudent)
router.delete('/driver/:id', protect, roleCheck('admin'), deleteDriver)

module.exports = router