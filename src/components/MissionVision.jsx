import React from 'react'
import { Target, Eye, Lightbulb, Heart, Users } from 'lucide-react'

const MissionVision = () => {
  return (
    <section id="mission" className="py-20 bg-gradient-to-br from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Guiding principles that shape our educational approach
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-background rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-primary mr-4" />
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To provide world-class education that nurtures intellectual curiosity, fosters critical thinking, 
              and develops well-rounded individuals who are prepared to become future leaders and innovators 
              in Uzbekistan and beyond.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-primary mr-4" />
              <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the leading educational institution in Central Asia, recognized for academic excellence, 
              innovation, and producing graduates who make significant contributions to society while 
              upholding the values of integrity, compassion, and lifelong learning.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Core Values
          </h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Innovation</h4>
              <p className="text-muted-foreground">
                Embracing new ideas and creative solutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Integrity</h4>
              <p className="text-muted-foreground">
                Upholding honesty and ethical principles
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Excellence</h4>
              <p className="text-muted-foreground">
                Striving for the highest standards in everything
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Community</h4>
              <p className="text-muted-foreground">
                Fostering collaboration and mutual respect
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVision 