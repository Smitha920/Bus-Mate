import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import socket from '../../services/socket'
import api from '../../services/api'

const collegeToSuburbStops = [
  'College', 'Vontikoppal', 'Dasappa Circle',
  'KRS Hospital', 'Post Office', 'Palace',
  'Harding Circle', 'Suburb'
]

const suburbToCollegeStops = [
  'Suburb', 'Harding Circle', 'Dasappa Circle',
  'Vontikoppal', 'College'
]

export default function StudentDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState('')
  const [isLive, setIsLive] = useState(false)
  const [busLocation, setBusLocation] = useState(null)
  const [driverInfo, setDriverInfo] = useState(null)
  const [activeRoute, setActiveRoute] = useState(null)

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit', hour12: true
        })
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  // Check if bus is already live when page loads
  useEffect(() => {
    api.get('/trips/active')
      .then(res => {
        setIsLive(true)
        setActiveRoute(res.data.route)
        setDriverInfo({
          name: res.data.driverName,
          phone: res.data.driverPhone,
          route: res.data.route,
          checkInTime: new Date(res.data.checkInTime).toLocaleTimeString('en-IN', {
            hour: '2-digit', minute: '2-digit', hour12: true
          }),
        })
        if (res.data.currentLocation?.latitude) {
          setBusLocation(res.data.currentLocation)
        }
      })
      .catch(() => {
        setIsLive(false)
        setDriverInfo(null)
        setBusLocation(null)
      })
  }, [])

  // Connect socket for live updates
  useEffect(() => {
    socket.connect()

    socket.on('bus:live', (data) => {
      setIsLive(true)
      setActiveRoute(data.route)
      setDriverInfo(data)
    })

    socket.on('bus:location', (data) => {
      setBusLocation(data)
      setIsLive(true)
    })

    socket.on('bus:offline', () => {
      setIsLive(false)
      setBusLocation(null)
      setDriverInfo(null)
      setActiveRoute(null)
    })

    return () => {
      socket.off('bus:live')
      socket.off('bus:location')
      socket.off('bus:offline')
      socket.disconnect()
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const currentStops = activeRoute === 'College to Suburb'
    ? collegeToSuburbStops
    : activeRoute === 'Suburb to College'
    ? suburbToCollegeStops
    : []

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e2d45', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Bus<span style={{ color: '#00e5ff' }}>Mate</span>
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>
              Hello, {user?.name || 'Student'} 👋
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '999px', background: isLive ? 'rgba(0,255,135,0.08)' : 'rgba(107,122,153,0.1)', border: `1px solid ${isLive ? 'rgba(0,255,135,0.3)' : '#1e2d45'}` }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isLive ? '#00ff87' : '#6b7a99', animation: isLive ? 'pulse 1.5s infinite' : 'none' }}></div>
              <span style={{ fontSize: '12px', color: isLive ? '#00ff87' : '#6b7a99', fontWeight: 500 }}>
                {isLive ? 'Live' : 'Offline'}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#6b7a99', fontFamily: 'Space Mono, monospace' }}>
              {currentTime}
            </span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ flex: 1, paddingBottom: '90px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>

          {/* MAP */}
          <div style={{ height: '280px', background: 'rgba(17,24,39,0.8)', borderRadius: '16px', border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '48px' }}>🗺️</span>
            <p style={{ color: '#6b7a99', fontSize: '14px', margin: 0 }}>Live Map</p>
            <p style={{ color: '#6b7a99', fontSize: '12px', margin: 0 }}>
              {busLocation
                ? `📍 ${busLocation.placeName || 'Bus is moving'}`
                : 'Waiting for bus to go live'}
            </p>
          </div>

          {/* ROUTE INFO */}
          {activeRoute && (
            <div style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>🗺️</span>
              <div>
                <p style={{ fontSize: '13px', color: '#00e5ff', fontWeight: 600, margin: 0 }}>
                  {activeRoute}
                </p>
                <p style={{ fontSize: '11px', color: '#6b7a99', margin: '2px 0 0 0' }}>
                  {currentStops.join(' → ')}
                </p>
              </div>
            </div>
          )}

          {/* BUS STATUS CARD */}
          <div style={{ marginTop: '12px', padding: '20px', borderRadius: '16px', background: isLive ? 'rgba(0,229,255,0.05)' : 'rgba(17,24,39,0.8)', border: `1px solid ${isLive ? 'rgba(0,229,255,0.25)' : '#1e2d45'}` }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              Bus Status
            </p>

            {isLive && busLocation ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px 0' }}>
                    📍 {busLocation.placeName || 'On Route'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#6b7a99', margin: 0 }}>
                    Speed: {busLocation.speed || 0} km/h
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '32px', fontWeight: 700, color: '#00e5ff', margin: 0, lineHeight: 1 }}>
                    🚌
                  </p>
                  <p style={{ fontSize: '12px', color: '#00ff87', margin: '4px 0 0 0' }}>Moving</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ fontSize: '32px', margin: '0 0 8px 0' }}>🚌</p>
                <p style={{ fontSize: '14px', color: '#6b7a99', margin: 0 }}>
                  {isLive ? 'Bus is live — location loading...' : 'Bus is not online yet'}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7a99', margin: '4px 0 0 0' }}>
                  You will be notified when the driver checks in
                </p>
              </div>
            )}

            {/* Departed info */}
            {driverInfo && (
              <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>
                  {activeRoute === 'College to Suburb' ? '🏫' : '🏙️'}
                </span>
                <div>
                  <p style={{ fontSize: '13px', color: '#fff', fontWeight: 500, margin: 0 }}>
                    Departed from {activeRoute === 'College to Suburb' ? 'College' : 'Suburb'}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>
                    Today at {driverInfo.checkInTime}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* STOPS LIST */}
          {currentStops.length > 0 && (
            <div style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
              <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
                Route Stops
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {currentStops.map((stop, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
                    {index < currentStops.length - 1 && (
                      <div style={{ position: 'absolute', left: '11px', top: '28px', width: '2px', height: '28px', background: '#1e2d45', zIndex: 0 }}></div>
                    )}
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, background: index === 0 ? '#00e5ff' : '#1e2d45', color: index === 0 ? '#0a0e1a' : '#6b7a99' }}>
                      {index + 1}
                    </div>
                    <div style={{ padding: '10px 0', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '14px', color: index === 0 ? '#fff' : '#6b7a99', fontWeight: index === 0 ? 600 : 400, margin: 0 }}>
                        {stop}
                      </p>
                      {index === 0 && (
                        <span style={{ fontSize: '11px', color: '#00e5ff', background: 'rgba(0,229,255,0.1)', padding: '3px 10px', borderRadius: '999px' }}>
                          Start
                        </span>
                      )}
                      {index === currentStops.length - 1 && (
                        <span style={{ fontSize: '11px', color: '#00ff87', background: 'rgba(0,255,135,0.1)', padding: '3px 10px', borderRadius: '999px' }}>
                          End
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DRIVER INFO */}
          {driverInfo && (
            <div style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
              <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
                Driver Info
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {driverInfo.name?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 600, color: '#fff', margin: '0 0 2px 0' }}>
                      {driverInfo.name}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 2px 0' }}>
                      {driverInfo.route}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>
                      On duty since {driverInfo.checkInTime}
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${driverInfo.phone}`}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '10px 16px', borderRadius: '12px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)', textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '20px' }}>📞</span>
                  <span style={{ fontSize: '11px', color: '#00ff87', fontWeight: 500 }}>Call</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #1e2d45', background: 'rgba(10,14,26,0.98)', backdropFilter: 'blur(10px)', zIndex: 50 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px' }}>🏠</span>
            <span style={{ fontSize: '11px', color: '#00e5ff', fontWeight: 500 }}>Home</span>
          </button>
          <button
            onClick={() => navigate('/student/notifications')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '20px' }}>🔔</span>
            <span style={{ fontSize: '11px', color: '#6b7a99' }}>Alerts</span>
          </button>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '20px' }}>🚪</span>
            <span style={{ fontSize: '11px', color: '#6b7a99' }}>Logout</span>
          </button>
        </div>
      </div>

    </div>
  )
}