import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Video, Calendar, Clock, Users, Wifi, Play, Volume2, Settings } from 'lucide-react';

export default function LiveStreamingPage() {
  const liveStreams = [
    {
      id: 1,
      title: 'Friday Jummah Prayer',
      status: 'live',
      viewers: 245,
      startTime: '1:30 PM',
      description: 'Live broadcast of Friday congregational prayer with Khutba',
      thumbnail: '/api/placeholder/400/225'
    },
    {
      id: 2,
      title: 'Evening Maghrib Prayer',
      status: 'scheduled',
      viewers: 0,
      startTime: '6:45 PM',
      description: 'Daily evening prayer live stream',
      thumbnail: '/api/placeholder/400/225'
    }
  ];

  const upcomingStreams = [
    {
      title: 'Saturday Quran Study',
      date: 'Tomorrow',
      time: '10:00 AM',
      description: 'Weekly Quran recitation and interpretation session'
    },
    {
      title: 'Sunday Islamic History Lecture',
      date: 'This Sunday',
      time: '3:00 PM',
      description: 'Monthly lecture on Islamic civilization'
    },
    {
      title: 'Youth Discussion Forum',
      date: 'Thursday',
      time: '7:00 PM',
      description: 'Interactive discussion on contemporary Islamic topics'
    }
  ];

  const streamingSchedule = [
    { prayer: 'Fajr', time: '5:30 AM', status: 'Daily' },
    { prayer: 'Dhuhr', time: '12:30 PM', status: 'Daily' },
    { prayer: 'Asr', time: '4:00 PM', status: 'Daily' },
    { prayer: 'Maghrib', time: '6:45 PM', status: 'Daily' },
    { prayer: 'Isha', time: '8:30 PM', status: 'Daily' },
    { prayer: 'Jummah', time: '1:30 PM', status: 'Friday Only' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Video className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Live Religious Streaming
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Join our live prayers, lectures, and religious ceremonies from anywhere. 
                Stay connected with your faith community in real-time.
              </p>
              <div className="flex items-center justify-center space-x-2 text-lg">
                <Wifi className="h-6 w-6 text-green-400" />
                <span>Live Streaming Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Streams */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Current Live Streams
              </h2>
              <p className="text-lg text-gray-600">
                Watch live religious services and events happening now
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {liveStreams.map((stream) => (
                <div key={stream.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <div className="bg-gray-800 aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Live Stream Player</p>
                        <p className="text-sm opacity-75">Click to watch live</p>
                      </div>
                    </div>
                    
                    {stream.status === 'live' && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                          LIVE
                        </div>
                      </div>
                    )}
                    
                    {stream.status === 'live' && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {stream.viewers}
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black bg-opacity-50 text-white p-3 rounded-lg">
                        <h3 className="font-semibold mb-1">{stream.title}</h3>
                        <p className="text-sm opacity-90">{stream.description}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Started at {stream.startTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                          <Play className="h-4 w-4 mr-2" />
                          {stream.status === 'live' ? 'Watch Live' : 'Set Reminder'}
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <Volume2 className="h-4 w-4" />
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {stream.status === 'live' && (
                        <div className="text-sm text-gray-500">
                          {stream.viewers} watching now
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prayer Schedule */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Daily Prayer Streaming Schedule
              </h2>
              <p className="text-lg text-gray-600">
                Join us for live daily prayers throughout the day
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streamingSchedule.map((prayer, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {prayer.prayer} Prayer
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {prayer.time}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    {prayer.status}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Set Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Streams */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upcoming Live Events
              </h2>
              <p className="text-lg text-gray-600">
                Don't miss these upcoming religious programs and lectures
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingStreams.map((stream, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-600">
                      {stream.date} at {stream.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stream.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {stream.description}
                  </p>
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    Set Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Info */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Streaming Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center">
                <Video className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">HD Quality</h3>
                <p className="text-sm text-gray-600">1080p streaming for clear viewing</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Wifi className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Reliable Stream</h3>
                <p className="text-sm text-gray-600">Stable connection with backup servers</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Interactive Chat</h3>
                <p className="text-sm text-gray-600">Connect with community during streams</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Archive Access</h3>
                <p className="text-sm text-gray-600">Watch recordings anytime later</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Never Miss a Prayer or Lecture
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay connected with your faith community through our live streaming services. 
              Get notifications for upcoming events and prayers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Stream Notifications
              </Link>
              <Link
                href="/religious/media"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                View Archive
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
