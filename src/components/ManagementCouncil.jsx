import React, { useEffect, useRef } from 'react'
import { Users, Award, BookOpen, Settings, UserCheck, Shield } from 'lucide-react'

const ManagementCouncil = () => {
  const scrollContainerRef = useRef(null)

  const management = [
    {
      id: 1,
      name: "Dr. Aziza Karimova",
      position: "Academic Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      icon: BookOpen
    },
    {
      id: 2,
      name: "Mr. Rustam Toshmatov",
      position: "Deputy Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      icon: Settings
    },
    {
      id: 3,
      name: "Ms. Dilfuza Rakhimova",
      position: "Head of Student Services",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      icon: Users
    },
    {
      id: 4,
      name: "Mr. Jamshid Khamidov",
      position: "Head of Academic Affairs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      icon: Award
    },
    {
      id: 5,
      name: "Ms. Malika Yusupova",
      position: "Head of Quality Assurance",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      icon: Shield
    },
    {
      id: 6,
      name: "Mr. Alisher Mirzaev",
      position: "Head of International Relations",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      icon: UserCheck
    }
  ]

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollInterval
    let isPaused = false

    const startAutoScroll = () => {
      if (isPaused) return
      
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          // Reset to beginning smoothly
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          // Scroll by a smaller amount for smoother movement
          scrollContainer.scrollBy({ left: 1, behavior: 'auto' })
        }
      }, 50) // Faster interval for smoother movement
    }

    const stopAutoScroll = () => {
      isPaused = true
      clearInterval(scrollInterval)
    }

    const resumeAutoScroll = () => {
      isPaused = false
      startAutoScroll()
    }

    startAutoScroll()

    scrollContainer.addEventListener('mouseenter', stopAutoScroll)
    scrollContainer.addEventListener('mouseleave', resumeAutoScroll)
    scrollContainer.addEventListener('touchstart', stopAutoScroll)
    scrollContainer.addEventListener('touchend', resumeAutoScroll)

    return () => {
      clearInterval(scrollInterval)
      scrollContainer.removeEventListener('mouseenter', stopAutoScroll)
      scrollContainer.removeEventListener('mouseleave', resumeAutoScroll)
      scrollContainer.removeEventListener('touchstart', stopAutoScroll)
      scrollContainer.removeEventListener('touchend', resumeAutoScroll)
    }
  }, [])

  return (
    <section id="management" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Management Council
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our dedicated leadership team committed to educational excellence
          </p>
        </div>

        {/* Auto-scrolling Container */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate items for seamless loop */}
            {[...management, ...management].map((member, index) => (
              <div 
                key={`${member.id}-${index}`}
                className="flex-shrink-0 flex flex-col items-center text-center min-w-[200px]"
              >
                <div className="relative mb-4 group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <member.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium text-sm">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManagementCouncil 