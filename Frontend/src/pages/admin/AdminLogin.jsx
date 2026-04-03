import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim()) {
      setError('Please enter your username')
      return
    }
    if (!password.trim()) {
      setError('Please enter your password')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/admin/dashboard')
    }, 1500)
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d0a1a 50%, #0a0e1a 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >

      {/* Background glow — purple for admin */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, #a855f7, transparent)', opacity: 0.05, transform: 'translate(-50%, -50%)' }}></div>
      </div>

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px', background: 'rgba(17,24,39,0.95)', border: '1px solid #1e2d45', borderRadius: '24px', padding: '40px 32px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #a855f7, #7c3aed)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px auto', boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}>
            🛡️
          </div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>
            Bus<span style={{ color: '#a855f7' }}>Mate</span>
          </h1>
          <p style={{ fontSize: '10px', color: '#6b7a99', margin: '0 0 12px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Never Miss College Bus Again
          </p>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '999px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.3)' }}>
            <p style={{ fontSize: '12px', color: '#a855f7', fontWeight: 500, margin: 0 }}>Admin Portal</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#6b7a99', fontWeight: 500 }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid #1e2d45', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#a855f7'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#6b7a99', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid #1e2d45', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#a855f7'}
                onBlur={e => e.target.style.borderColor = '#1e2d45'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,59,92,0.08)', border: '1px solid rgba(255,59,92,0.3)', fontSize: '13px', color: '#ff3b5c' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '16px', borderRadius: '14px', background: loading ? 'rgba(168,85,247,0.4)' : 'linear-gradient(135deg, #a855f7, #7c3aed)', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: loading ? 'none' : '0 0 30px rgba(168,85,247,0.3)', marginTop: '4px' }}
          >
            {loading ? 'Logging in...' : 'Login as Admin →'}
          </button>

        </form>

        {/* Info */}
        <div style={{ marginTop: '24px', padding: '14px 16px', borderRadius: '14px', background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.15)' }}>
          <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
            🔒 This portal is restricted to college administrators only
          </p>
        </div>

      </div>

      {/* Back to home */}
      <p
        onClick={() => navigate('/')}
        style={{ position: 'relative', zIndex: 10, fontSize: '12px', color: '#6b7a99', marginTop: '20px', cursor: 'pointer' }}
      >
        ← Back to Home
      </p>

    </div>
  )
}