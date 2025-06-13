import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Star, BookOpen, Users, TrendingUp, Award, Calendar, User, Heart, Eye } from 'lucide-react';

export default function RecommendationsPage() {
  const readingLists = [
    {
      id: 1,
      title: 'Essential Islamic Knowledge for Beginners',
      description: 'Perfect starting point for those new to Islamic studies',
      curator: 'Imam Abdullah Rahman',
      books: 8,
      followers: 245,
      category: 'Beginner',
      color: 'bg-green-100 text-green-800',
      featured: true
    },
    {
      id: 2,
      title: 'Advanced Fiqh and Jurisprudence',
      description: 'In-depth study of Islamic law and legal principles',
      curator: 'Dr. Sarah Ahmed',
      books: 12,
      followers: 156,
      category: 'Advanced',
      color: 'bg-blue-100 text-blue-800',
      featured: true
    },
    {
      id: 3,
      title: 'Islamic History and Civilization',
      description: 'Comprehensive journey through Islamic heritage',
      curator: 'Prof. Yusuf Ibrahim',
      books: 15,
      followers: 189,
      category: 'History',
      color: 'bg-purple-100 text-purple-800',
      featured: true
    },
    {
      id: 4,
      title: 'Contemporary Muslim Challenges',
      description: 'Modern issues facing the Muslim community',
      curator: 'Ustadh Omar Ali',
      books: 10,
      followers: 134,
      category: 'Contemporary',
      color: 'bg-orange-100 text-orange-800',
      featured: false
    },
    {
      id: 5,
      title: 'Islamic Stories for Children',
      description: 'Engaging stories to teach Islamic values to kids',
      curator: 'Sister Aisha Khan',
      books: 20,
      followers: 298,
      category: 'Children',
      color: 'bg-pink-100 text-pink-800',
      featured: true
    },
    {
      id: 6,
      title: 'Spiritual Development and Sufism',
      description: 'Books on Islamic spirituality and inner development',
      curator: 'Sheikh Muhammad Ali',
      books: 14,
      followers: 167,
      category: 'Spirituality',
      color: 'bg-indigo-100 text-indigo-800',
      featured: false
    }
  ];

  const monthlyPicks = [
    {
      title: 'The Quran: A New Translation',
      author: 'M.A.S. Abdel Haleem',
      reason: 'Clear, contemporary English translation that maintains the beauty of the original Arabic',
      category: 'Quran & Tafsir',
      rating: 4.8,
      pickedBy: 'Library Committee'
    },
    {
      title: 'Muhammad: His Life Based on the Earliest Sources',
      author: 'Martin Lings',
      reason: 'Beautifully written biography that brings the Prophet&apos;s life to vivid detail',
      category: 'Biography',
      rating: 4.9,
      pickedBy: 'Islamic Studies Department'
    },
    {
      title: 'No god but God',
      author: 'Reza Aslan',
      reason: 'Accessible introduction to Islam for modern readers',
      category: 'Contemporary Issues',
      rating: 4.6,
      pickedBy: 'Student Committee'
    }
  ];

  const popularBooks = [
    {
      title: 'The Sealed Nectar',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      category: 'Biography',
      borrowCount: 156,
      rating: 4.9,
      trend: 'up'
    },
    {
      title: 'Fortress of the Muslim',
      author: 'Said bin Ali bin Wahf Al-Qahtani',
      category: 'Duas & Supplications',
      borrowCount: 142,
      rating: 4.7,
      trend: 'up'
    },
    {
      title: 'The Ideal Muslim',
      author: 'Muhammad Ali al-Hashimi',
      category: 'Character Building',
      borrowCount: 128,
      rating: 4.6,
      trend: 'stable'
    },
    {
      title: 'Stories of the Prophets',
      author: 'Ibn Kathir',
      category: 'Biography',
      borrowCount: 134,
      rating: 4.8,
      trend: 'up'
    }
  ];

  const ageGroupRecommendations = [
    {
      ageGroup: 'Children (5-12)',
      icon: '👶',
      books: [
        'My First Quran Storybook',
        'Islamic Stories for Little Hearts',
        'The Prophets for Kids Series',
        'Islamic Values Coloring Book'
      ]
    },
    {
      ageGroup: 'Teenagers (13-18)',
      icon: '🧑',
      books: [
        'Islam: A Short History',
        'The Muslim Next Door',
        'Islamic Ethics for Youth',
        'Contemporary Muslim Issues'
      ]
    },
    {
      ageGroup: 'Adults (18+)',
      icon: '👨',
      books: [
        'The Study Quran',
        'Islamic Jurisprudence',
        'The Cambridge History of Islam',
        'Islamic Finance Principles'
      ]
    },
    {
      ageGroup: 'Scholars & Students',
      icon: '🎓',
      books: [
        'Tafsir al-Tabari',
        'Al-Muwatta of Imam Malik',
        'Islamic Legal Theory',
        'Classical Islamic Philosophy'
      ]
    }
  ];

  const seasonalRecommendations = [
    {
      season: 'Ramadan Reading',
      description: 'Spiritual books perfect for the holy month',
      books: ['The Night of Power', 'Ramadan Reflections', 'Fasting and Spirituality'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      season: 'Hajj Preparation',
      description: 'Essential guides for pilgrimage',
      books: ['Hajj Step by Step', 'The Spiritual Journey', 'Mecca and Medina Guide'],
      color: 'bg-green-50 border-green-200'
    },
    {
      season: 'New Muslim Resources',
      description: 'Perfect for those new to Islam',
      books: ['Islam Explained', 'New Muslim Guide', 'Basic Islamic Beliefs'],
      color: 'bg-blue-50 border-blue-200'
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
                  <Star className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Book Recommendations
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover curated reading lists, expert recommendations, and popular books 
                to guide your Islamic learning journey.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Star className="h-6 w-6 mr-2" />
                  <span>Expert Curated</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  <span>Community Favorites</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Reading Lists */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Reading Lists
              </h2>
              <p className="text-lg text-gray-600">
                Carefully curated collections by our scholars and educators
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {readingLists.filter(list => list.featured).map((list) => (
                <div key={list.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${list.color}`}>
                      {list.category}
                    </span>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {list.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {list.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {list.curator}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {list.books} books
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {list.followers}
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                    View Reading List
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Monthly Picks */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                This Month's Picks
              </h2>
              <p className="text-lg text-gray-600">
                Specially selected books recommended by our experts
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {monthlyPicks.map((pick, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-purple-600 mr-2" />
                    <span className="text-purple-600 font-medium text-sm">Monthly Pick</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {pick.title}
                  </h3>
                  
                  <p className="text-purple-600 font-medium mb-3">
                    By {pick.author}
                  </p>
                  
                  <p className="text-gray-700 mb-4 text-sm">
                    "{pick.reason}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{pick.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Picked by {pick.pickedBy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Books */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Popular Books
              </h2>
              <p className="text-lg text-gray-600">
                Books that our community loves most
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">Rank</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Book Title</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Author</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Category</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Borrows</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Rating</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {popularBooks.map((book, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl font-bold text-purple-600">
                              #{index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {book.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                          {book.borrowCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{book.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <TrendingUp className={`h-4 w-4 mx-auto ${
                            book.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                          }`} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Age Group Recommendations */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recommendations by Age Group
              </h2>
              <p className="text-lg text-gray-600">
                Find the perfect books for every stage of learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ageGroupRecommendations.map((group, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{group.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {group.ageGroup}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {group.books.map((book, bookIndex) => (
                      <li key={bookIndex} className="text-sm text-gray-700 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-600 flex-shrink-0" />
                        {book}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    View All
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Recommendations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Seasonal Recommendations
              </h2>
              <p className="text-lg text-gray-600">
                Books for special occasions and seasons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seasonalRecommendations.map((season, index) => (
                <div key={index} className={`rounded-lg border-2 p-6 ${season.color}`}>
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-purple-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {season.season}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {season.description}
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    {season.books.map((book, bookIndex) => (
                      <li key={bookIndex} className="text-sm text-gray-700 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-purple-600 flex-shrink-0" />
                        {book}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    Explore Collection
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Reading Lists */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              All Reading Lists
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readingLists.map((list) => (
                <div key={list.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${list.color}`}>
                      {list.category}
                    </span>
                    {list.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {list.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {list.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {list.curator}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {list.books}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {list.followers}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Create Your Own Reading List
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Share your favorite Islamic books with the community and help others 
              discover meaningful literature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Submit Reading List
              </Link>
              <Link
                href="/library/catalog"
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Browse All Books
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
