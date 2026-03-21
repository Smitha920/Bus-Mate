import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const stops = [
  { id: 1, name: 'City', students: 12, eta: 0, status: 'departed' },
  { id: 2, name: 'Varthikopal', students: 9, eta: 5, status: 'upcoming' },
  { id: 3, name: 'Indappa', students: 11, eta: 10, status: 'upcoming' },
  { id: 4, name: 'Post Office', students: 8, eta: 15, status: 'upcoming' },
  { id: 5, name: 'Palace Gate', students: 5, eta: 20, status: 'upcoming' },
  { id: 6, name: 'A Gate', students: 7, eta: 24, status: 'upcoming' },
  { id: 7, name: 'College', students: 0, eta: 30, status: 'upcoming' },
]

const mockDriver = {
  name: 'Ravi Kumar',
  phone: '9876543210',
  busNumber: 'KA 17 F 1234',
  checkInTime: '8:02 AM',
}

const myStopId = 3

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

  const myStop = stops.find((s) => s.id === myStopId)

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e2d45', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Bus<span style={{ color: '#00e5ff' }}>Mate</span>
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>Route A — College Express</p>
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
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '90px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 20px' }}>

          {/* MAP PLACEHOLDER */}
          <div style={{ marginTop: '20px', height: '260px', background: 'rgba(17,24,39,0.8)', borderRadius: '16px', border: '1px solid #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '40px' }}>🗺️</span>
            <p style={{ color: '#6b7a99', fontSize: '14px', margin: 0 }}>Live Map</p>
            <p style={{ color: '#6b7a99', fontSize: '12px', margin: 0 }}>Will be integrated with real GPS</p>
          </div>

          {/* MY STOP ETA CARD */}
          <div style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Your Stop</p>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>
                  📍 {myStop.name}
                </h2>
                <p style={{ fontSize: '13px', color: '#6b7a99', margin: 0 }}>Bus is on the way</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '52px', fontWeight: 700, color: '#00e5ff', margin: 0, lineHeight: 1 }}>
                  {myStop.eta}
                </p>
                <p style={{ fontSize: '12px', color: '#6b7a99', margin: '4px 0 0 0' }}>min away</p>
              </div>
            </div>
            <div style={{ marginTop: '16px', height: '6px', borderRadius: '999px', background: '#1e2d45' }}>
              <div style={{ width: '30%', height: '6px', borderRadius: '999px', background: 'linear-gradient(90deg, #00e5ff, #0ea5e9)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '11px', color: '#6b7a99' }}>City (departed)</span>
              <span style={{ fontSize: '11px', color: '#6b7a99' }}>College</span>
            </div>
          </div>

          {/* DRIVER INFO CARD */}
          <div style={{ marginTop: '16px', padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Driver Info</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                  {mockDriver.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 600, color: '#fff', margin: '0 0 2px 0' }}>{mockDriver.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: '0 0 2px 0' }}>{mockDriver.busNumber}</p>
                  <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>On duty since {mockDriver.checkInTime}</p>
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

          {/* ALL STOPS */}
          <div style={{ marginTop: '24px' }}>
            <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              All Stops — Live ETA
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {stops.map((stop) => (
                <div
                  key={stop.id}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: stop.id === myStopId ? 'rgba(0,229,255,0.06)' : 'rgba(17,24,39,0.8)',
                    border: `1px solid ${stop.id === myStopId ? 'rgba(0,229,255,0.3)' : '#1e2d45'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#fff', margin: 0 }}>{stop.name}</p>
                    {stop.id === myStopId && (
                      <span style={{ fontSize: '11px', color: '#00e5ff', background: 'rgba(0,229,255,0.1)', padding: '2px 6px', borderRadius: '999px' }}>
                        You
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', fontWeight: 700, color: stop.status === 'departed' ? '#00ff87' : '#00e5ff', margin: '4px 0' }}>
                    {stop.status === 'departed' ? 'Done ✓' : `${stop.eta}m`}
                  </p>
                  <p style={{ fontSize: '11px', color: '#6b7a99', margin: 0 }}>
                    {stop.students > 0 ? `${stop.students} waiting` : 'Destination'}
                  </p>
                </div>
              ))}
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

    
  
