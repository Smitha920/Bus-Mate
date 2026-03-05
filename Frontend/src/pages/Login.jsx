import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (role === 'student') navigate('/student/dashboard')
    else navigate('/driver/routes')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Bus<span className="text-cyan-400">Mate</span></h1>
          <p className="text-gray-400 mt-2 text-sm">College Bus Tracking System</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

          {/* Role Tabs */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-8">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                role === 'student'
                  ? 'bg-cyan-400 text-gray-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('driver')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                role === 'driver'
                  ? 'bg-cyan-400 text-gray-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Driver
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'student' ? 'student@college.edu' : 'driver@college.edu'}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-cyan-400" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-400 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-semibold py-3 rounded-xl transition-colors"
            >
              {role === 'student' ? 'Login as Student' : 'Login as Driver'}
            </button>

          </form>

        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Access is provided by your college admin
        </p>

      </div>
    </div>
  )
}