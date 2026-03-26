import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const stops = [
  { id: 1, name: 'College',     status: 'done' },
  { id: 2, name: 'A Gate',      status: 'done' },
  { id: 3, name: 'Palace Gate', status: 'current' },
  { id: 4, name: 'Post Office', status: 'upcoming' },
  { id: 5, name: 'Indappa',     status: 'upcoming' },
  { id: 6, name: 'Varthikopal', status: 'upcoming' },
  { id: 7, name: 'City',        status: 'upcoming' },
]

const driverInfo = {
  name: 'Ravi Kumar',
  id: 'DRV001',
  busNumber: 'KA 17 F 1234',
  route: 'Route A',
}

export default function DriverDashboard() {
  const navigate = useNavigate()
  const [isTracking, setIsTracking] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)
  const [checkOutTime, setCheckOutTime] = useState(null)
  const [currentTime, setCurrentTime] = useState('')
  const [speed] = useState(32)
  const [studentsWaiting] = useState(31)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCheckIn = () => {
    const now = new Date()
    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    setCheckInTime(time)
    setIsTracking(true)
  }

  const handleCheckOut = () => {
    setShowConfirm(true)
  }

  const confirmCheckOut = () => {
    const now = new Date()
    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    setCheckOutTime(time)
    setIsTracking(false)
    setShowConfirm(false)
  }

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe', display: 'flex', flexDirection: 'column' }}>

      {/* CONFIRM CHECKOUT POPUP */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#111827', border: '1px solid #1e2d45', borderRadius: '20px', padding: '32px', maxWidth: '360px', width: '100%', textAlign: 'center' }}>
            <p style={{ fontSize: '40px', marginBottom: '16px' }}>🚌</p>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px 0' }}>
              End Route?
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7a99', margin: '0 0 24px 0', lineHeight: 1.6 }}>
              Your check-out time will be recorded and students will be notified that the bus is offline.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'transparent', border: '1px solid #1e2d45', color: '#6b7a99', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmCheckOut}
                style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e2d45', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Bus<span style={{ color: '#f97316' }}>Mate</span>
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>
              Driver Portal
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isTracking && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '999px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff87', animation: 'pulse 1.5s infinite' }}></div>
                <span style={{ fontSize: '12px', color: '#00ff87', fontWeight: 500 }}>Live</span>
              </div>
            )}
            <span style={{ fontSize: '12px', color: '#6b7a99', fontFamily: 'Space Mono, monospace' }}>
              {currentTime}
            </span>
            <button
              onClick={() => navigate('/')}
              style={{ background: 'rgba(255,59,92,0.1)', border: '1px solid rgba(255,59,92,0.3)', borderRadius: '8px', padding: '6px 12px', color: '#ff3b5c', fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ flex: 1, paddingBottom: '40px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>

          {/* GREETING */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>
              Good Morning, {driverInfo.name} 👋
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7a99', margin: 0 }}>{today}</p>
          </div>

          {/* GPS TOGGLE CARD */}
          <div style={{ padding: '24px', borderRadius: '20px', border: '1px solid', background: isTracking ? 'rgba(0,255,135,0.05)' : 'rgba(17,24,39,0.8)', borderColor: isTracking ? 'rgba(0,255,135,0.3)' : '#1e2d45', marginBottom: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              GPS Tracking
            </p>

            {/* Big status icon */}
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>
              {isTracking ? '📡' : '📴'}
            </div>

            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: isTracking ? '#00ff87' : '#6b7a99', margin: '0 0 4px 0' }}>
              {isTracking ? 'Broadcasting Live' : 'Tracking Off'}
            </p>
            <p style={{ fontSize: '13px', color: '#6b7a99', margin: '0 0 20px 0' }}>
              {isTracking
                ? `Started at ${checkInTime} · Students can see your location`
                : 'Tap Check In to start your route'}
            </p>

            {/* Check in / Check out button */}
            {!isTracking ? (
              <button
                onClick={handleCheckIn}
                style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', color: '#fff', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 0 30px rgba(249,115,22,0.3)' }}
              >
                🚌 Check In — Start Route
              </button>
            ) : (
              <button
                onClick={handleCheckOut}
                style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'rgba(255,59,92,0.1)', border: '1px solid rgba(255,59,92,0.4)', color: '#ff3b5c', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                🏁 Check Out — End Route
              </button>
            )}
          </div>

          {/* METRICS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
              <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Speed</p>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '32px', fontWeight: 700, color: isTracking ? '#00e5ff' : '#6b7a99', margin: 0 }}>
                {isTracking ? speed : 0}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7a99', margin: '4px 0 0 0' }}>km/h</p>
            </div>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
              <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Waiting</p>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '32px', fontWeight: 700, color: '#f97316', margin: 0 }}>
                {studentsWaiting}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7a99', margin: '4px 0 0 0' }}>students</p>
            </div>
          </div>

          {/* CHECK IN / OUT TIMES */}
          <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45', marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              Today's Duty
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 4px 0' }}>Check In</p>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '18px', fontWeight: 700, color: checkInTime ? '#00ff87' : '#6b7a99', margin: 0 }}>
                  {checkInTime || '--:--'}
                </p>
              </div>
              <div style={{ width: '1px', background: '#1e2d45' }}></div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 4px 0' }}>Check Out</p>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '18px', fontWeight: 700, color: checkOutTime ? '#ff3b5c' : '#6b7a99', margin: 0 }}>
                  {checkOutTime || '--:--'}
                </p>
              </div>
            </div>
          </div>

          {/* ROUTE PROGRESS */}
          <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
              Route Progress
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {stops.map((stop, index) => (
                <div key={stop.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>

                  {/* Vertical line */}
                  {index < stops.length - 1 && (
                    <div style={{ position: 'absolute', left: '11px', top: '28px', width: '2px', height: '32px', background: stop.status === 'done' ? '#00ff87' : '#1e2d45', zIndex: 0 }}></div>
                  )}

                  {/* Dot */}
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, background: stop.status === 'done' ? '#00ff87' : stop.status === 'current' ? '#f97316' : '#1e2d45', color: stop.status === 'done' ? '#0a0e1a' : stop.status === 'current' ? '#fff' : '#6b7a99', boxShadow: stop.status === 'current' ? '0 0 12px rgba(249,115,22,0.6)' : 'none' }}>
                    {stop.status === 'done' ? '✓' : stop.status === 'current' ? '●' : ''}
                  </div>

                  {/* Stop name */}
                  <div style={{ padding: '12px 0', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '14px', fontWeight: stop.status === 'current' ? 600 : 400, color: stop.status === 'done' ? '#6b7a99' : stop.status === 'current' ? '#fff' : '#6b7a99', margin: 0 }}>
                      {stop.name}
                    </p>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontFamily: 'Space Mono, monospace', background: stop.status === 'done' ? 'rgba(0,255,135,0.1)' : stop.status === 'current' ? 'rgba(249,115,22,0.1)' : 'rgba(30,45,69,0.5)', color: stop.status === 'done' ? '#00ff87' : stop.status === 'current' ? '#f97316' : '#6b7a99' }}>
                      {stop.status === 'done' ? 'Done' : stop.status === 'current' ? 'Here' : 'Upcoming'}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

