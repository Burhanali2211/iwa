import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FileText, Calendar, User, Download, Search, Eye, Clock, BookOpen } from 'lucide-react';

export default function KhutbaPage() {
  const recentKhutbas = [
    {
      id: 1,
      title: 'The Importance of Gratitude in Islam',
      imam: 'Imam Abdullah Rahman',
      date: '2025-01-12',
      summary: 'This Friday\'s Khutba focused on the concept of Shukr (gratitude) in Islam. The Imam discussed how gratitude is not just a feeling but an action that transforms our relationship with Allah and improves our daily lives.',
      keyPoints: [
        'Gratitude as worship and remembrance of Allah',
        'The connection between gratitude and increased blessings',
        'Practical ways to express gratitude in daily life',
        'Stories from the Quran about grateful servants of Allah'
      ],
      verses: [
        'And [remember] when your Lord proclaimed, "If you are grateful, I will certainly give you more." (Quran 14:7)',
        'And it is He who created the heavens and earth in truth. And the day He says, "Be," and it is, His word is the truth. (Quran 6:73)'
      ],
      downloads: 245,
      views: 1250
    },
    {
      id: 2,
      title: 'Building Strong Family Bonds',
      imam: 'Dr. Sarah Ahmed',
      date: '2025-01-05',
      summary: 'The Khutba emphasized the importance of family relationships in Islam and how to strengthen bonds between parents, children, and extended family members according to Islamic teachings.',
      keyPoints: [
        'Rights and responsibilities within the family',
        'Respect for parents as a path to Paradise',
        'Raising children with Islamic values',
        'Maintaining ties with relatives (Silat al-Rahim)'
      ],
      verses: [
        'Your Lord has decreed that you worship none but Him, and be kind to parents. (Quran 17:23)',
        'And those who join that which Allah has ordered to be joined and fear their Lord... (Quran 13:21)'
      ],
      downloads: 189,
      views: 890
    },
    {
      id: 3,
      title: 'Seeking Knowledge: A Muslim\'s Duty',
      imam: 'Ustadh Omar Ali',
      date: '2023-12-29',
      summary: 'This Khutba highlighted the Islamic emphasis on seeking knowledge throughout one\'s life, discussing both religious and worldly knowledge as means of drawing closer to Allah.',
      keyPoints: [
        'The first revelation and its emphasis on reading',
        'Different types of beneficial knowledge in Islam',
        'The etiquette of seeking and sharing knowledge',
        'Knowledge as a means of increasing faith'
      ],
      verses: [
        'Read in the name of your Lord who created. (Quran 96:1)',
        'And say, "My Lord, increase me in knowledge." (Quran 20:114)'
      ],
      downloads: 167,
      views: 756
    },
    {
      id: 4,
      title: 'Patience in Times of Trial',
      imam: 'Imam Abdullah Rahman',
      date: '2023-12-22',
      summary: 'The Khutba addressed how Muslims should respond to difficulties and challenges with patience (Sabr), drawing lessons from the Quran and Prophetic traditions.',
      keyPoints: [
        'Different types of patience in Islamic teachings',
        'The reward for those who are patient',
        'Practical strategies for developing patience',
        'Examples of patience from the Prophets'
      ],
      verses: [
        'And give good tidings to the patient. (Quran 2:155)',
        'Indeed, the patient will be given their reward without account. (Quran 39:10)'
      ],
      downloads: 203,
      views: 1100
    }
  ];

  const khutbaTopics = [
    'Faith & Worship', 'Family & Relationships', 'Social Justice', 'Character Building',
    'Quran & Hadith', 'Islamic History', 'Contemporary Issues', 'Spiritual Development'
  ];

  const monthlyStats = {
    totalKhutbas: 52,
    totalDownloads: 2840,
    totalViews: 15600,
    averageRating: 4.8
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <FileText className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Khutba Summaries
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Access comprehensive summaries of our Friday sermons, complete with key points, 
                Quranic verses, and practical lessons for daily life.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  <span>Weekly Summaries</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-6 w-6 mr-2" />
                  <span>PDF Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {monthlyStats.totalKhutbas}
                </div>
                <div className="text-gray-600">Total Khutbas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {monthlyStats.totalViews.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Views</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {monthlyStats.totalDownloads.toLocaleString()}
                </div>
                <div className="text-gray-600">Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {monthlyStats.averageRating}★
                </div>
                <div className="text-gray-600">Average Rating</div>
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
                    placeholder="Search khutba topics, dates, or imams..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option>All Topics</option>
                  {khutbaTopics.map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                  ))}
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option>Sort by Date</option>
                  <option>Sort by Views</option>
                  <option>Sort by Downloads</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Khutbas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Friday Khutbas
              </h2>
              <p className="text-lg text-gray-600">
                Latest sermon summaries with key teachings and reflections
              </p>
            </div>

            <div className="space-y-8">
              {recentKhutbas.map((khutba) => (
                <article key={khutba.id} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {khutba.title}
                      </h3>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {khutba.imam}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(khutba.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          {khutba.views} views
                        </div>
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          {khutba.downloads} downloads
                        </div>
                      </div>
                    </div>
                    
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </button>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Summary</h4>
                    <p className="text-gray-700 mb-6">{khutba.summary}</p>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h4>
                    <ul className="list-disc list-inside space-y-2 mb-6">
                      {khutba.keyPoints.map((point, index) => (
                        <li key={index} className="text-gray-700">{point}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Referenced Verses</h4>
                    <div className="space-y-3">
                      {khutba.verses.map((verse, index) => (
                        <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 italic text-gray-700 bg-indigo-50 p-3 rounded-r-lg">
                          "{verse}"
                        </blockquote>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                        Share
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                        Save for Later
                      </button>
                    </div>
                    
                    <Link
                      href={`/religious/khutba/${khutba.id}`}
                      className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Read Full Details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Load More Khutbas
              </button>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Browse by Topic
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {khutbaTopics.map((topic, index) => (
                <button
                  key={index}
                  className="bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg p-4 text-center transition-colors group"
                >
                  <BookOpen className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 mx-auto mb-2" />
                  <span className="text-gray-700 group-hover:text-indigo-600 font-medium">
                    {topic}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Never Miss a Khutba
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to receive weekly Khutba summaries and key Islamic teachings 
              directly in your inbox every Friday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
