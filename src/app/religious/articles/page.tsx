import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Calendar, User, Eye, Search, Tag, ArrowRight, Clock } from 'lucide-react';

export default function ArticlesPage() {
  const articleCategories = [
    { name: 'All Articles', count: 89, active: true },
    { name: 'Islamic Teachings', count: 25, active: false },
    { name: 'Quran & Hadith', count: 18, active: false },
    { name: 'Islamic History', count: 15, active: false },
    { name: 'Contemporary Issues', count: 12, active: false },
    { name: 'Youth & Family', count: 10, active: false },
    { name: 'Spirituality', count: 9, active: false }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'Understanding the Five Pillars of Islam in Modern Context',
      excerpt: 'A comprehensive guide to practicing the fundamental pillars of Islam in contemporary society, addressing common challenges and providing practical solutions.',
      author: 'Dr. Ahmed Hassan',
      category: 'Islamic Teachings',
      publishDate: '2025-01-15',
      readTime: '8 min read',
      views: 1250,
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'The Role of Women in Early Islamic Civilization',
      excerpt: 'Exploring the significant contributions of women in the development of Islamic society, from scholars to leaders who shaped history.',
      author: 'Prof. Fatima Al-Zahra',
      category: 'Islamic History',
      publishDate: '2025-01-12',
      readTime: '12 min read',
      views: 890,
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Balancing Faith and Technology: A Muslim Perspective',
      excerpt: 'How modern Muslims can navigate the digital age while maintaining their spiritual values and religious obligations.',
      author: 'Ustadh Omar Ali',
      category: 'Contemporary Issues',
      publishDate: '2025-01-10',
      readTime: '6 min read',
      views: 1450,
      featured: true,
      image: '/api/placeholder/400/250'
    }
  ];

  const recentArticles = [
    {
      title: 'The Importance of Seeking Knowledge in Islam',
      author: 'Dr. Sarah Ahmed',
      category: 'Islamic Teachings',
      publishDate: '2025-01-14',
      readTime: '5 min read',
      views: 567
    },
    {
      title: 'Understanding Quranic Parables and Their Lessons',
      author: 'Imam Abdullah Rahman',
      category: 'Quran & Hadith',
      publishDate: '2025-01-13',
      readTime: '10 min read',
      views: 723
    },
    {
      title: 'Raising Children with Islamic Values',
      author: 'Sister Aisha Khan',
      category: 'Youth & Family',
      publishDate: '2025-01-11',
      readTime: '7 min read',
      views: 892
    },
    {
      title: 'The Golden Age of Islamic Science',
      author: 'Prof. Yusuf Ibrahim',
      category: 'Islamic History',
      publishDate: '2025-01-09',
      readTime: '15 min read',
      views: 634
    },
    {
      title: 'Finding Inner Peace Through Prayer',
      author: 'Ustadh Muhammad Ali',
      category: 'Spirituality',
      publishDate: '2025-01-08',
      readTime: '6 min read',
      views: 1120
    },
    {
      title: 'Islamic Ethics in Business and Commerce',
      author: 'Dr. Hassan Malik',
      category: 'Contemporary Issues',
      publishDate: '2025-01-07',
      readTime: '9 min read',
      views: 445
    }
  ];

  const popularTags = [
    'Prayer', 'Quran', 'Hadith', 'Ramadan', 'Hajj', 'Islamic History', 
    'Youth', 'Family', 'Education', 'Spirituality', 'Community', 'Ethics'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <BookOpen className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Islamic Articles & Blogs
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Deepen your understanding of Islam through our collection of scholarly articles, 
                contemporary insights, and spiritual guidance from renowned Islamic scholars.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2" />
                  <span>80+ Articles</span>
                </div>
                <div className="flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  <span>Expert Authors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, authors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {articleCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category.active
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-lg text-gray-600">
                Our most popular and recently published content
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      
                      <Link
                        href={`/religious/articles/${article.id}`}
                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Recent Articles
            </h2>

            <div className="space-y-6">
              {recentArticles.map((article, index) => (
                <article key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(article.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          {article.views} views
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-1" />
                        By {article.author}
                      </div>
                    </div>
                    
                    <Link
                      href={`/religious/articles/${index + 4}`}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center ml-4"
                    >
                      Read
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Popular Topics
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {popularTags.map((tag, index) => (
                <button
                  key={index}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Islamic Knowledge
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest articles, insights, 
              and scholarly content directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Subscribe to Newsletter
              </Link>
              <Link
                href="/religious/ask-aalim"
                className="border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
              >
                Ask a Scholar
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
