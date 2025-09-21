import React, { useState } from 'react'
import { Calendar, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Member = () => {
  const [selectedFilter, setSelectedFilter] = useState('grade')
  const [filterValue, setFilterValue] = useState('')
  const [timetableData, setTimetableData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sample timetable data structure
  const sampleTimetable = {
    grade: 5,
    class: "Green",
    schedule: {
      "Monday": [
        { time: "08:30-09:15", subject: "Mathematics", teacher: "Ms. Sarah Johnson", room: "101" },
        { time: "09:20-10:05", subject: "English", teacher: "Mr. David Smith", room: "102" },
        { time: "10:10-10:55", subject: "Science", teacher: "Dr. Emily Brown", room: "103" },
        { time: "11:15-12:00", subject: "History", teacher: "Ms. Lisa Wilson", room: "104" },
        { time: "12:05-12:50", subject: "Physical Education", teacher: "Mr. Mike Davis", room: "Sport Hall" },
        { time: "14:00-14:45", subject: "Art", teacher: "Ms. Anna Garcia", room: "105" },
        { time: "14:50-15:35", subject: "Music", teacher: "Mr. John Wilson", room: "106" }
      ],
      "Tuesday": [
        { time: "08:30-09:15", subject: "English", teacher: "Mr. David Smith", room: "102" },
        { time: "09:20-10:05", subject: "Mathematics", teacher: "Ms. Sarah Johnson", room: "101" },
        { time: "10:10-10:55", subject: "Art", teacher: "Ms. Anna Garcia", room: "105" },
        { time: "11:15-12:00", subject: "Science", teacher: "Dr. Emily Brown", room: "103" },
        { time: "12:05-12:50", subject: "Music", teacher: "Mr. John Wilson", room: "106" },
        { time: "14:00-14:45", subject: "History", teacher: "Ms. Lisa Wilson", room: "104" },
        { time: "14:50-15:35", subject: "Physical Education", teacher: "Mr. Mike Davis", room: "Sport Hall" }
      ]
    }
  }

  const fetchTimetable = async () => {
    setLoading(true)
    try {
      // In real app, this would be an API call
      // const response = await fetch(`/api/timetables/${selectedFilter}/${filterValue}`)
      // const data = await response.json()
      
      // Simulate API call
      setTimeout(() => {
        setTimetableData(sampleTimetable)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching timetable:', error)
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (filterValue.trim()) {
      fetchTimetable()
    }
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Timetable Viewer</h1>
        <p className="text-muted-foreground">View timetables by grade, classroom, or teacher</p>
      </div>

      {/* Search Section */}
      <div className="bg-background rounded-xl shadow-lg border p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Search Timetables</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Filter By
            </label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full p-3 border rounded-lg bg-background"
            >
              <option value="grade">Grade</option>
              <option value="classroom">Classroom</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Value
            </label>
            <Input
              type="text"
              placeholder={`Enter ${selectedFilter}`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleSearch} disabled={loading} className="w-full">
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Timetable Display */}
      {timetableData && (
        <div className="bg-background rounded-xl shadow-lg border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Timetable: Grade {timetableData.grade} {timetableData.class}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>School Hours: 08:30 - 15:35</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Time</th>
                  {days.map(day => (
                    <th key={day} className="text-left p-3 font-medium">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }, (_, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3 font-medium">
                      {i === 0 && "08:30-09:15"}
                      {i === 1 && "09:20-10:05"}
                      {i === 2 && "10:10-10:55"}
                      {i === 3 && "11:15-12:00"}
                      {i === 4 && "12:05-12:50"}
                      {i === 5 && "14:00-14:45"}
                      {i === 6 && "14:50-15:35"}
                    </td>
                    {days.map(day => {
                      const lesson = timetableData.schedule[day]?.[i]
                      return (
                        <td key={day} className="p-3">
                          {lesson ? (
                            <div className="space-y-1">
                              <div className="font-medium text-sm">{lesson.subject}</div>
                              <div className="text-xs text-muted-foreground">{lesson.teacher}</div>
                              <div className="text-xs text-primary">{lesson.room}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Schedule Notes */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Schedule Notes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Tea Break: 10:55 - 11:15</li>
              <li>• Lunch Break: 12:50 - 14:00</li>
              <li>• 5-minute breaks between other classes</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Member 