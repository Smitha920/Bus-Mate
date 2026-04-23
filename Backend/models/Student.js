const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    usn: { type: String, required: true, unique: true, trim: true, uppercase: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    year: { type: String },
    assignedStop: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    fcmToken: { type: String, default: '' },
    photo: { type: String, default: '' },
  },
  { timestamps: true }
)

studentSchema.pre('save', async function () {
  if (!this.isModified('password')) return 
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  
})

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Student', studentSchema)