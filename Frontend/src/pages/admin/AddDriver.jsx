import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const routes = ['College to Suburb', 'Suburb to College']

export default function AddDriver() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', driverId: '', password: '', phone: '',
    address: '', dob: '', licenseNumber: '', experience: '', assignedRoute: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.driverId || !form.password || !form.phone || !form.licenseNumber || !form.assignedRoute) {
      setError('Please fill all required fields')
      return
    }
    if (form.phone.length !== 10) {
      setError('Please enter a valid 10 digit phone number')
      return
    }

    setLoading(true)
    try {
      await api.post('/admin/add-driver', {
        name: form.name,
        driverId: form.driverId.toUpperCase(),
        password: form.password,
        phone: form.phone,
        address: form.address,
        dob: form.dob,
        licenseNumber: form.licenseNumber.toUpperCase(),
        experience: Number(form.experience),
        assignedRoute: form.assignedRoute,
      })
      setSuccess(true)
      setForm({ name: '', driverId: '', password: '', phone: '', address: '', dob: '', licenseNumber: '', experience: '', assignedRoute: '' })
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add driver. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid #1e2d45',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontSize: '13px',
    color: '#6b7a99',
    fontWeight: 500,
    marginBottom: '8px',
    display: 'block',
  }

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#e8f0fe' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #1e2d45', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/admin/dashboard')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#e8f0fe', padding: 0 }}
          >
            ←
          </button>
          <div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Add Driver
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>Register a new driver</p>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 20px' }}>

        {/* SUCCESS */}
        {success && (
          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)', marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', margin: '0 0 8px 0' }}>✅</p>
            <p style={{ color: '#00ff87', fontWeight: 600, margin: 0 }}>Driver added successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Name */}
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter driver full name"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* Driver ID */}
          <div>
            <label style={labelStyle}>Driver ID *</label>
            <input
              type="text"
              value={form.driverId}
              onChange={(e) => handleChange('driverId', e.target.value.toUpperCase())}
              placeholder="DRV004"
              style={{ ...inputStyle, fontFamily: 'Space Mono, monospace', letterSpacing: '1px' }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '6px 0 0 0' }}>
              Format: DRV004 — this will be their login ID
            </p>
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password *</label>
            <input
              type="text"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Set a password for this driver"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '6px 0 0 0' }}>
              Share this password with the driver
            </p>
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>Phone Number *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* Address */}
          <div>
            <label style={labelStyle}>Address</label>
            <textarea
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter driver address"
              rows={3}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* DOB */}
          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* License */}
          <div>
            <label style={labelStyle}>Driving License Number *</label>
            <input
              type="text"
              value={form.licenseNumber}
              onChange={(e) => handleChange('licenseNumber', e.target.value.toUpperCase())}
              placeholder="KA0120190012345"
              style={{ ...inputStyle, fontFamily: 'Space Mono, monospace', letterSpacing: '1px' }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* Experience */}
          <div>
            <label style={labelStyle}>Years of Experience</label>
            <input
              type="number"
              value={form.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              placeholder="5"
              min={0}
              max={40}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* Route */}
          <div>
            <label style={labelStyle}>Assign Route *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {routes.map((route) => (
                <button
                  key={route}
                  type="button"
                  onClick={() => handleChange('assignedRoute', route)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'left',
                    background: form.assignedRoute === route ? 'rgba(249,115,22,0.08)' : 'rgba(255,255,255,0.04)',
                    borderColor: form.assignedRoute === route ? '#f97316' : '#1e2d45',
                    color: form.assignedRoute === route ? '#f97316' : '#e8f0fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>🗺️ {route}</span>
                  {form.assignedRoute === route && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,59,92,0.08)', border: '1px solid rgba(255,59,92,0.3)', fontSize: '13px', color: '#ff3b5c' }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: loading ? 'rgba(249,115,22,0.4)' : 'linear-gradient(135deg, #f97316, #ea580c)',
              border: 'none',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              marginTop: '8px',
              boxShadow: loading ? 'none' : '0 0 30px rgba(249,115,22,0.3)',
            }}
          >
            {loading ? 'Adding Driver...' : 'Add Driver →'}
          </button>

        </form>
      </div>
    </div>
  )
}