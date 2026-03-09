import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Settings, MapPin, Clock, Users, Bus } from 'lucide-react'

const stops = [
  { id: 1, name: 'Suburb Bus Stand', eta: 0, students: 8, status: 'departed' },
  { id: 2, name: 'Vontikoppal', eta: 5, students: 12, status: 'upcoming' },
  { id: 3, name: 'Daasappa', eta: 10, students: 6, status: 'upcoming' },
  { id: 4, name: 'Post Office', eta: 14, students: 9, status: 'upcoming' },
  { id: 5, name: 'Palace Gate', eta: 18, students: 4, status: 'upcoming' },
  { id: 6, name: 'A Gate', eta: 22, students: 7, status: 'upcoming' },
  { id: 7, name: 'College', eta: 28, students: 0, status: 'upcoming' },
]

export default function StudentDashboard() {
  const [myStop] = useState(stops[2])
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 bg-gray-900">
        <div>
          <h1 className="text-lg font-bold text-white">
            Bus<span className="text-cyan-400">Mate</span>
          </h1>
          <p className="text-xs text-gray-400">Route A — College Express</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">Live</span>
          </div>
          <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
            S
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* Map Placeholder */}
        <div className="relative mx-4 mt-4 h-48 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          ></div>

          {/* Road */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-600 -translate-y-1/2 rounded"></div>

          {/* Stop dots on road */}
          {[10, 25, 40, 55, 70, 85].map((left, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${left}%` }}
            >
              <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-green-400 border-green-400' : 'bg-gray-900 border-gray-400'}`}></div>
            </div>
          ))}

          {/* Bus icon moving */}
          <div className="absolute top-1/2 -translate-y-1/2 bg-cyan-400 rounded-lg w-9 h-9 flex items-center justify-center shadow-lg shadow-cyan-400/40"
            style={{ left: '18%' }}>
            <Bus size={18} className="text-gray-900" />
          </div>

          {/* Map label */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-xs text-gray-300 font-medium">Live Map</span>
          </div>

          {/* Speed badge */}
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-xs text-cyan-400 font-mono">32 km/h</span>
          </div>
        </div>

        {/* My Stop ETA Card */}
        <div className="mx-4 mt-4 bg-gray-900 border border-cyan-400/40 rounded-2xl p-5 shadow-lg shadow-cyan-400/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Your Stop</p>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" />
                {myStop.name}
              </h2>
              <p className="text-xs text-gray-400 mt-1">Bus is on the way</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-cyan-400 font-mono leading-none">
                {myStop.eta}
              </div>
              <div className="text-xs text-gray-400 mt-1">min away</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-gray-800 rounded-full h-1.5">
            <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">City (departed)</span>
            <span className="text-xs text-gray-500">College</span>
          </div>
        </div>

        {/* Driver Info */}
        <div className="mx-4 mt-3 bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
              D
            </div>
            <div>
              <p className="text-sm font-medium text-white">Driver's Name is Driving</p>
              <p className="text-xs text-gray-400">Bus #14 · Route A</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-400 font-medium">On Route</p>
          </div>
        </div>

        {/* All Stops */}
        <div className="mx-4 mt-5">
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-3">
            All Stops — Live ETA
          </p>
          <div className="grid grid-cols-2 gap-3">
            {stops.map((stop) => (
              <div
                key={stop.id}
                className={`bg-gray-900 border rounded-xl p-4 ${
                  stop.id === myStop.id
                    ? 'border-cyan-400/60'
                    : 'border-gray-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-white">{stop.name}</p>
                  {stop.id === myStop.id && (
                    <span className="text-xs bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded-full">You</span>
                  )}
                </div>
                <p className={`text-xl font-bold font-mono mt-1 ${
                  stop.status === 'departed' ? 'text-green-400' : 'text-cyan-400'
                }`}>
                  {stop.status === 'departed' ? 'Done' : `${stop.eta}m`}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Users size={11} className="text-gray-500" />
                  <span className="text-xs text-gray-500">{stop.students} waiting</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex items-center justify-around py-3 px-6">
        <button className="flex flex-col items-center gap-1">
          <Bus size={20} className="text-cyan-400" />
          <span className="text-xs text-cyan-400 font-medium">Home</span>
        </button>
        <button
          onClick={() => navigate('/student/notifications')}
          className="flex flex-col items-center gap-1"
        >
          <Bell size={20} className="text-gray-500" />
          <span className="text-xs text-gray-500">Alerts</span>
        </button>
        <button
          onClick={() => navigate('/student/settings')}
          className="flex flex-col items-center gap-1"
        >
          <Settings size={20} className="text-gray-500" />
          <span className="text-xs text-gray-500">Settings</span>
        </button>
      </div>

    </div>
  )
}