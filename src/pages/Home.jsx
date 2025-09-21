import React from 'react'
import Hero from '@/components/Hero'
import MissionVision from '@/components/MissionVision'
import ManagementCouncil from '@/components/ManagementCouncil'
import TimetableSelection from '@/components/TimetableSelection'

const Home = () => {
  return (
    <div className="scroll-smooth">
      <section id="home">
        <Hero />
      </section>
      <section id="mission">
        <MissionVision />
      </section>
      <section id="management">
        <ManagementCouncil />
      </section>
      <section id="timetable">
        <TimetableSelection />
      </section>
    </div>
  )
}

export default Home 