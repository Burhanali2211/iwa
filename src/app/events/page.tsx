import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, ArrowRight } from 'lucide-react';

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Annual Islamic Conference 2025',
      date: '2025-02-15',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Auditorium',
      category: 'Conference',
      description: 'Join renowned Islamic scholars for a day of learning and spiritual growth',
      attendees: 500,
      price: 'Free',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'Youth Islamic Quiz Competition',
      date: '2025-02-20',
      time: '2:00 PM - 5:00 PM',
      location: 'School Hall',
      category: 'Competition',
      description: 'Test your Islamic knowledge in this exciting quiz competition',
      attendees: 100,
      price: '$10',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Community Iftar Dinner',
      date: '2025-03-15',
      time: '6:30 PM - 9:00 PM',
      location: 'Community Hall',
      category: 'Community',
      description: 'Break your fast with the community during Ramadan',
      attendees: 300,
      price: 'Free',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'Islamic Art Workshop',
      date: '2025-02-25',
      time: '10:00 AM - 4:00 PM',
      location: 'Art Studio',
      category: 'Workshop',
      description: 'Learn traditional Islamic calligraphy and geometric patterns',
      attendees: 50,
      price: '$25',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      title: 'Charity Fundraising Gala',
      date: '2025-03-01',
      time: '7:00 PM - 11:00 PM',
      location: 'Grand Ballroom',
      category: 'Fundraising',
      description: 'Elegant evening to support our community outreach programs',
      attendees: 200,
      price: '$50',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      title: 'Family Fun Day',
      date: '2025-02-28',
      time: '11:00 AM - 5:00 PM',
      location: 'School Grounds',
      category: 'Family',
      description: 'Games, activities, and entertainment for the whole family',
      attendees: 400,
      price: 'Free',
      featured: false,
      image: '/api/placeholder/400/250'
    }
  ];

  const eventCategories = [
    { name: 'All Events', count: upcomingEvents.length, active: true },
    { name: 'Conference', count: upcomingEvents.filter(e => e.category === 'Conference').length, active: false },
    { name: 'Workshop', count: upcomingEvents.filter(e => e.category === 'Workshop').length, active: false },
    { name: 'Community', count: upcomingEvents.filter(e => e.category === 'Community').length, active: false },
    { name: 'Competition', count: upcomingEvents.filter(e => e.category === 'Competition').length, active: false },
    { name: 'Family', count: upcomingEvents.filter(e => e.category === 'Family').length, active: false }
  ];

  const pastEvents = [
    {
      title: 'Eid ul-Fitr Celebration 2023',
      date: '2023-04-22',
      attendees: 800,
      rating: 4.9
    },
    {
      title: 'Ramadan Lecture Series',
      date: '2023-03-15',
      attendees: 150,
      rating: 4.8
    },
    {
      title: 'Islamic Heritage Exhibition',
      date: '2023-11-10',
      attendees: 300,
      rating: 4.7
    }
  ];

  const eventStats = [
    { label: 'Events This Year', value: '45+', icon: Calendar },
    { label: 'Total Attendees', value: '5,000+', icon: Users },
    { label: 'Community Programs', value: '20+', icon: Star },
    { label: 'Average Rating', value: '4.8★', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Calendar className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Community Events
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Join our vibrant community events, educational programs, and spiritual gatherings. 
                Connect with fellow Muslims and strengthen your faith together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  View Upcoming Events
                </button>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Organize Event
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Event Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {eventStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>Sort by Date</option>
                  <option>Sort by Popularity</option>
                  <option>Sort by Category</option>
                </select>
              </div>
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
                Don't miss these special upcoming events
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {upcomingEvents.filter(event => event.featured).map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-gray-400" />
                  </div>
                  
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
                        {new Date(event.date).toLocaleDateString()}
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
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        {event.price}
                      </div>
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Register Now
                      </button>
                    </div>
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
              All Upcoming Events
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
                  
                  <div className="space-y-1 text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
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
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-600">
                      {event.price}
                    </span>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Past Events Highlights
              </h2>
              <p className="text-lg text-gray-600">
                See what our community has accomplished together
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="text-gray-600 text-sm mb-3">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-green-600" />
                      {event.attendees} attendees
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {event.rating} rating
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Registration */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Register for an Event
                </h2>
                <p className="text-gray-600">
                  Sign up for upcoming events and stay connected with our community
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Event *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Choose an event</option>
                    {upcomingEvents.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {new Date(event.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements or Comments
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register for Event
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated on Community Events
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive notifications about upcoming events, 
              special programs, and community activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Subscribe to Updates
              </Link>
              <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                Propose an Event
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
