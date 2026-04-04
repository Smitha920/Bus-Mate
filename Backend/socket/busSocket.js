module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // Driver starts tracking
    socket.on('driver:checkin', (data) => {
      console.log('Driver checked in:', data)
      io.emit('bus:live', {
        driverName: data.driverName,
        driverPhone: data.driverPhone,
        busNumber: data.busNumber,
        route: data.route,
        checkInTime: data.checkInTime,
      })
    })

    // Driver sends location every few seconds
    socket.on('driver:location', (data) => {
      // data = { latitude, longitude, placeName, speed }
      io.emit('bus:location', {
        latitude: data.latitude,
        longitude: data.longitude,
        placeName: data.placeName,
        speed: data.speed,
      })
    })

    // Driver checks out
    socket.on('driver:checkout', () => {
      console.log('Driver checked out')
      io.emit('bus:offline', {
        message: 'Bus has completed the route'
      })
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
}