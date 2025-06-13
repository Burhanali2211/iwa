import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, ArrowRight, Star } from 'lucide-react';

const EventsSection = () => {
  // Sample events data - in real app, this would come from API
  const upcomingEvents = [
    {
      id: 1,
      title: "Ramadan Iftar Community Gathering",
      description: "Join us for a blessed Iftar meal and evening prayers during the holy month of Ramadan.",
      date: "2025-03-15",
      time: "6:30 PM",
      location: "Main Prayer Hall",
      category: "Religious",
      attendees: 150,
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "Islamic History Workshop",
      description: "Educational workshop covering the golden age of Islamic civilization and its contributions to science.",
      date: "2025-03-20",
      time: "2:00 PM",
      location: "Conference Room A",
      category: "Educational",
      attendees: 45,
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      id: 3,
      title: "Youth Quran Recitation Competition",
      description: "Annual competition for young Muslims to showcase their Quranic recitation skills.",
      date: "2025-03-25",
      time: "10:00 AM",
      location: "Auditorium",
      category: "Competition",
      attendees: 80,
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 4,
      title: "Community Service Day",
      description: "Volunteer opportunity to serve the local community through various charitable activities.",
      date: "2025-03-30",
      time: "9:00 AM",
      location: "Community Center",
      category: "Service",
      attendees: 120,
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Religious: 'bg-green-100 text-green-800',
      Educational: 'bg-blue-100 text-blue-800',
      Competition: 'bg-purple-100 text-purple-800',
      Service: 'bg-orange-100 text-orange-800',
      Cultural: 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="hero-padding bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full islamic-pattern-2 opacity-5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header with Better Contrast */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-8 shadow-2xl ring-4 ring-white ring-opacity-50">
            <Calendar className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 text-gradient drop-shadow-sm">
            Upcoming Events
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Stay connected with our community through various religious, educational,
            and cultural events designed to strengthen faith and knowledge in our Islamic journey.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Featured Events - Varied Layout */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              Featured Events
            </h3>
            <Link href="/events" className="text-green-600 hover:text-green-700 font-semibold flex items-center">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Hero Event */}
          {upcomingEvents.filter(event => event.featured)[0] && (
            <div className="bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 islamic-pattern-1 opacity-10"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <span className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mr-4 shadow-lg">Featured Event</span>
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {upcomingEvents.filter(event => event.featured)[0].category}
                    </span>
                  </div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-6 text-shadow-lg">{upcomingEvents.filter(event => event.featured)[0].title}</h4>
                  <p className="text-white text-lg mb-8 leading-relaxed font-medium drop-shadow-sm">{upcomingEvents.filter(event => event.featured)[0].description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center text-white/80 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">Date</span>
                      </div>
                      <div className="font-semibold">{formatDate(upcomingEvents.filter(event => event.featured)[0].date)}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center text-white/80 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">Time</span>
                      </div>
                      <div className="font-semibold">{upcomingEvents.filter(event => event.featured)[0].time}</div>
                    </div>
                  </div>

                  <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
                    Register Now
                  </button>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="h-12 w-12 text-white" />
                      </div>
                      <div className="text-2xl font-bold mb-2">{upcomingEvents.filter(event => event.featured)[0].attendees}</div>
                      <div className="text-white/80">Expected Attendees</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Featured Events with Varied Designs */}
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.filter(event => event.featured).slice(1).map((event, index) => (
              <div key={event.id} className={`bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${
                index === 0 ? 'border-purple-200 hover:border-purple-300' : 'border-green-200 hover:border-green-300'
              } hover:scale-105`}>
                <div className={`h-48 ${
                  index === 0
                    ? 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100'
                    : 'bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100'
                } flex items-center justify-center relative`}>
                  <div className="absolute inset-0 islamic-pattern-3 opacity-20"></div>
                  <Calendar className={`h-16 w-16 ${
                    index === 0 ? 'text-purple-600' : 'text-green-600'
                  } relative z-10 drop-shadow-lg`} />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h4>
                  <p className="text-gray-700 mb-6 leading-relaxed font-medium">{event.description}</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-800">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 shadow-sm">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="font-semibold text-lg">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 shadow-sm">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-lg">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4 shadow-sm">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-semibold text-lg">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <Link
                      href={`/events/${event.id}`}
                      className="text-green-600 hover:text-green-700 font-bold flex items-center text-lg hover:scale-105 transition-all duration-300"
                    >
                      Learn More <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                    <button className={`${
                      index === 0
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
                    } text-white px-8 py-3 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105`}>
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories - Interactive Grid */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Browse Events by Category</h3>
            <p className="text-xl text-gray-700 font-medium">Discover events that match your interests and spiritual journey</p>
            <div className="mt-6 flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Religious', 'Educational', 'Competition', 'Service', 'Cultural'].map((category, index) => {
              const eventCount = upcomingEvents.filter(e => e.category === category).length;
              const colors = [
                'from-green-500 to-emerald-600',
                'from-blue-500 to-indigo-600',
                'from-purple-500 to-pink-600',
                'from-orange-500 to-red-600',
                'from-teal-500 to-cyan-600'
              ];

              return (
                <Link
                  key={category}
                  href={`/events?category=${category.toLowerCase()}`}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${colors[index]} text-white p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{eventCount}</div>
                      <div className="font-semibold text-sm">{category}</div>
                      <div className="text-xs opacity-80 mt-1">Events</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Event List - Enhanced Timeline Style */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-10 shadow-xl border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">This Month's Events</h3>
          <div className="space-y-6">
            {upcomingEvents.slice(0, 4).map((event, index) => (
              <Link key={event.id} href={`/events/${event.id}`} className="block">
                <div className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500 group hover:scale-102 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="bg-green-100 rounded-xl p-4 shadow-sm">
                        <Calendar className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-xl mb-2">{event.title}</h4>
                        <div className="flex items-center space-x-4 text-base text-gray-700 font-medium">
                          <span>{formatDate(event.date)}</span>
                          <span className="text-green-500">•</span>
                          <span>{event.time}</span>
                          <span className="text-green-500">•</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/events"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              View All Events
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>


      </div>
    </section>
  );
};

export default EventsSection;
