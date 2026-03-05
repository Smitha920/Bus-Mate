import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentNotifications from './pages/student/StudentNotifications'
import StudentSettings from './pages/student/StudentSettings'
import DriverDashboard from './pages/driver/DriverDashboard'
import DriverRouteSelect from './pages/driver/DriverRouteSelect'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/student/settings" element={<StudentSettings />} />
        <Route path="/driver/routes" element={<DriverRouteSelect />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}