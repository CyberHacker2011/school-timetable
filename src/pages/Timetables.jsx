import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Calendar,
  BookOpen,
  Clock
} from 'lucide-react'

const API_BASE_URL = 'http://localhost:5000/api'

const Timetables = () => {
  const navigate = useNavigate()
  const [timetables, setTimetables] = useState([])
  const [filteredTimetables, setFilteredTimetables] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewType, setViewType] = useState('all')
  const [sortBy, setSortBy] = useState('day')
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDay, setFilterDay] = useState('')
  const [filterGrade, setFilterGrade] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterTeacher, setFilterTeacher] = useState('')
  const [filterRoom, setFilterRoom] = useState('')

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const grades = [5, 6, 7, 8, 9, 10, 11]
  const classes = ['Green', 'Blue']

  useEffect(() => {
    fetchTimetables()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [timetables, searchTerm, filterDay, filterGrade, filterClass, filterTeacher, filterRoom, sortBy, sortOrder])

  const fetchTimetables = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_BASE_URL}/timetables/flat`)
      const data = await response.json()
      
      if (data.success) {
        setTimetables(data.data)
      } else {
        setError(data.message || 'Failed to fetch timetables')
      }
    } catch (error) {
      console.error('Error fetching timetables:', error)
      setError('Failed to load timetables. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let filtered = [...timetables]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.teacherSubject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${entry.grade} ${entry.class}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply day filter
    if (filterDay) {
      filtered = filtered.filter(entry => entry.day === filterDay)
    }

    // Apply grade filter
    if (filterGrade) {
      filtered = filtered.filter(entry => entry.grade === parseInt(filterGrade))
    }

    // Apply class filter
    if (filterClass) {
      filtered = filtered.filter(entry => entry.class === filterClass)
    }

    // Apply teacher filter
    if (filterTeacher) {
      filtered = filtered.filter(entry => entry.teacherName === filterTeacher)
    }

    // Apply room filter
    if (filterRoom) {
      filtered = filtered.filter(entry => entry.roomNumber === filterRoom)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'day':
          aValue = days.indexOf(a.day)
          bValue = days.indexOf(b.day)
          break
        case 'period':
          aValue = a.period
          bValue = b.period
          break
        case 'teacher':
          aValue = a.teacherName || ''
          bValue = b.teacherName || ''
          break
        case 'room':
          aValue = a.roomNumber || ''
          bValue = b.roomNumber || ''
          break
        case 'grade':
          aValue = a.grade
          bValue = b.grade
          break
        default:
          aValue = a[sortBy] || ''
          bValue = b[sortBy] || ''
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredTimetables(filtered)
  }

  const getTimeSlotLabel = (period) => {
    const timeSlots = {
      1: 'Period 1 (08:00-08:45)',
      2: 'Period 2 (08:45-09:30)',
      3: 'Period 3 (09:30-10:15)',
      4: 'Period 4 (10:15-11:00)',
      5: 'Period 5 (11:00-11:45)',
      6: 'Period 6 (11:45-12:30)',
      7: 'Period 7 (12:30-13:15)'
    }
    return timeSlots[period] || `Period ${period}`
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilterDay('')
    setFilterGrade('')
    setFilterClass('')
    setFilterTeacher('')
    setFilterRoom('')
  }

  const getUniqueValues = (field) => {
    return [...new Set(timetables.map(entry => entry[field]).filter(Boolean))]
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading timetables...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button onClick={() => navigate('/')} variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-foreground">School Timetables</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all school timetables with advanced filtering and sorting
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Entries</p>
          <p className="text-2xl font-bold text-primary">{filteredTimetables.length}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-background border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search timetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Day Filter */}
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All Days</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          {/* Grade Filter */}
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All Grades</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>

          {/* Class Filter */}
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All Classes</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Teacher Filter */}
          <select
            value={filterTeacher}
            onChange={(e) => setFilterTeacher(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All Teachers</option>
            {getUniqueValues('teacherName').map(teacher => (
              <option key={teacher} value={teacher}>{teacher}</option>
            ))}
          </select>

          {/* Room Filter */}
          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">All Rooms</option>
            {getUniqueValues('roomNumber').map(room => (
              <option key={room} value={room}>Room {room}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="day">Sort by Day</option>
            <option value="period">Sort by Period</option>
            <option value="teacher">Sort by Teacher</option>
            <option value="room">Sort by Room</option>
            <option value="grade">Sort by Grade</option>
          </select>

          {/* Sort Order */}
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center justify-center"
          >
            {sortOrder === 'asc' ? <SortAsc className="w-4 h-4 mr-2" /> : <SortDesc className="w-4 h-4 mr-2" />}
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={clearFilters}>
            <Filter className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant={viewType === 'all' ? 'default' : 'outline'}
              onClick={() => setViewType('all')}
              size="sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              All Entries
            </Button>
            <Button
              variant={viewType === 'grouped' ? 'default' : 'outline'}
              onClick={() => setViewType('grouped')}
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Grouped by Day
            </Button>
          </div>
        </div>
      </div>

      {/* Timetables Display */}
      {viewType === 'grouped' ? (
        <div className="space-y-6">
          {days.map(day => {
            const dayEntries = filteredTimetables.filter(entry => entry.day === day)
            if (dayEntries.length === 0) return null

            return (
              <div key={day} className="bg-background border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-4 border-b">
                  <h2 className="text-xl font-semibold text-foreground flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {day}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({dayEntries.length} entries)
                    </span>
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Period</th>
                        <th className="text-left p-3 font-medium">Time</th>
                        <th className="text-left p-3 font-medium">Class</th>
                        <th className="text-left p-3 font-medium">Subject</th>
                        <th className="text-left p-3 font-medium">Teacher</th>
                        <th className="text-left p-3 font-medium">Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dayEntries.map((entry, index) => (
                        <tr key={index} className={`border-b ${entry.isBreak ? 'bg-muted/30' : ''}`}>
                          <td className="p-3 font-medium">{entry.period}</td>
                          <td className="p-3 text-muted-foreground">{getTimeSlotLabel(entry.period)}</td>
                          <td className="p-3 text-primary font-medium">
                            {entry.isBreak ? '-' : `Grade ${entry.grade} ${entry.class}`}
                          </td>
                          <td className="p-3">
                            {entry.isBreak ? (
                              <span className="text-muted-foreground italic">{entry.breakType}</span>
                            ) : (
                              entry.teacherSubject
                            )}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {entry.isBreak ? '-' : entry.teacherName}
                          </td>
                          <td className="p-3 text-primary">
                            {entry.isBreak ? '-' : entry.roomNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-background border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Day</th>
                  <th className="text-left p-3 font-medium">Period</th>
                  <th className="text-left p-3 font-medium">Time</th>
                  <th className="text-left p-3 font-medium">Class</th>
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Teacher</th>
                  <th className="text-left p-3 font-medium">Room</th>
                </tr>
              </thead>
              <tbody>
                {filteredTimetables.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-8 text-muted-foreground">
                      No timetables found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredTimetables.map((entry, index) => (
                    <tr key={index} className={`border-b ${entry.isBreak ? 'bg-muted/30' : ''}`}>
                      <td className="p-3 font-medium">{entry.day}</td>
                      <td className="p-3 font-medium">{entry.period}</td>
                      <td className="p-3 text-muted-foreground">{getTimeSlotLabel(entry.period)}</td>
                      <td className="p-3 text-primary font-medium">
                        {entry.isBreak ? '-' : `Grade ${entry.grade} ${entry.class}`}
                      </td>
                      <td className="p-3">
                        {entry.isBreak ? (
                          <span className="text-muted-foreground italic">{entry.breakType}</span>
                        ) : (
                          entry.teacherSubject
                        )}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {entry.isBreak ? '-' : entry.teacherName}
                      </td>
                      <td className="p-3 text-primary">
                        {entry.isBreak ? '-' : entry.roomNumber}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Timetables 