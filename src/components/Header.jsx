import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, Monitor, Menu, X } from 'lucide-react'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light'
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme) => {
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }

  const handleThemeChange = (newTheme) => {
    applyTheme(newTheme)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const isHomePage = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ST</span>
            </div>
            <span className="text-xl font-bold">School Timetable</span>
          </Link>

          {/* Right side: Navigation Links + Theme Dropdown */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Home
              </Link>
              {isHomePage && (
                <>
                  <button
                    onClick={() => scrollToSection('mission')}
                    className="font-medium transition-colors hover:text-primary text-foreground"
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => scrollToSection('management')}
                    className="font-medium transition-colors hover:text-primary text-foreground"
                  >
                    Management
                  </button>
                  <button
                    onClick={() => scrollToSection('timetable')}
                    className="font-medium transition-colors hover:text-primary text-foreground"
                  >
                    Timetable
                  </button>
                </>
              )}
              <Link 
                to="/admin" 
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/admin') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Admin
              </Link>
              <Link 
                to="/member" 
                className={`font-medium transition-colors hover:text-primary ${
                  isActive('/member') ? 'text-primary' : 'text-foreground'
                }`}
              >
                Member
              </Link>
            </nav>

            {/* Theme Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('system')}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-primary px-4 ${
                  isActive('/') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {isHomePage && (
                <>
                  <button
                    onClick={() => scrollToSection('mission')}
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground px-4 text-left"
                  >
                    Mission
                  </button>
                  <button
                    onClick={() => scrollToSection('management')}
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground px-4 text-left"
                  >
                    Management
                  </button>
                  <button
                    onClick={() => scrollToSection('timetable')}
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground px-4 text-left"
                  >
                    Timetable
                  </button>
                </>
              )}
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors hover:text-primary px-4 ${
                  isActive('/admin') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              <Link 
                to="/member" 
                className={`text-sm font-medium transition-colors hover:text-primary px-4 ${
                  isActive('/member') ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Member
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 