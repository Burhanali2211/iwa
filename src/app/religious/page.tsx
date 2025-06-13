import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Calendar, Video, Archive, BookOpen, MessageCircle, FileText, Clock, Users, Heart } from 'lucide-react';

export default function ReligiousPage() {
  const religiousServices = [
    {
      title: 'Events & Majlis',
      description: 'Join our spiritual gatherings, lectures, and community events',
      icon: Calendar,
      href: '/religious/events',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Live Streaming',
      description: 'Watch live prayers, lectures, and religious ceremonies',
      icon: Video,
      href: '/religious/live',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Media Archive',
      description: 'Access our collection of recorded lectures and sermons',
      icon: Archive,
      href: '/religious/media',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Articles & Blogs',
      description: 'Read Islamic articles, insights, and scholarly writings',
      icon: BookOpen,
      href: '/religious/articles',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Ask Aalim',
      description: 'Get answers to your religious questions from our scholars',
      icon: MessageCircle,
      href: '/religious/ask-aalim',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      title: 'Khutba Summaries',
      description: 'Read summaries of Friday sermons and key teachings',
      icon: FileText,
      href: '/religious/khutba',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Friday Jummah Prayer',
      time: 'Every Friday 1:30 PM',
      description: 'Weekly congregational prayer with Khutba'
    },
    {
      title: 'Quran Study Circle',
      time: 'Saturdays 10:00 AM',
      description: 'Weekly Quran recitation and interpretation session'
    },
    {
      title: 'Islamic History Lecture',
      time: 'Sunday 3:00 PM',
      description: 'Monthly lecture series on Islamic civilization'
    }
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
                Religious Services & Resources
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Strengthen your faith through our comprehensive religious programs, 
                spiritual guidance, and community worship opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/religious/events"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  View Events
                </Link>
                <Link
                  href="/religious/live"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  Watch Live
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Religious Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of religious services designed to 
                support your spiritual journey and strengthen our community bonds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {religiousServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
                >
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Religious Events
              </h2>
              <p className="text-lg text-gray-600">
                Join us for regular worship and learning opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Clock className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-600">
                      {event.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Religious Community
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of our vibrant religious community. Participate in prayers, 
              learn from scholars, and grow spiritually with fellow believers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/religious/ask-aalim"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Ask a Question
              </Link>
              <Link
                href="/contact"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
