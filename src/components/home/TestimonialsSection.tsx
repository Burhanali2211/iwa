'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Fatima Al-Zahra",
    role: "Parent & Community Member",
    content: "This institution has been a blessing for our family. The quality of education and spiritual guidance is exceptional.",
    rating: 5,
    image: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    role: "Alumni & Teacher",
    content: "From student to teacher, this place has shaped my entire journey. The community here is truly special.",
    rating: 5,
    image: "/api/placeholder/60/60"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] islamic-pattern-1"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10 blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from families and students who have made our institution their spiritual home
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-green-200/50 hover:-translate-y-2"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join Our School
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-white hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Us
            </button>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Ready to begin your journey? We're here to welcome you with open arms.
          </p>
        </div>
      </div>
    </section>
  );
}
