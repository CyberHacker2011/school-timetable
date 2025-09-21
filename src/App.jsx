import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Admin from '@/pages/Admin'
import Member from '@/pages/Member'
import Timetable from '@/pages/Timetable'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/member" element={<Member />} />
          
          {/* Timetable Routes */}
          <Route path="/timetable/:grade/:class" element={<Timetable />} />
          <Route path="/timetable/room/:roomNumber" element={<Timetable />} />
          <Route path="/timetable/teacher/:teacherName" element={<Timetable />} />
          <Route path="/timetable/day/:day" element={<Timetable />} />
          <Route path="/timetable/today" element={<Timetable />} />
          <Route path="/timetable/all-days" element={<Timetable />} />
          <Route path="/timetable/all" element={<Timetable />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
