import React from 'react'
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ST</span>
              </div>
              <span className="text-xl font-bold">School Timetable</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Gulistan Presidential School's comprehensive timetable management system 
              for students and teachers.
            </p>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Gulistan, Sirdarya Region, Uzbekistan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/timetable" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Timetables
                </a>
              </li>
              <li>
                <a href="/grades" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Grade Selection
                </a>
              </li>
              <li>
                <a href="/management" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Management
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@gulistan-presidential.uz" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  info@gulistan-presidential.uz
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+998672123456" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  +998 67 212-34-56
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-4 h-4 text-primary" />
                <a href="https://t.me/gulistan_presidential" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                  @gulistan_presidential
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Gulistan Presidential School. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 