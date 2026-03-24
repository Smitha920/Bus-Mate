import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const mockDriver = {
  name: 'Ravi Kumar',
  phone: '9876543210',
  busNumber: 'KA 17 F 1234',
  checkInTime: '8:02 AM',
  currentLocation: 'Near Post Office',
  nextStop: 'Palace Gate',
  eta: 8,
}

export default function StudentDashboard() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState('')

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
              Never Miss College Bus Again
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '999px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff87', animation: 'pulse 1.5s infinite' }}></div>
              <span style={{ fontSize: '12px', color: '#00ff87', fontWeight: 500 }}>Live</span>
            </div>
            <span style={{ fontSize: '12px', color: '#6b7a99', fontFamily: 'Space Mono, monospace' }}>{currentTime}</span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ flex: 1, paddingBottom: '90px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>

          {/* MAP */}
          <div style={{ height: '320px', background: 'rgba(17,24,39,0.8)', borderRadius: '16px', border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '48px' }}>🗺️</span>
            <p style={{ color: '#6b7a99', fontSize: '14px', margin: 0 }}>Live Map</p>
            <p style={{ color: '#6b7a99', fontSize: '12px', margin: 0 }}>Real GPS coming soon</p>
          </div>

          {/* BUS LOCATION CARD */}
          <div style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.25)' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              Bus Location
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: 'Poppins, sans-serif', margin: '0 0 4px 0' }}>
                  📍 {mockDriver.currentLocation}
                </p>
                <p style={{ fontSize: '13px', color: '#6b7a99', margin: 0 }}>
                  Next stop → <span style={{ color: '#00e5ff' }}>{mockDriver.nextStop}</span>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '48px', fontWeight: 700, color: '#00e5ff', margin: 0, lineHeight: 1 }}>
                  {mockDriver.eta}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7a99', margin: '4px 0 0 0' }}>min away</p>
              </div>
            </div>

            {/* Departed time */}
            <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>🏫</span>
              <div>
                <p style={{ fontSize: '13px', color: '#fff', fontWeight: 500, margin: 0 }}>
                  Departed from College
                </p>
                <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>
                  Today at {mockDriver.checkInTime}
                </p>
              </div>
            </div>
          </div>

          {/* DRIVER INFO CARD */}
          <div style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              Driver Info
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {mockDriver.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 600, color: '#fff', margin: '0 0 2px 0' }}>
                    {mockDriver.name}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 2px 0' }}>
                    {mockDriver.busNumber}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>
                    On duty since {mockDriver.checkInTime}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${mockDriver.phone}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '10px 16px', borderRadius: '12px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.25)', textDecoration: 'none' }}
              >
                <span style={{ fontSize: '20px' }}>📞</span>
                <span style={{ fontSize: '11px', color: '#00ff87', fontWeight: 500 }}>Call</span>
              </a>
            </div>
          </div>

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
            onClick={() => navigate('/')}
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