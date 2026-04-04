import { useNavigate } from 'react-router-dom'

const stats = [
  { label: 'Total Students', value: '500', icon: '🎓', color: '#00e5ff' },
  { label: 'Total Drivers', value: '8', icon: '🚌', color: '#f97316' },
  { label: 'Active Routes', value: '3', icon: '🗺️', color: '#a855f7' },
  { label: 'Buses Live', value: '1', icon: '📡', color: '#00ff87' },
]

const recentDrivers = [
  { name: 'Ravi Kumar', id: 'DRV001', route: 'Route A', checkIn: '8:02 AM', checkOut: '10:30 AM', status: 'completed' },
  { name: 'Suresh M', id: 'DRV002', route: 'Route B', checkIn: '8:15 AM', checkOut: '--', status: 'active' },
  { name: 'Kumar S', id: 'DRV003', route: 'Route C', checkIn: '7:55 AM', checkOut: '10:10 AM', status: 'completed' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e2d45', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Bus<span style={{ color: '#a855f7' }}>Mate</span>
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>Admin Panel</p>
          </div>
          <button
            onClick={() => navigate('/admin/login')}
            style={{ background: 'rgba(255,59,92,0.1)', border: '1px solid rgba(255,59,92,0.3)', borderRadius: '8px', padding: '6px 12px', color: '#ff3b5c', fontSize: '12px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 20px' }}>

        {/* GREETING */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>
            Welcome, Admin 👋
          </h2>
          <p style={{ fontSize: '13px', color: '#6b7a99', margin: 0 }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* STATS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>{stat.label}</p>
                <span style={{ fontSize: '20px' }}>{stat.icon}</span>
              </div>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '32px', fontWeight: 700, color: stat.color, margin: 0 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/admin/add-student')}
            style={{ padding: '16px', borderRadius: '16px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', color: '#00e5ff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '20px' }}>🎓</span>
            Add Student
          </button>
          <button
            onClick={() => navigate('/admin/add-driver')}
            style={{ padding: '16px', borderRadius: '16px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', color: '#f97316', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '20px' }}>🚌</span>
            Add Driver
          </button>
        </div>

        {/* DRIVER ACTIVITY */}
        <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45', marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            Today's Driver Activity
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentDrivers.map((driver) => (
              <div key={driver.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', borderRadius: '12px', background: 'rgba(10,14,26,0.6)', border: '1px solid #1e2d45' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 2px 0' }}>{driver.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>{driver.route} · {driver.id}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: driver.status === 'active' ? 'rgba(0,255,135,0.1)' : 'rgba(107,122,153,0.1)', border: `1px solid ${driver.status === 'active' ? 'rgba(0,255,135,0.3)' : '#1e2d45'}`, marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: driver.status === 'active' ? '#00ff87' : '#6b7a99', fontWeight: 500 }}>
                      {driver.status === 'active' ? '● Live' : 'Completed'}
                    </span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#6b7a99', margin: 0, fontFamily: 'Space Mono, monospace' }}>
                    {driver.checkIn} → {driver.checkOut}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(17,24,39,0.8)', border: '1px solid #1e2d45' }}>
          <p style={{ fontSize: '11px', color: '#6b7a99', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            Manage
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'View All Students', icon: '🎓', color: '#00e5ff' },
              { label: 'View All Drivers', icon: '🚌', color: '#f97316' },
              { label: 'Duty History', icon: '📋', color: '#a855f7' },
              { label: 'Manage Routes', icon: '🗺️', color: '#00ff87' },
            ].map((item) => (
              <button
                key={item.label}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(10,14,26,0.6)', border: '1px solid #1e2d45', color: '#e8f0fe', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                <span style={{ color: item.color, fontSize: '16px' }}>→</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}