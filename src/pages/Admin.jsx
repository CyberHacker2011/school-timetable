import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, User, Plus, Edit, Trash2, X, Users, Building } from 'lucide-react'

const API_BASE_URL = 'http://localhost:5000/api'

// Predefined time slots
const TIME_SLOTS = [
  { id: 1, label: '1st Period', startTime: '08:30', endTime: '09:15' },
  { id: 2, label: '2nd Period', startTime: '09:20', endTime: '10:05' },
  { id: 3, label: '3rd Period', startTime: '10:10', endTime: '10:55' },
  { id: 4, label: '4th Period', startTime: '11:15', endTime: '12:00' },
  { id: 5, label: '5th Period', startTime: '12:05', endTime: '12:50' },
  { id: 6, label: '6th Period', startTime: '14:00', endTime: '14:45' },
  { id: 7, label: '7th Period', startTime: '14:50', endTime: '15:35' },
]

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [timetables, setTimetables] = useState([])
  const [teachers, setTeachers] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [showClassroomForm, setShowClassroomForm] = useState(false)
  const [activeTab, setActiveTab] = useState('timetable')
  const [formData, setFormData] = useState({
    day: '',
    period: '',
    roomNumber: '',
    teacherName: '',
    teacherSubject: '',
    grade: '',
    class: '',
    isBreak: false,
    breakType: ''
  })
  const [teacherFormData, setTeacherFormData] = useState({
    name: '',
    subject: ''
  })
  const [classroomFormData, setClassroomFormData] = useState({
    roomNumber: '',
    capacity: '',
    floor: ''
  })
  const [sortField, setSortField] = useState('day')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    if (isLoggedIn) {
      fetchTimetables()
      fetchTeachers()
      fetchClassrooms()
    }
  }, [isLoggedIn])

  const fetchTimetables = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/timetables/flat`)
      const data = await response.json()
      if (data.success) {
        setTimetables(data.data)
      }
    } catch (error) {
      console.error('Error fetching timetables:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/teachers`)
      const data = await response.json()
      if (data.success) {
        setTeachers(data.data)
      }
    } catch (error) {
      console.error('Error fetching teachers:', error)
    }
  }

  const fetchClassrooms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/classrooms`)
      const data = await response.json()
      if (data.success) {
        setClassrooms(data.data)
      }
    } catch (error) {
      console.error('Error fetching classrooms:', error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('adminToken', data.token)
        setIsLoggedIn(true)
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
    setLoginData({ username: '', password: '' })
    setTimetables([])
  }

  const handleAddEntry = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      const timetableData = {
        ...formData,
        period: parseInt(formData.period),
        grade: parseInt(formData.grade)
      }
      
      const response = await fetch(`${API_BASE_URL}/timetables`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timetableData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setShowAddForm(false)
        setFormData({
          day: '',
          period: '',
          roomNumber: '',
          teacherName: '',
          teacherSubject: '',
          grade: '',
          class: '',
          isBreak: false,
          breakType: ''
        })
        fetchTimetables()
        alert('Timetable entry added successfully!')
      } else {
        alert(data.message || 'Failed to add entry')
      }
    } catch (error) {
      console.error('Error adding entry:', error)
      alert('Failed to add entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTeacher = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/teachers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherFormData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setShowTeacherForm(false)
        setTeacherFormData({ name: '', subject: '' })
        fetchTeachers()
        alert('Teacher added successfully!')
      } else {
        alert(data.message || 'Failed to add teacher')
      }
    } catch (error) {
      console.error('Error adding teacher:', error)
      alert('Failed to add teacher. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddClassroom = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/classrooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classroomFormData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setShowClassroomForm(false)
        setClassroomFormData({ roomNumber: '', capacity: '', floor: '' })
        fetchClassrooms()
        alert('Classroom added successfully!')
      } else {
        alert(data.message || 'Failed to add classroom')
      }
    } catch (error) {
      console.error('Error adding classroom:', error)
      alert('Failed to add classroom. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEntry = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/timetables/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        fetchTimetables()
        alert('Entry deleted successfully!')
      } else {
        alert('Failed to delete entry')
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTeacher = async (id) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return
    
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/teachers/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        fetchTeachers()
        alert('Teacher deleted successfully!')
      } else {
        alert('Failed to delete teacher')
      }
    } catch (error) {
      console.error('Error deleting teacher:', error)
      alert('Failed to delete teacher. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClassroom = async (id) => {
    if (!confirm('Are you sure you want to delete this classroom?')) return
    
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/classrooms/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        fetchClassrooms()
        alert('Classroom deleted successfully!')
      } else {
        alert('Failed to delete classroom')
      }
    } catch (error) {
      console.error('Error deleting classroom:', error)
      alert('Failed to delete classroom. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getTimeSlotLabel = (period) => {
    const timeSlot = TIME_SLOTS.find(slot => slot.id === period)
    return timeSlot ? timeSlot.label : `Period ${period}`
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedTimetables = [...timetables].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]
    if (sortField === 'period' || sortField === 'grade') {
      aValue = parseInt(aValue)
      bValue = parseInt(bValue)
    }
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background">
        <div className="bg-background p-8 rounded-2xl shadow-xl border w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <Input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Default Credentials:</strong><br />
              Username: admin<br />
              Password: gulistanpm_01
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">Manage timetables, teachers, and classrooms</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <User className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('timetable')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'timetable' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Timetables
        </button>
        <button
          onClick={() => setActiveTab('teachers')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'teachers' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Teachers
        </button>
        <button
          onClick={() => setActiveTab('classrooms')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'classrooms' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Building className="w-4 h-4 inline mr-2" />
          Classrooms
        </button>
      </div>

      {/* Timetable Management */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Timetable Management</h2>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </div>

          {showAddForm && (
            <div className="bg-background border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add Timetable Entry</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Period</label>
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Period</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label} ({slot.startTime}-{slot.endTime})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Room Number</label>
                  <select
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Room</option>
                    {classrooms.map(room => (
                      <option key={room._id} value={room.roomNumber}>{room.roomNumber}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Teacher</label>
                  <select
                    value={formData.teacherName}
                    onChange={e => {
                      const selectedTeacher = teachers.find(t => t.name === e.target.value)
                      setFormData({
                        ...formData,
                        teacherName: e.target.value,
                        teacherSubject: selectedTeacher ? selectedTeacher.subject : ''
                      })
                    }}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    type="text"
                    value={formData.teacherSubject}
                    disabled
                    placeholder="Auto-filled from teacher"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Grade</option>
                    {[5, 6, 7, 8, 9, 10, 11].map(grade => (
                      <option key={grade} value={grade}>Grade {grade}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                  </select>
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isBreak}
                      onChange={(e) => setFormData({ ...formData, isBreak: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Is Break</span>
                  </label>
                </div>
                
                {formData.isBreak && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Break Type</label>
                    <select
                      value={formData.breakType}
                      onChange={(e) => setFormData({ ...formData, breakType: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Break Type</option>
                      <option value="Tea Break">Tea Break</option>
                      <option value="Lunch Break">Lunch Break</option>
                    </select>
                  </div>
                )}
                
                <div className="md:col-span-2 lg:col-span-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Entry'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Timetable List */}
          <div className="bg-background border rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Current Timetables</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('day')}>Day</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('period')}>Period</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('roomNumber')}>Room</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('teacherName')}>Teacher</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('teacherSubject')}>Subject</th>
                    <th className="text-left p-4 font-medium cursor-pointer" onClick={() => handleSort('class')}>Class</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center p-4">Loading...</td>
                    </tr>
                  ) : sortedTimetables.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center p-4 text-muted-foreground">No timetable entries found</td>
                    </tr>
                  ) : (
                    sortedTimetables.map((entry, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4">{entry.day}</td>
                        <td className="p-4">{getTimeSlotLabel(entry.period)}</td>
                        <td className="p-4">{entry.roomNumber}</td>
                        <td className="p-4">{entry.teacherName}</td>
                        <td className="p-4">{entry.teacherSubject}</td>
                        <td className="p-4">Grade {entry.grade} {entry.class}</td>
                        <td className="p-4">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Management */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Teacher Management</h2>
            <Button onClick={() => setShowTeacherForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>

          {showTeacherForm && (
            <div className="bg-background border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Teacher</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowTeacherForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <form onSubmit={handleAddTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    value={teacherFormData.name}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, name: e.target.value })}
                    placeholder="Enter teacher name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    type="text"
                    value={teacherFormData.subject}
                    onChange={(e) => setTeacherFormData({ ...teacherFormData, subject: e.target.value })}
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Teacher'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-background border rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Current Teachers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Subject</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher._id} className="border-b">
                      <td className="p-4">{teacher.name}</td>
                      <td className="p-4">{teacher.subject}</td>
                      <td className="p-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTeacher(teacher._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Classroom Management */}
      {activeTab === 'classrooms' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Classroom Management</h2>
            <Button onClick={() => setShowClassroomForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Classroom
            </Button>
          </div>

          {showClassroomForm && (
            <div className="bg-background border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add New Classroom</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowClassroomForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <form onSubmit={handleAddClassroom} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Room Number</label>
                  <Input
                    type="text"
                    value={classroomFormData.roomNumber}
                    onChange={(e) => setClassroomFormData({ ...classroomFormData, roomNumber: e.target.value })}
                    placeholder="e.g., 101, 203"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capacity</label>
                  <Input
                    type="number"
                    value={classroomFormData.capacity}
                    onChange={(e) => setClassroomFormData({ ...classroomFormData, capacity: e.target.value })}
                    placeholder="Enter capacity"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Floor</label>
                  <Input
                    type="number"
                    value={classroomFormData.floor}
                    onChange={(e) => setClassroomFormData({ ...classroomFormData, floor: e.target.value })}
                    placeholder="Enter floor number"
                    required
                  />
                </div>
                <div className="md:col-span-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Classroom'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-background border rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Current Classrooms</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Room Number</th>
                    <th className="text-left p-4 font-medium">Capacity</th>
                    <th className="text-left p-4 font-medium">Floor</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms.map((classroom) => (
                    <tr key={classroom._id} className="border-b">
                      <td className="p-4 font-medium">{classroom.roomNumber}</td>
                      <td className="p-4">{classroom.capacity}</td>
                      <td className="p-4">{classroom.floor}</td>
                      <td className="p-4">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClassroom(classroom._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin 