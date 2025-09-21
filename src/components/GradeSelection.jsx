import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, BookOpen, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const GradeSelection = () => {
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

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

  const handleGradeClick = (grade) => {
    setSelectedGrade(selectedGrade === grade.id ? null : grade.id)
    setSelectedClass(null)
  }

  const handleClassSelect = (className) => {
    setSelectedClass(className)
    // Navigate to the timetable page
    navigate(`/timetable/${selectedGrade}/${className}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (selectedGrade && selectedClass) {
      navigate(`/timetable/${selectedGrade}/${selectedClass}`)
    }
  }

  const filteredGrades = grades.filter(grade => 
    grade.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section id="timetable" className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Select Your Grade
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your grade and class to view your personalized timetable
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for grade..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                className="pl-10"
              />
            </div>
            
            {showDropdown && searchTerm && (
              <div className="absolute z-10 w-full bg-background border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((grade) => (
                    <button
                      key={grade.id}
                      type="button"
                      onClick={() => {
                        setSelectedGrade(grade.id)
                        setSearchTerm(grade.name)
                        setShowDropdown(false)
                      }}
                      className="w-full text-left p-3 hover:bg-primary/10 transition-colors duration-200"
                    >
                      {grade.name}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-muted-foreground">No grades found</div>
                )}
              </div>
            )}

            {selectedGrade && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Select Class:</label>
                <div className="grid grid-cols-2 gap-2">
                  {classes.map((className) => (
                    <Button
                      key={className}
                      type="button"
                      variant={selectedClass === className ? "default" : "outline"}
                      onClick={() => setSelectedClass(className)}
                      className="flex items-center justify-between"
                    >
                      <span>{grades.find(g => g.id === selectedGrade)?.name} {className}</span>
                      <div className={`w-3 h-3 rounded-full ${
                        className === 'Green' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedGrade && selectedClass && (
              <Button type="submit" className="w-full">
                View Timetable
              </Button>
            )}
          </form>
        </div>

        {/* Visual Grade Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {grades.map((grade) => (
            <div key={grade.id} className="relative">
              <div 
                className={`bg-background rounded-2xl p-6 shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  selectedGrade === grade.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleGradeClick(grade)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    selectedGrade === grade.id ? 'rotate-180' : ''
                  }`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground">{grade.name}</h3>
              </div>

              {/* Dropdown for class selection */}
              {selectedGrade === grade.id && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-lg border z-10">
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Select Class:</h4>
                    <div className="space-y-2">
                      {classes.map((className) => (
                        <button
                          key={className}
                          onClick={() => handleClassSelect(className)}
                          className="w-full text-left p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="font-medium text-foreground">{grade.name} {className}</span>
                          <div className={`w-4 h-4 rounded-full ${
                            className === 'Green' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedClass && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary rounded-full">
              <span className="font-medium">
                Selected: {grades.find(g => g.id === selectedGrade)?.name} {selectedClass}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default GradeSelection 