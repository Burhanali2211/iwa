import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Star, ArrowRight } from 'lucide-react';

export default function ReligiousEventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Friday Jummah Prayer',
      date: 'Every Friday',
      time: '1:30 PM - 2:30 PM',
      location: 'Main Prayer Hall',
      description: 'Weekly congregational prayer with inspiring Khutba (sermon)',
      attendees: '200+',
      category: 'Prayer',
      featured: true
    },
    {
      id: 2,
      title: 'Quran Study Circle',
      date: 'Every Saturday',
      time: '10:00 AM - 12:00 PM',
      location: 'Study Room A',
      description: 'Weekly Quran recitation, translation, and interpretation session',
      attendees: '50+',
      category: 'Study',
      featured: false
    },
    {
      id: 3,
      title: 'Islamic History Lecture Series',
      date: 'First Sunday of Month',
      time: '3:00 PM - 5:00 PM',
      location: 'Conference Hall',
      description: 'Monthly lecture series exploring Islamic civilization and heritage',
      attendees: '100+',
      category: 'Education',
      featured: true
    },
    {
      id: 4,
      title: 'Youth Islamic Discussion',
      date: 'Every Thursday',
      time: '7:00 PM - 8:30 PM',
      location: 'Youth Center',
      description: 'Interactive discussions on contemporary Islamic topics for youth',
      attendees: '30+',
      category: 'Youth',
      featured: false
    },
    {
      id: 5,
      title: 'Ramadan Iftar Community Dinner',
      date: 'During Ramadan',
      time: 'Sunset Time',
      location: 'Community Hall',
      description: 'Daily community Iftar during the holy month of Ramadan',
      attendees: '300+',
      category: 'Community',
      featured: true
    },
    {
      id: 6,
      title: 'Eid Celebration',
      date: 'Eid ul-Fitr & Eid ul-Adha',
      time: '8:00 AM - 12:00 PM',
      location: 'Main Campus',
      description: 'Grand Eid prayers and community celebration with festivities',
      attendees: '500+',
      category: 'Celebration',
      featured: true
    }
  ];

  const eventCategories = [
    { name: 'All Events', count: upcomingEvents.length, active: true },
    { name: 'Prayer', count: upcomingEvents.filter(e => e.category === 'Prayer').length, active: false },
    { name: 'Study', count: upcomingEvents.filter(e => e.category === 'Study').length, active: false },
    { name: 'Education', count: upcomingEvents.filter(e => e.category === 'Education').length, active: false },
    { name: 'Youth', count: upcomingEvents.filter(e => e.category === 'Youth').length, active: false },
    { name: 'Community', count: upcomingEvents.filter(e => e.category === 'Community').length, active: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Religious Events & Majlis
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Join our spiritual gatherings, educational programs, and community events 
                designed to strengthen faith and build lasting connections.
              </p>
              <Link
                href="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Contact for Event Info
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {eventCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category.active
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Events
              </h2>
              <p className="text-lg text-gray-600">
                Don't miss these special religious gatherings and programs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {upcomingEvents.filter(event => event.featured).map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {event.category}
                      </span>
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} Expected Attendees
                      </div>
                    </div>
                    
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Events */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              All Religious Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                    {event.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Connected with Our Events
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Never miss an important religious event. Contact us to get regular updates 
              about our programs and special occasions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get Event Updates
              </Link>
              <Link
                href="/religious"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
              >
                Explore More Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
