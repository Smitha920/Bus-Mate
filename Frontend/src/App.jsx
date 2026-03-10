import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import StudentLogin from './pages/student/StudentLogin'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentNotifications from './pages/student/StudentNotifications'
import DriverLogin from './pages/driver/DriverLogin'
import DriverDashboard from './pages/driver/DriverDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddStudent from './pages/admin/AddStudent'
import AddDriver from './pages/admin/AddDriver'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/add-driver" element={<AddDriver />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}