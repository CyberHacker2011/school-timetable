import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, Building, Users, Grid, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000/api'

const Timetable = () => {
  const params = useParams()
  const [timetableData, setTimetableData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewType, setViewType] = useState('')
  const [viewMode, setViewMode] = useState('all') // 'all' or 'day'
  const [selectedDay, setSelectedDay] = useState('')
  const navigate = useNavigate()

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  const fetchTimetableData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      let url = ''
      let type = ''
      
      // Determine the type of request based on URL parameters
      if (params.grade && params.class) {
        url = `${API_BASE_URL}/timetables/grade/${params.grade}/class/${params.class}`
        type = 'class'
      } else if (params.roomNumber) {
        url = `${API_BASE_URL}/timetables/room/${params.roomNumber}`
        type = 'room'
      } else if (params.teacherName) {
        url = `${API_BASE_URL}/timetables/teacher/${params.teacherName}`
        type = 'teacher'
      } else if (params.day) {
        url = `${API_BASE_URL}/timetables/day/${params.day}`
        type = 'day'
      } else if (window.location.pathname.includes('/today')) {
        url = `${API_BASE_URL}/timetables/today`
        type = 'today'
      } else if (window.location.pathname.includes('/all-days')) {
        url = `${API_BASE_URL}/timetables?view=all`
        type = 'all-days'
      } else if (window.location.pathname.includes('/all')) {
        url = `${API_BASE_URL}/timetables?view=all`
        type = 'all'
      }
      
      setViewType(type)
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setTimetableData(data.data)
        if (type === 'all' && data.data.schedule) {
          setSelectedDay(Object.keys(data.data.schedule)[0] || '')
        }
      } else {
        setError(data.message || 'Failed to fetch timetable')
      }
    } catch (error) {
      console.error('Error fetching timetable:', error)
      setError('Failed to load timetable. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchTimetableData()
  }, [fetchTimetableData])

  const getTitle = () => {
    switch (viewType) {
      case 'class':
        return `Grade ${params.grade} ${params.class} Timetable`
      case 'room':
        return `Room ${params.roomNumber} Schedule`
      case 'teacher':
        return `${timetableData?.teacherName || params.teacherName} Schedule`
      case 'day':
        return `${params.day} Schedule`
      case 'today':
        return `Today's Schedule (${timetableData?.day || 'Today'})`
      case 'all-days':
        return 'All Days Timetable'
      case 'all':
        return 'Complete School Timetable'
      default:
        return 'Timetable'
    }
  }

  const getSubtitle = () => {
    switch (viewType) {
      case 'class':
        return `Complete weekly schedule for Grade ${params.grade} ${params.class}`
      case 'room':
        return `All classes scheduled in Room ${params.roomNumber}`
      case 'teacher':
        return `Weekly teaching schedule for ${timetableData?.teacherName || params.teacherName}`
      case 'day':
        return `Complete schedule for ${params.day}`
      case 'today':
        return `All classes and activities for today`
      case 'all-days':
        return `Complete school timetable organized by days`
      case 'all':
        return `Complete school timetable for all grades and classes`
      default:
        return ''
    }
  }

  const renderClassTimetable = () => {
    return (
      <div className="space-y-6">
        {days.map(day => {
          const daySchedule = timetableData.schedule[day]
          if (!daySchedule || daySchedule.length === 0) return null

          return (
            <div key={day} className="bg-background rounded-xl shadow-lg border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">{day}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Period</th>
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Teacher</th>
                      <th className="text-left p-3 font-medium">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.map((lesson, index) => (
                      <tr key={index} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                        <td className="p-3 font-medium">{lesson.period}</td>
                        <td className="p-3 font-medium">{lesson.time}</td>
                        <td className="p-3">
                          {lesson.isBreak ? (
                            <span className="text-muted-foreground italic">{lesson.breakType}</span>
                          ) : (
                            lesson.teacherSubject
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {lesson.isBreak ? '-' : lesson.teacherName}
                        </td>
                        <td className="p-3 text-primary">
                          {lesson.isBreak ? '-' : lesson.roomNumber}
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
    )
  }

  const renderRoomTimetable = () => {
    return (
      <div className="space-y-6">
        {days.map(day => {
          const daySchedule = timetableData.schedule[day]
          if (!daySchedule || daySchedule.length === 0) return null

          return (
            <div key={day} className="bg-background rounded-xl shadow-lg border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">{day}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Period</th>
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.map((lesson, index) => (
                      <tr key={index} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                        <td className="p-3 font-medium">{lesson.period}</td>
                        <td className="p-3 font-medium">{lesson.time}</td>
                        <td className="p-3 text-primary font-medium">
                          {lesson.isBreak ? '-' : `Grade ${lesson.grade} ${lesson.class}`}
                        </td>
                        <td className="p-3">
                          {lesson.isBreak ? (
                            <span className="text-muted-foreground italic">{lesson.breakType}</span>
                          ) : (
                            lesson.teacherSubject
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {lesson.isBreak ? '-' : lesson.teacherName}
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
    )
  }

  const renderTeacherTimetable = () => {
    return (
      <div className="space-y-6">
        {days.map(day => {
          const daySchedule = timetableData.schedule[day]
          if (!daySchedule || daySchedule.length === 0) return null

          return (
            <div key={day} className="bg-background rounded-xl shadow-lg border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">{day}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Period</th>
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.map((lesson, index) => (
                      <tr key={index} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                        <td className="p-3 font-medium">{lesson.period}</td>
                        <td className="p-3 font-medium">{lesson.time}</td>
                        <td className="p-3 text-primary font-medium">
                          {lesson.isBreak ? '-' : `Grade ${lesson.grade} ${lesson.class}`}
                        </td>
                        <td className="p-3">
                          {lesson.isBreak ? (
                            <span className="text-muted-foreground italic">{lesson.breakType}</span>
                          ) : (
                            lesson.teacherSubject
                          )}
                        </td>
                        <td className="p-3 text-primary">
                          {lesson.isBreak ? '-' : lesson.roomNumber}
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
    )
  }

  const renderDayTimetable = () => {
    const periods = [1, 2, 3, 4, 5, 6, 7]
    
    return (
      <div className="space-y-6">
        <div className="bg-background rounded-xl shadow-lg border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">{timetableData.day}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Period</th>
                  <th className="text-left p-3 font-medium">Time</th>
                  <th className="text-left p-3 font-medium">Class</th>
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Teacher</th>
                  <th className="text-left p-3 font-medium">Room</th>
                </tr>
              </thead>
              <tbody>
                {periods.map(period => {
                  const periodLessons = timetableData.schedule[period] || []
                  if (periodLessons.length === 0) return null

                  return periodLessons.map((lesson, index) => (
                    <tr key={`${period}-${index}`} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                      <td className="p-3 font-medium">{period}</td>
                      <td className="p-3 font-medium">{lesson.time}</td>
                      <td className="p-3 text-primary font-medium">
                        {lesson.isBreak ? '-' : `Grade ${lesson.grade} ${lesson.class}`}
                      </td>
                      <td className="p-3">
                        {lesson.isBreak ? (
                          <span className="text-muted-foreground italic">{lesson.breakType}</span>
                        ) : (
                          lesson.teacherSubject
                        )}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {lesson.isBreak ? '-' : lesson.teacherName}
                      </td>
                      <td className="p-3 text-primary">
                        {lesson.isBreak ? '-' : lesson.roomNumber}
                      </td>
                    </tr>
                  ))
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const renderAllDaysTimetable = () => {
    return (
      <div className="space-y-6">
        {days.map(day => {
          const daySchedule = timetableData.schedule[day]
          if (!daySchedule || daySchedule.length === 0) return null

          return (
            <div key={day} className="bg-background rounded-xl shadow-lg border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">{day}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Period</th>
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Teacher</th>
                      <th className="text-left p-3 font-medium">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.map((lesson, index) => (
                      <tr key={index} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                        <td className="p-3 font-medium">{lesson.period}</td>
                        <td className="p-3 font-medium">{lesson.time}</td>
                        <td className="p-3 text-primary font-medium">
                          {lesson.isBreak ? '-' : `Grade ${lesson.grade} ${lesson.class}`}
                        </td>
                        <td className="p-3">
                          {lesson.isBreak ? (
                            <span className="text-muted-foreground italic">{lesson.breakType}</span>
                          ) : (
                            lesson.teacherSubject
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {lesson.isBreak ? '-' : lesson.teacherName}
                        </td>
                        <td className="p-3 text-primary">
                          {lesson.isBreak ? '-' : lesson.roomNumber}
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
    )
  }

  const renderAllTimetables = () => {
    if (viewMode === 'day' && selectedDay) {
      const daySchedule = timetableData.schedule[selectedDay] || []
      return (
        <div className="space-y-6">
          <div className="bg-background rounded-xl shadow-lg border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">{selectedDay}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Period</th>
                    <th className="text-left p-3 font-medium">Time</th>
                    <th className="text-left p-3 font-medium">Class</th>
                    <th className="text-left p-3 font-medium">Subject</th>
                    <th className="text-left p-3 font-medium">Teacher</th>
                    <th className="text-left p-3 font-medium">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {daySchedule.map((lesson, index) => (
                    <tr key={index} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                      <td className="p-3 font-medium">{lesson.period}</td>
                      <td className="p-3 font-medium">{lesson.time}</td>
                      <td className="p-3 text-primary font-medium">
                        {lesson.isBreak ? '-' : `Grade ${lesson.grade} ${lesson.class}`}
                      </td>
                      <td className="p-3">
                        {lesson.isBreak ? (
                          <span className="text-muted-foreground italic">{lesson.breakType}</span>
                        ) : (
                          lesson.teacherSubject
                        )}
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {lesson.isBreak ? '-' : lesson.teacherName}
                      </td>
                      <td className="p-3 text-primary">
                        {lesson.isBreak ? '-' : lesson.roomNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {days.map(day => {
          const daySchedule = timetableData.schedule[day]
          if (!daySchedule || daySchedule.length === 0) return null

          return (
            <div key={day} className="bg-background rounded-xl shadow-lg border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">{day}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Period</th>
                      <th className="text-left p-3 font-medium">Time</th>
                      <th className="text-left p-3 font-medium">Class</th>
                      <th className="text-left p-3 font-medium">Subject</th>
                      <th className="text-left p-3 font-medium">Teacher</th>
                      <th className="text-left p-3 font-medium">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daySchedule.map((lesson, index) => (
                      <tr key={index} className={`border-b ${lesson.isBreak ? 'bg-muted/30' : ''}`}>
                        <td className="p-3 font-medium">{lesson.period}</td>
                        <td className="p-3 font-medium">{lesson.time}</td>
                        <td className="p-3 text-primary font-medium">
                          {lesson.isBreak ? '-' : `Grade ${lesson.grade} ${lesson.class}`}
                        </td>
                        <td className="p-3">
                          {lesson.isBreak ? (
                            <span className="text-muted-foreground italic">{lesson.breakType}</span>
                          ) : (
                            lesson.teacherSubject
                          )}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {lesson.isBreak ? '-' : lesson.teacherName}
                        </td>
                        <td className="p-3 text-primary">
                          {lesson.isBreak ? '-' : lesson.roomNumber}
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
    )
  }

  const renderTimetable = () => {
    switch (viewType) {
      case 'class':
        return renderClassTimetable()
      case 'room':
        return renderRoomTimetable()
      case 'teacher':
        return renderTeacherTimetable()
      case 'day':
      case 'today':
        return renderDayTimetable()
      case 'all-days':
        return renderAllDaysTimetable()
      case 'all':
        return renderAllTimetables()
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading timetable...</p>
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {getTitle()}
          </h1>
          <p className="text-muted-foreground mb-4">
            {getSubtitle()}
          </p>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>School Hours: 08:30 - 15:35</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>45 min lessons</span>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* View Mode Toggle for All Timetables */}
      {viewType === 'all' && (
        <div className="mb-6 bg-background rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                onClick={() => setViewMode('all')}
                className="flex items-center space-x-2"
              >
                <Grid className="w-4 h-4" />
                <span>All Days</span>
              </Button>
              <Button
                variant={viewMode === 'day' ? 'default' : 'outline'}
                onClick={() => setViewMode('day')}
                className="flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Single Day</span>
              </Button>
            </div>
            
            {viewMode === 'day' && (
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="border rounded-md px-3 py-1 text-sm"
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {timetableData && renderTimetable()}

      <div className="bg-muted/50 rounded-lg p-4 mt-8">
        <h4 className="font-semibold text-foreground mb-2">Schedule Notes:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Period 1: 8:30 - 9:15</li>
          <li>• Period 2: 9:20 - 10:05</li>
          <li>• Period 3: 10:10 - 10:55</li>
          <li>• Tea Break: 10:55 - 11:15</li>
          <li>• Period 4: 11:15 - 12:00</li>
          <li>• Period 5: 12:05 - 12:50</li>
          <li>• Lunch Break: 12:50 - 14:00</li>
          <li>• Period 6: 14:00 - 14:45</li>
          <li>• Period 7: 14:50 - 15:35</li>
        </ul>
      </div>
    </div>
  )
}

export default Timetable 