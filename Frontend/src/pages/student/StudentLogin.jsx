import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function StudentLogin() {
  const navigate = useNavigate()
  const { studentLogin } = useAuth()
  const [usn, setUsn] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!usn.trim()) { setError('Please enter your USN'); return }
    if (!password.trim()) { setError('Please enter your password'); return }
    if (usn.length < 10) { setError('Please enter a valid USN'); return }

    setLoading(true)
    try {
      await studentLogin(usn, password)
      navigate('/student/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1526 50%, #0a0e1a 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, #00e5ff, transparent)', opacity: 0.05, transform: 'translate(-50%, -50%)' }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px', background: 'rgba(17,24,39,0.95)', border: '1px solid #1e2d45', borderRadius: '24px', padding: '40px 32px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', background: '#00e5ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px auto', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>
            🚌
          </div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 4px 0' }}>
            Bus<span style={{ color: '#00e5ff' }}>Mate</span>
          </h1>
          <p style={{ fontSize: '10px', color: '#6b7a99', margin: '0 0 12px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Never Miss College Bus Again
          </p>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '999px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.3)' }}>
            <p style={{ fontSize: '12px', color: '#00e5ff', fontWeight: 500, margin: 0 }}>Student Portal</p>
          </div>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* USN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#6b7a99', fontWeight: 500 }}>USN</label>
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value.toUpperCase())}
              placeholder="1VV22CS001"
              maxLength={10}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid #1e2d45', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: 'Space Mono, monospace', letterSpacing: '1px', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#00e5ff'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>Format: 1VV22CS001</p>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#6b7a99', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid #1e2d45', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#00e5ff'}
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

          {/* Forgot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>
              First time?{' '}
              <span style={{ color: '#00e5ff', cursor: 'pointer' }}
                onClick={() => alert('Contact admin: admin@vvce.ac.in')}>
                Get credentials
              </span>
            </p>
            <span style={{ fontSize: '12px', color: '#00e5ff', cursor: 'pointer' }}
              onClick={() => alert('Contact admin: admin@vvce.ac.in')}>
              Forgot password?
            </span>
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,59,92,0.08)', border: '1px solid rgba(255,59,92,0.3)', fontSize: '13px', color: '#ff3b5c' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '16px', borderRadius: '14px', background: loading ? 'rgba(0,229,255,0.4)' : 'linear-gradient(135deg, #00e5ff, #0ea5e9)', border: 'none', color: '#0a0e1a', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: loading ? 'none' : '0 0 30px rgba(0,229,255,0.3)' }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>

        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#1e2d45' }}></div>
          <span style={{ fontSize: '12px', color: '#6b7a99' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#1e2d45' }}></div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7a99', margin: 0 }}>
          Are you a driver?{' '}
          <span style={{ color: '#f97316', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => navigate('/driver/login')}>
            Driver Login →
          </span>
        </p>

      </div>

      <p style={{ position: 'relative', zIndex: 10, fontSize: '12px', color: '#6b7a99', marginTop: '16px' }}>
        Access restricted to VVCE students only
      </p>
      <p style={{ position: 'relative', zIndex: 10, fontSize: '12px', color: '#6b7a99', marginTop: '8px', cursor: 'pointer' }}
        onClick={() => navigate('/')}>
        ← Back to Home
      </p>

    </div>
  )
}