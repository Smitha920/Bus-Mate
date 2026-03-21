import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function StudentLogin() {
  const navigate = useNavigate()
  const [usn, setUsn] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!usn.trim()) {
      setError('Please enter your USN')
      return
    }
    if (!password.trim()) {
      setError('Please enter your password')
      return
    }
    if (usn.length < 10) {
      setError('Please enter a valid USN')
      return
    }

    setLoading(true)

    // Simulate API call for now
    setTimeout(() => {
      setLoading(false)
      navigate('/student/dashboard')
    }, 1500)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1526 50%, #0a0e1a 100%)'
      }}
    >

      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #00e5ff, transparent)',
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 md:p-10 border border-[#1e2d45]"
        style={{ background: 'rgba(17, 24, 39, 0.95)' }}
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-cyan-400 rounded-2xl flex items-center justify-center mb-4"
            style={{ boxShadow: '0 0 30px rgba(0, 229, 255, 0.3)' }}>
            <span className="text-2xl">🚌</span>
          </div>
          <h1 className="text-2xl font-bold text-white"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            Bus<span className="text-cyan-400">Mate</span>
          </h1>
          <p className="text-[10px] text-[#6b7a99] mt-1 uppercase tracking-widest">
            Never Miss College Bus Again
          </p>
          <div className="mt-4 px-4 py-1.5 rounded-full border border-[#1e2d45]"
            style={{ background: 'rgba(0, 229, 255, 0.05)' }}>
            <p className="text-xs text-cyan-400 font-medium">Student Portal</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* USN Field */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6b7a99] font-medium">
              USN
            </label>
            <input
              type="text"
              value={usn}
              onChange={(e) => setUsn(e.target.value.toUpperCase())}
              placeholder="1VV22CS001"
              maxLength={10}
              className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border border-[#1e2d45] focus:border-cyan-400"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                fontFamily: 'Space Mono, monospace',
                letterSpacing: '1px',
                transition: 'border-color 0.2s'
              }}
            />
            <p className="text-xs text-[#6b7a99]">
              Format: 1VV22CS001
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
                className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none border border-[#1e2d45] focus:border-cyan-400 pr-12"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  transition: 'border-color 0.2s'
                }}
              />
              {/* Show/Hide password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7a99] hover:text-white text-lg"
                style={{ transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* First time login link */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#6b7a99]">
              First time?{' '}
              <span
                className="text-cyan-400 cursor-pointer hover:underline"
                onClick={() => alert('Contact your college admin to get your login credentials.')}
              >
                Get credentials
              </span>
            </p>
            <span
              className="text-xs text-cyan-400 cursor-pointer hover:underline"
              onClick={() => alert('Contact admin: admin@vvce.ac.in')}
            >
              Forgot password?
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="px-4 py-3 rounded-xl border text-sm text-red-400"
              style={{
                background: 'rgba(255, 59, 92, 0.08)',
                borderColor: 'rgba(255, 59, 92, 0.3)'
              }}>
              ⚠️ {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-[#0a0e1a] text-base mt-2 cursor-pointer border-none"
            style={{
              background: loading
                ? 'rgba(0, 229, 255, 0.4)'
                : 'linear-gradient(135deg, #00e5ff, #0ea5e9)',
              boxShadow: loading ? 'none' : '0 0 30px rgba(0, 229, 255, 0.3)',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#1e2d45]"></div>
          <span className="text-xs text-[#6b7a99]">or</span>
          <div className="flex-1 h-px bg-[#1e2d45]"></div>
        </div>

        {/* Driver link */}
        <p className="text-center text-sm text-[#6b7a99]">
          Are you a driver?{' '}
          <span
            className="text-orange-400 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/driver/login')}
          >
            Driver Login →
          </span>
        </p>

      </div>

      {/* College note */}
      <p className="relative z-10 text-xs text-[#6b7a99] mt-6 text-center">
        Access restricted to VVCE students only
      </p>

      {/* Back to home */}
      <p
        className="relative z-10 text-xs text-[#6b7a99] mt-3 cursor-pointer hover:text-white"
        onClick={() => navigate('/')}
        style={{ transition: 'color 0.2s' }}
      >
        ← Back to Home
      </p>
      <button
  type="button"
  onClick={() => navigate('/student/dashboard')}
  className="w-full py-3 rounded-xl text-sm text-[#6b7a99] border border-[#1e2d45] cursor-pointer mt-2"
  style={{ background: 'transparent' }}
>
  Preview Dashboard →
</button>

    </div>
  )
}