import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen text-[#e8f0fe]"
      style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1526 50%, #0a0e1a 100%)' }}>

      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00e5ff, transparent)' }}></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00e5ff, transparent)' }}></div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="relative z-10 border-b border-[#1e2d45]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-cyan-400 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-lg">🚌</span>
              </div>
              <h1 className="text-xl font-bold text-white"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Bus<span className="text-cyan-400">Mate</span>
              </h1>
            </div>
            <p className="text-[10px] text-[#6b7a99] mt-1 ml-12 uppercase tracking-widest">
              Never Miss College Bus Again
            </p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="shrink-0 text-sm text-cyan-400 border border-cyan-400/50 px-5 py-2.5 rounded-full font-medium hover:bg-cyan-400 hover:text-[#0a0e1a]"
            style={{ transition: 'all 0.3s' }}
          >
            Login →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 flex flex-col items-center text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-10"
            style={{
              background: 'rgba(0, 255, 135, 0.06)',
              border: '1px solid rgba(0, 255, 135, 0.25)'
            }}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium tracking-wide">
              Live Tracking Available
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-bold text-white leading-tight mb-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)'
            }}>
            Never Miss Your
          </h1>
          <h1 className="font-bold leading-tight mb-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(90deg, #00e5ff, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            College Bus
          </h1>
          <h1 className="font-bold text-white leading-tight mb-10"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)'
            }}>
            Again 🚌
          </h1>

          <p className="text-[#6b7a99] text-base md:text-lg max-w-md mb-12 leading-relaxed">
            Know where your bus is. Get notified before it reaches your stop.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-sm">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 font-bold py-4 px-8 rounded-2xl text-[#0a0e1a] text-base cursor-pointer border-none"
              style={{
                background: 'linear-gradient(135deg, #00e5ff, #0ea5e9)',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.3)',
                fontFamily: 'Inter, sans-serif',
                transition: 'box-shadow 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 229, 255, 0.55)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.3)'}
            >
              🎓 I'm a Student
            </button>
            <button
              onClick={() => navigate('/driver/login')}
              className="flex-1 font-bold py-4 px-8 rounded-2xl text-white text-base cursor-pointer"
              style={{
                background: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.4)',
                fontFamily: 'Inter, sans-serif',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(249, 115, 22, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)'}
            >
              🚌 I'm a Driver
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 md:gap-16">
            {[
              { value: '500+', label: 'Students' },
              { value: '8', label: 'Bus Stops' },
              { value: 'Live', label: 'Tracking' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-10 md:gap-16">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-cyan-400"
                    style={{ fontFamily: 'Space Mono, monospace' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#6b7a99] mt-2 tracking-widest uppercase">
                    {stat.label}
                  </p>
                </div>
                {i < 2 && <div className="w-px h-10 bg-[#1e2d45]"></div>}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 border-t border-[#1e2d45]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">

          <div className="text-center mb-14">
            <p className="text-xs text-[#6b7a99] uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              How BusMate Works
            </h2>
          </div>

          {/* Cards — stack on mobile, 3 col on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01', icon: '🔐',
                title: 'Driver Checks In',
                desc: 'Driver logs in and taps Check In. GPS tracking starts instantly.',
                color: '#f97316'
              },
              {
                step: '02', icon: '📍',
                title: 'Location Updates Live',
                desc: 'Bus position is broadcast to all students every few seconds on a real map.',
                color: '#00e5ff'
              },
              {
                step: '03', icon: '🔔',
                title: 'You Get Notified',
                desc: 'Push notification sent to your phone when the bus is near your stop.',
                color: '#00ff87'
              },
            ].map((item) => (
              <div key={item.step}
                className="rounded-2xl p-8 border border-[#1e2d45]"
                style={{ background: 'rgba(17, 24, 39, 0.9)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-bold"
                    style={{ fontFamily: 'Space Mono, monospace', color: item.color }}>
                    {item.step}
                  </span>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-[#6b7a99] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-[#1e2d45]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-cyan-400 rounded-lg flex items-center justify-center text-sm shrink-0">
                🚌
              </div>
              <span className="text-white font-bold">
                Bus<span className="text-cyan-400">Mate</span>
              </span>
            </div>
            <p className="text-[9px] text-[#6b7a99] mt-1 ml-9 uppercase tracking-widest">
              Never Miss College Bus Again
            </p>
          </div>
          <p className="text-[#6b7a99] text-sm text-center">
            Built for students · Powered by real-time GPS
          </p>
          <p className="text-[#6b7a99] text-xs">© 2026 BusMate</p>
        </div>
      </footer>

    </div>
  )
}
