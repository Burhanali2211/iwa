'use client';

import { Heart, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const CommunitySection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Spiritual Growth',
      description: 'Join a community dedicated to deepening Islamic knowledge and faith'
    },
    {
      icon: CheckCircle,
      title: 'Educational Excellence',
      description: 'Access world-class Islamic education and modern academic programs'
    },
    {
      icon: CheckCircle,
      title: 'Community Support',
      description: 'Connect with like-minded families and build lasting friendships'
    },
    {
      icon: CheckCircle,
      title: 'Cultural Heritage',
      description: 'Preserve and celebrate Islamic traditions and values together'
    }
  ];

  const testimonials = [
    {
      name: 'Fatima Al-Zahra',
      role: 'Parent & Community Member',
      quote: 'This institution has been a blessing for our family. The quality of education and spiritual guidance is exceptional.',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Alumni & Teacher',
      quote: 'From student to teacher, this place has shaped my entire journey. The community here is truly special.',
      rating: 5
    }
  ];

  return (
    <section className="hero-padding bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 islamic-pattern-3 opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-8 shadow-2xl backdrop-blur-sm">
            <Heart className="h-12 w-12 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-shadow-lg">
            Be Part of Our Growing Community
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-4xl mx-auto leading-relaxed font-medium">
            Join thousands of students, families, and community members who have made our institution
            their spiritual home and center for Islamic learning and growth.
          </p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">1,250+</div>
              <div className="text-sm opacity-90">Active Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Families</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-90">Years Serving</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">850+</div>
              <div className="text-sm opacity-90">Graduates</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/20 p-3 rounded-full inline-flex mb-4">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-3">{benefit.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/95 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <div className="font-bold text-white">{testimonial.name}</div>
                <div className="text-white/80 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/school/admissions"
              className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center"
            >
              Join Our School
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-white/80 text-sm mt-6">
            Ready to begin your journey? We're here to welcome you with open arms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
