import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Play, Download, Calendar, Clock, Eye, Search, Filter, Archive } from 'lucide-react';

export default function MediaArchivePage() {
  const mediaCategories = [
    { name: 'All Media', count: 156, active: true },
    { name: 'Khutba', count: 52, active: false },
    { name: 'Lectures', count: 38, active: false },
    { name: 'Quran Recitation', count: 24, active: false },
    { name: 'Youth Programs', count: 18, active: false },
    { name: 'Special Events', count: 24, active: false }
  ];

  const featuredMedia = [
    {
      id: 1,
      title: 'The Importance of Prayer in Daily Life',
      speaker: 'Imam Abdullah Rahman',
      category: 'Khutba',
      duration: '45:30',
      date: '2025-01-12',
      views: 1250,
      description: 'A comprehensive discussion on maintaining regular prayers and their spiritual benefits',
      thumbnail: '/api/placeholder/400/225'
    },
    {
      id: 2,
      title: 'Islamic History: The Golden Age',
      speaker: 'Dr. Sarah Ahmed',
      category: 'Lectures',
      duration: '1:15:20',
      date: '2025-01-10',
      views: 890,
      description: 'Exploring the scientific and cultural achievements during the Islamic Golden Age',
      thumbnail: '/api/placeholder/400/225'
    },
    {
      id: 3,
      title: 'Beautiful Quran Recitation - Surah Al-Fatiha',
      speaker: 'Qari Muhammad Hassan',
      category: 'Quran Recitation',
      duration: '12:45',
      date: '2025-01-08',
      views: 2100,
      description: 'Melodious recitation of the opening chapter of the Holy Quran',
      thumbnail: '/api/placeholder/400/225'
    }
  ];

  const recentMedia = [
    {
      title: 'Youth and Modern Challenges',
      speaker: 'Ustadh Omar Ali',
      category: 'Youth Programs',
      duration: '38:15',
      date: '2025-01-15',
      views: 456
    },
    {
      title: 'The Pillars of Islam Explained',
      speaker: 'Imam Abdullah Rahman',
      category: 'Lectures',
      duration: '52:30',
      date: '2025-01-14',
      views: 678
    },
    {
      title: 'Community Service in Islam',
      speaker: 'Sister Fatima Khan',
      category: 'Khutba',
      duration: '41:20',
      date: '2025-01-13',
      views: 523
    },
    {
      title: 'Ramadan Preparation Guide',
      speaker: 'Dr. Ahmed Malik',
      category: 'Special Events',
      duration: '29:45',
      date: '2025-01-11',
      views: 892
    },
    {
      title: 'Surah Al-Baqarah Recitation',
      speaker: 'Qari Muhammad Hassan',
      category: 'Quran Recitation',
      duration: '2:45:30',
      date: '2025-01-09',
      views: 1340
    },
    {
      title: 'Islamic Ethics in Business',
      speaker: 'Prof. Yusuf Ibrahim',
      category: 'Lectures',
      duration: '1:08:15',
      date: '2025-01-07',
      views: 734
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Archive className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Religious Media Archive
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Access our extensive collection of recorded lectures, sermons, Quran recitations, 
                and educational content to deepen your Islamic knowledge.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Play className="h-6 w-6 mr-2" />
                  <span>150+ Videos</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-6 w-6 mr-2" />
                  <span>Download Available</span>
                </div>
              </div>
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
                    placeholder="Search lectures, speakers, topics..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>Sort by Date</option>
                  <option>Sort by Views</option>
                  <option>Sort by Duration</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {mediaCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category.active
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Media */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Content
              </h2>
              <p className="text-lg text-gray-600">
                Most popular and recently added religious content
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredMedia.map((media) => (
                <div key={media.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                  <div className="relative">
                    <div className="bg-gray-800 aspect-video flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="h-12 w-12 mx-auto mb-2 opacity-75 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm">Click to Play</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {media.duration}
                    </div>
                    
                    <div className="absolute top-2 left-2">
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {media.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {media.title}
                    </h3>
                    
                    <p className="text-sm text-purple-600 font-medium mb-2">
                      {media.speaker}
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {media.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(media.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {media.views.toLocaleString()} views
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </button>
                      <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Media List */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recent Additions
            </h2>

            <div className="space-y-4">
              {recentMedia.map((media, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 rounded-lg p-3">
                          <Play className="h-6 w-6 text-purple-600" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {media.title}
                          </h3>
                          <p className="text-sm text-purple-600 font-medium mb-1">
                            {media.speaker}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                              {media.category}
                            </span>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {media.duration}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(media.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {media.views} views
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Load More Content
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expand Your Islamic Knowledge
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our media archive is constantly growing with new content. 
              Subscribe to get notified when new lectures and programs are added.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Subscribe for Updates
              </Link>
              <Link
                href="/religious/live"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Watch Live Streams
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
