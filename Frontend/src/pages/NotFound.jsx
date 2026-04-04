import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>

      <p style={{ fontSize: '80px', margin: '0 0 16px 0' }}>🚌💨</p>

      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '72px', fontWeight: 700, color: '#00e5ff', margin: '0 0 8px 0', lineHeight: 1 }}>
        404
      </h1>

      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 12px 0' }}>
        Looks like you missed the bus!
      </h2>

      <p style={{ fontSize: '14px', color: '#6b7a99', maxWidth: '320px', lineHeight: 1.6, margin: '0 0 32px 0' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        style={{ padding: '14px 32px', borderRadius: '14px', background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)', border: 'none', color: '#0a0e1a', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}
      >
        🏠 Go Back Home
      </button>

    </div>
  )
}