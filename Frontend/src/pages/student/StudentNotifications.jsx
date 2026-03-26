import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const allNotifications = [
  {
    id: 1,
    type: 'departure',
    icon: '🚌',
    title: 'Bus has departed from College',
    desc: 'Bus #KA 17 F 1234 started Route A',
    time: 'Today, 8:02 AM',
    color: '#00ff87',
    bg: 'rgba(0,255,135,0.06)',
    border: 'rgba(0,255,135,0.2)',
  },
  {
    id: 2,
    type: 'nearby',
    icon: '⏱️',
    title: 'Bus is 2 stops away',
    desc: 'Get ready at your stop — Indappa',
    time: 'Today, 8:18 AM',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.06)',
    border: 'rgba(249,115,22,0.2)',
  },
  {
    id: 3,
    type: 'arrival',
    icon: '📍',
    title: 'Bus arriving at your stop',
    desc: 'Bus is now at Indappa — board now!',
    time: 'Today, 8:22 AM',
    color: '#00e5ff',
    bg: 'rgba(0,229,255,0.06)',
    border: 'rgba(0,229,255,0.2)',
  },
  {
    id: 4,
    type: 'departure',
    icon: '🚌',
    title: 'Bus has departed from College',
    desc: 'Bus #KA 17 F 1234 started Route A',
    time: 'Yesterday, 8:05 AM',
    color: '#00ff87',
    bg: 'rgba(0,255,135,0.06)',
    border: 'rgba(0,255,135,0.2)',
  },
  {
    id: 5,
    type: 'nearby',
    icon: '⏱️',
    title: 'Bus is 2 stops away',
    desc: 'Get ready at your stop — Indappa',
    time: 'Yesterday, 8:20 AM',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.06)',
    border: 'rgba(249,115,22,0.2)',
  },
  {
    id: 6,
    type: 'arrival',
    icon: '📍',
    title: 'Bus arriving at your stop',
    desc: 'Bus is now at Indappa — board now!',
    time: 'Yesterday, 8:24 AM',
    color: '#00e5ff',
    bg: 'rgba(0,229,255,0.06)',
    border: 'rgba(0,229,255,0.2)',
  },
]

const filters = [
  { label: 'All', value: 'all' },
  { label: '🚌 Departures', value: 'departure' },
  { label: '⏱️ Nearby', value: 'nearby' },
  { label: '📍 Arrivals', value: 'arrival' },
]

export default function StudentNotifications() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? allNotifications
    : allNotifications.filter((n) => n.type === activeFilter)

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe', display: 'flex', flexDirection: 'column' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e2d45', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/student/dashboard')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: 0, color: '#e8f0fe' }}
          >
            ←
          </button>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Notifications
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>
              {allNotifications.length} alerts total
            </p>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ flex: 1, paddingBottom: '90px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>

          {/* FILTER BAR */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                  background: activeFilter === f.value ? 'rgba(0,229,255,0.1)' : 'transparent',
                  borderColor: activeFilter === f.value ? '#00e5ff' : '#1e2d45',
                  color: activeFilter === f.value ? '#00e5ff' : '#6b7a99',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* NOTIFICATIONS LIST */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔕</p>
              <p style={{ color: '#6b7a99', fontSize: '15px' }}>No notifications yet</p>
              <p style={{ color: '#6b7a99', fontSize: '13px', marginTop: '8px' }}>
                You'll be notified when the bus is near your stop
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((notif) => (
                <div
                  key={notif.id}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: notif.bg,
                    border: `1px solid ${notif.border}`,
                    borderLeft: `3px solid ${notif.color}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}
                >
                  {/* Icon */}
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: notif.bg, border: `1px solid ${notif.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {notif.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 4px 0' }}>
                      {notif.title}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7a99', margin: '0 0 6px 0' }}>
                      {notif.desc}
                    </p>
                    <p style={{ fontSize: '11px', color: notif.color, margin: 0, fontFamily: 'Space Mono, monospace' }}>
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid #1e2d45', background: 'rgba(10,14,26,0.98)', backdropFilter: 'blur(10px)', zIndex: 50 }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <button
            onClick={() => navigate('/student/dashboard')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '20px' }}>🏠</span>
            <span style={{ fontSize: '11px', color: '#6b7a99' }}>Home</span>
          </button>
          <button
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '20px' }}>🔔</span>
            <span style={{ fontSize: '11px', color: '#00e5ff', fontWeight: 500 }}>Alerts</span>
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
