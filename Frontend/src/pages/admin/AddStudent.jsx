import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function AddStudent() {
  const navigate = useNavigate()
  const [stops, setStops] = useState([])
  const [form, setForm] = useState({
    name: '', usn: '', password: '', phone: '', year: '', assignedStop: ''
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch stops from backend
  useEffect(() => {
    api.get('/stops')
      .then(res => {
        // Only college to suburb stops
        const filtered = res.data.filter(s => s.route === 'College to Suburb')
        setStops(filtered)
      })
      .catch(() => {
        // fallback stops if API fails
        setStops([
          { _id: '1', name: 'College' },
          { _id: '2', name: 'Vontikoppal' },
          { _id: '3', name: 'Dasappa Circle' },
          { _id: '4', name: 'KRS Hospital' },
          { _id: '5', name: 'Post Office' },
          { _id: '6', name: 'Palace' },
          { _id: '7', name: 'Harding Circle' },
          { _id: '8', name: 'Suburb' },
        ])
      })
  }, [])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.usn || !form.password || !form.phone || !form.year || !form.assignedStop) {
      setError('Please fill all required fields')
      return
    }
    if (form.usn.length < 10) {
      setError('Please enter a valid USN — 10 characters')
      return
    }
    if (form.phone.length !== 10) {
      setError('Please enter a valid 10 digit phone number')
      return
    }

    setLoading(true)
    try {
      await api.post('/admin/add-student', {
        name: form.name,
        usn: form.usn.toUpperCase(),
        password: form.password,
        phone: form.phone,
        year: form.year,
        assignedStop: form.assignedStop,
      })
      setSuccess(true)
      setForm({ name: '', usn: '', password: '', phone: '', year: '', assignedStop: '' })
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student. Try again.')
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
              Add Student
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '2px 0 0 0' }}>Register a new student</p>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '24px 20px' }}>

        {/* SUCCESS */}
        {success && (
          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)', marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', margin: '0 0 8px 0' }}>✅</p>
            <p style={{ color: '#00ff87', fontWeight: 600, margin: 0 }}>Student added successfully!</p>
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
              placeholder="Enter student full name"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#00e5ff'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* USN */}
          <div>
            <label style={labelStyle}>USN *</label>
            <input
              type="text"
              value={form.usn}
              onChange={(e) => handleChange('usn', e.target.value.toUpperCase())}
              placeholder="1VV22CS001"
              maxLength={10}
              style={{ ...inputStyle, fontFamily: 'Space Mono, monospace', letterSpacing: '1px' }}
              onFocus={e => e.target.style.borderColor = '#00e5ff'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '6px 0 0 0' }}>
              Format: 1VV22CS001 — this will be their login ID
            </p>
          </div>

          {/* Password */}
          <div>
            <label style={labelStyle}>Password *</label>
            <input
              type="text"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Set a password for this student"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#00e5ff'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '6px 0 0 0' }}>
              Share this password with the student
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
              onFocus={e => e.target.style.borderColor = '#00e5ff'}
              onBlur={e => e.target.style.borderColor = '#1e2d45'}
            />
          </div>

          {/* Year */}
          <div>
            <label style={labelStyle}>Current Year *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleChange('year', y)}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    border: '1px solid',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    background: form.year === y ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.04)',
                    borderColor: form.year === y ? '#00e5ff' : '#1e2d45',
                    color: form.year === y ? '#00e5ff' : '#6b7a99',
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Assigned Stop */}
          <div>
            <label style={labelStyle}>Assigned Stop *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {stops.map((stop) => (
                <button
                  key={stop._id}
                  type="button"
                  onClick={() => handleChange('assignedStop', stop._id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'left',
                    background: form.assignedStop === stop._id ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.04)',
                    borderColor: form.assignedStop === stop._id ? '#00e5ff' : '#1e2d45',
                    color: form.assignedStop === stop._id ? '#00e5ff' : '#e8f0fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>📍 {stop.name}</span>
                  {form.assignedStop === stop._id && <span>✓</span>}
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
              background: loading ? 'rgba(0,229,255,0.4)' : 'linear-gradient(135deg, #00e5ff, #0ea5e9)',
              border: 'none',
              color: '#0a0e1a',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              marginTop: '8px',
            }}
          >
            {loading ? 'Adding Student...' : 'Add Student →'}
          </button>

        </form>
      </div>
    </div>
  )
}