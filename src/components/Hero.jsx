import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Award, BookOpen, MapPin, Clock } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main image with shadow effects */}
              <div className="relative z-10">
                <img 
                  src="students.jpg" 
                  alt="Gulistan Presidential School Students" 
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating shadow effect */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/20 rounded-2xl transform rotate-3"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary rounded-full opacity-20"></div>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border z-10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="text-xl font-bold text-foreground">200+</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Excellence in Education Since 2021
              </div>
              
              <h1 className="text-2xl lg:text-6xl font-bold leading-tight">
                Welcome to{' '}
                <span className="text-primary">Presidential School in Gulistan</span>
              </h1>
              
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Gulistan, Sirdarya Region, Uzbekistan</span>
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Access your class schedules, room assignments, and teacher timetables with our comprehensive 
                digital timetable system designed for students and teachers.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Smart Scheduling</h3>
                  <p className="text-sm text-muted-foreground">Real-time timetable updates</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Room Management</h3>
                  <p className="text-sm text-muted-foreground">101-110, 201-207, Sport Hall</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Easy Access</h3>
                  <p className="text-sm text-muted-foreground">Quick timetable search</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Teacher Schedules</h3>
                  <p className="text-sm text-muted-foreground">Complete teacher timetables</p>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                View Timetables
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3">
                Grade Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 