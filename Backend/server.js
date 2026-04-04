const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/stops', require('./routes/stops'))
app.use('/api/trips', require('./routes/trips'))
app.use('/api/admin', require('./routes/admin'))

// Socket
require('./socket/busSocket')(io)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'BusMate Backend Running' })
})

// Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected')
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => {
    console.log('DB Connection Error:', err)
  })





