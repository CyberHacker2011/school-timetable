import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Building, Users, Calendar, Clock, Grid, List } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const TimetableSelection = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const API_BASE_URL = 'http://localhost:5000/api'

  // Fetch teachers and classrooms on component mount
  useEffect(() => {
    fetchTeachers()
    fetchClassrooms()
  }, [])

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

  const selectionTypes = [
    {
      id: 'room',
      name: 'View by Room',
      description: 'See all classes in a specific classroom',
      icon: Building,
      placeholder: 'Select room number',
      options: classrooms.map(c => c.roomNumber)
    },
    {
      id: 'teacher',
      name: 'View by Teacher',
      description: 'See a teacher\'s schedule',
      icon: Users,
      placeholder: 'Select teacher',
      options: teachers.map(t => t.name)
    },
    {
      id: 'class',
      name: 'View by Class',
      description: 'See a specific grade and class schedule',
      icon: Calendar,
      placeholder: 'Select grade and class',
      options: []
    },
    {
      id: 'today',
      name: 'Today\'s Schedule',
      description: 'See all classes happening today',
      icon: Clock,
      placeholder: 'View today\'s complete schedule',
      options: []
    },
    {
      id: 'all-days',
      name: 'All Days Timetable',
      description: 'View complete school timetable by days',
      icon: Grid,
      placeholder: 'View all days timetable',
      options: []
    },
    {
      id: 'all',
      name: 'All Timetables',
      description: 'View all timetables without sorting',
      icon: List,
      placeholder: 'View all timetables',
      options: []
    }
  ]

  const grades = [
    { id: 5, name: "Grade 5" },
    { id: 6, name: "Grade 6" },
    { id: 7, name: "Grade 7" },
    { id: 8, name: "Grade 8" },
    { id: 9, name: "Grade 9" },
    { id: 10, name: "Grade 10" },
    { id: 11, name: "Grade 11" }
  ]

  const classes = ['Green', 'Blue']

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setSearchValue('')
    setShowDropdown(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!selectedType) return

    if (selectedType.id === 'today') {
      navigate('/timetable/today')
    } else if (selectedType.id === 'all-days') {
      navigate('/timetable/all-days')
    } else if (selectedType.id === 'all') {
      navigate('/timetable/all')
    } else if (selectedType.id === 'class' && searchValue) {
      const [grade, className] = searchValue.split('-')
      navigate(`/timetable/grade/${grade}/class/${className}`)
    } else if (searchValue) {
      navigate(`/timetable/${selectedType.id}/${searchValue}`)
    }
  }

  const handleClassSelect = (grade, className) => {
    setSearchValue(`${grade}-${className}`)
    setShowDropdown(false)
  }

  const handleOptionSelect = (option) => {
    setSearchValue(option)
    setShowDropdown(false)
  }

  const filteredOptions = selectedType?.options?.filter(option => 
    option.toLowerCase().includes(searchValue.toLowerCase())
  ) || []

  return (
    <section id="timetable" className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            School Timetable
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose how you want to view the school timetable - by room, teacher, class, or see today's schedule
          </p>
        </div>

        {/* Selection Type Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {selectionTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <div
                key={type.id}
                className={`bg-background rounded-2xl p-6 shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedType?.id === type.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTypeSelect(type)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{type.name}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            )
          })}
        </div>

        {/* Search Section */}
        {selectedType && (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={selectedType.placeholder}
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value)
                    if (selectedType.id === 'class' || selectedType.options?.length > 0) {
                      setShowDropdown(true)
                    }
                  }}
                  onFocus={() => {
                    if (selectedType.id === 'class' || selectedType.options?.length > 0) {
                      setShowDropdown(true)
                    }
                  }}
                  className="pl-10"
                />
              </div>
              
              {/* Dropdown for class selection */}
              {selectedType.id === 'class' && showDropdown && (
                <div className="absolute z-10 w-full bg-background border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {grades.map((grade) => (
                    <div key={grade.id} className="p-2">
                      <div className="text-sm font-medium text-muted-foreground mb-2">{grade.name}</div>
                      <div className="grid grid-cols-2 gap-1">
                        {classes.map((className) => (
                          <button
                            key={className}
                            type="button"
                            onClick={() => handleClassSelect(grade.id, className)}
                            className="text-left p-2 rounded hover:bg-primary/10 transition-colors duration-200 flex items-center justify-between"
                          >
                            <span className="text-sm">{className}</span>
                            <div className={`w-3 h-3 rounded-full ${
                              className === 'Green' ? 'bg-green-500' : 'bg-blue-500'
                            }`}></div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown for other selections */}
              {selectedType.options?.length > 0 && showDropdown && searchValue && (
                <div className="absolute z-10 w-full bg-background border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleOptionSelect(option)}
                        className="w-full text-left p-3 hover:bg-primary/10 transition-colors duration-200"
                      >
                        {selectedType.id === 'room' ? `Room ${option}` : option}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-muted-foreground">No options found</div>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={selectedType.id === 'today' || selectedType.id === 'all-days' || selectedType.id === 'all' ? false : !searchValue}
              >
                {selectedType.id === 'today' ? 'View Today\'s Schedule' : 
                 selectedType.id === 'all-days' ? 'View All Days Timetable' :
                 selectedType.id === 'all' ? 'View All Timetables' : 'View Timetable'}
              </Button>
            </form>
          </div>
        )}

        {selectedType && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary rounded-full">
              <span className="font-medium">
                Selected: {selectedType.name}
              </span>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-background rounded-xl p-6 shadow-lg border text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Teachers</h3>
            <p className="text-2xl font-bold text-blue-600">{teachers.length}</p>
          </div>
          <div className="bg-background rounded-xl p-6 shadow-lg border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Classrooms</h3>
            <p className="text-2xl font-bold text-green-600">{classrooms.length}</p>
          </div>
          <div className="bg-background rounded-xl p-6 shadow-lg border text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Classes</h3>
            <p className="text-2xl font-bold text-purple-600">{grades.length * classes.length}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimetableSelection 