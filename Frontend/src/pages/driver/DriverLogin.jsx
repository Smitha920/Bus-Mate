import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function DriverLogin() {
  const navigate = useNavigate()
  const [driverId, setDriverId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { driverLogin } = useAuth()


  const handleLogin = async (e) => {
  e.preventDefault()
  setError('')

  if (!driverId.trim()) { setError('Please enter your Driver ID'); return }
  if (!password.trim()) { setError('Please enter your password'); return }

  setLoading(true)
  try {
    await driverLogin(driverId, password)
    navigate('/driver/dashboard')
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Try again.')
  } finally {
    setLoading(false)
  }
}

  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   setError('')

  //   if (!driverId.trim()) {
  //     setError('Please enter your Driver ID')
  //     return
  //   }
  //   if (!password.trim()) {
  //     setError('Please enter your password')
  //     return
  //   }

  //   setLoading(true)

  //   // Simulate API call for now
  //   setTimeout(() => {
  //     setLoading(false)
  //     navigate('/driver/dashboard')
  //   }, 1500)
  // }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #130e0a 50%, #0a0e1a 100%)'
      }}
    >

      {/* Background glow — orange for driver */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #f97316, transparent)',
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 md:p-10 border border-[#2d1e0a]"
        style={{ background: 'rgba(17, 24, 39, 0.95)' }}
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: '0 0 30px rgba(249, 115, 22, 0.3)'
            }}
          >
            <span className="text-2xl">🚌</span>
          </div>
          <h1 className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            Bus<span className="text-orange-400">Mate</span>
          </h1>
          <p className="text-[10px] text-[#6b7a99] mt-1 uppercase tracking-widest">
            Never Miss College Bus Again
          </p>
          <div
            className="mt-4 px-4 py-1.5 rounded-full border"
            style={{
              background: 'rgba(249, 115, 22, 0.08)',
              borderColor: 'rgba(249, 115, 22, 0.3)'
            }}
          >
            <p className="text-xs text-orange-400 font-medium">Driver Portal</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* Driver ID Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6b7a99] font-medium">
              Driver ID
            </label>
            <input
              type="text"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value.toUpperCase())}
              placeholder="DRV001"
              className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border border-[#2d1e0a]"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '1px',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#2d1e0a'}
            />
            <p className="text-xs text-[#6b7a99]">
              Format: DRV001 — provided by admin
            </p>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6b7a99] font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border border-[#2d1e0a] pr-12"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#f97316'}
                onBlur={e => e.target.style.borderColor = '#2d1e0a'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7a99] hover:text-white text-lg"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <span
              className="text-xs text-orange-400 cursor-pointer hover:underline"
              onClick={() => alert('Contact admin: admin@vvce.ac.in')}
            >
              Forgot password?
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="px-4 py-3 rounded-xl border text-sm text-red-400"
              style={{
                background: 'rgba(255, 59, 92, 0.08)',
                borderColor: 'rgba(255, 59, 92, 0.3)'
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white text-base mt-2 cursor-pointer border-none"
            style={{
              background: loading
                ? 'rgba(249, 115, 22, 0.4)'
                : 'linear-gradient(135deg, #f97316, #ea580c)',
              boxShadow: loading
                ? 'none'
                : '0 0 30px rgba(249, 115, 22, 0.3)',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Logging in...' : 'Check In →'}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#2d1e0a]"></div>
          <span className="text-xs text-[#6b7a99]">or</span>
          <div className="flex-1 h-px bg-[#2d1e0a]"></div>
        </div>

        {/* Student link */}
        <p className="text-center text-sm text-[#6b7a99]">
          Are you a student?{' '}
          <span
            className="text-cyan-400 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Student Login →
          </span>
        </p>

        {/* Info card */}
        <div
          className="mt-6 p-4 rounded-2xl border"
          style={{
            background: 'rgba(249, 115, 22, 0.05)',
            borderColor: 'rgba(249, 115, 22, 0.2)'
          }}
        >
          <p className="text-xs text-[#6b7a99] leading-relaxed text-center">
            🔒 Your check-in and check-out times are
            recorded automatically for duty tracking.
          </p>
        </div>

      </div>

      {/* Note */}
      <p className="relative z-10 text-xs text-[#6b7a99] mt-6 text-center">
        Access restricted to VVCE registered drivers only
      </p>

      

      {/* Back to home */}
      <p
        className="relative z-10 text-xs text-[#6b7a99] mt-3 cursor-pointer hover:text-white"
        onClick={() => navigate('/')}
        style={{ transition: 'color 0.2s' }}
      >
        ← Back to Home
      </p>

    </div>
  )
}