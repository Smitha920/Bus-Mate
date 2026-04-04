import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const stops = [
  'City', 'Varthikopal', 'Indappa',
  'Post Office', 'Palace Gate', 'A Gate', 'College'
]

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function AddStudent() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', usn: '', year: '', stop: '', phone: '', photo: null
  })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.usn || !form.year || !form.stop || !form.phone) {
      setError('Please fill all required fields')
      return
    }
    if (form.usn.length < 10) {
      setError('Please enter a valid USN')
      return
    }
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setForm({ name: '', usn: '', year: '', stop: '', phone: '', photo: null })
    }, 2000)
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

        {/* SUCCESS MESSAGE */}
        {success && (
          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(0,255,135,0.08)', border: '1px solid rgba(0,255,135,0.3)', marginBottom: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', margin: '0 0 8px 0' }}>✅</p>
            <p style={{ color: '#00ff87', fontWeight: 600, margin: 0 }}>Student added successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Photo Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={labelStyle}>Photo (optional)</label>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '2px dashed #1e2d45', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '28px' }}
              onClick={() => document.getElementById('student-photo').click()}>
              {form.photo ? '✅' : '📷'}
            </div>
            <input id="student-photo" type="file" accept="image/*" style={{ display: 'none' }}
              onChange={(e) => handleChange('photo', e.target.files[0])} />
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: 0 }}>Tap to upload student photo</p>
          </div>

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
            <p style={{ fontSize: '12px', color: '#6b7a99', margin: '6px 0 0 0' }}>Format: 1VV22CS001</p>
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
                  style={{ padding: '10px', borderRadius: '10px', border: '1px solid', cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'Inter, sans-serif', background: form.year === y ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.04)', borderColor: form.year === y ? '#00e5ff' : '#1e2d45', color: form.year === y ? '#00e5ff' : '#6b7a99' }}
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
                  key={stop}
                  type="button"
                  onClick={() => handleChange('stop', stop)}
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid', cursor: 'pointer', fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif', textAlign: 'left', background: form.stop === stop ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.04)', borderColor: form.stop === stop ? '#00e5ff' : '#1e2d45', color: form.stop === stop ? '#00e5ff' : '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>📍 {stop}</span>
                  {form.stop === stop && <span>✓</span>}
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
            style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)', border: 'none', color: '#0a0e1a', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}
          >
            Add Student →
          </button>

        </form>
      </div>
    </div>
  )
}