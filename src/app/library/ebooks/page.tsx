import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Download, BookOpen, Search, Filter, Star, Eye, Calendar, FileText, Smartphone, Tablet, Monitor } from 'lucide-react';

export default function EBooksPage() {
  const categories = [
    { name: 'All E-Books', count: 1200, active: true },
    { name: 'Quran & Tafsir', count: 180, active: false },
    { name: 'Hadith Collections', count: 120, active: false },
    { name: 'Islamic History', count: 150, active: false },
    { name: 'Fiqh & Jurisprudence', count: 200, active: false },
    { name: 'Biography & Seerah', count: 90, active: false },
    { name: 'Contemporary Issues', count: 80, active: false },
    { name: 'Children\'s E-Books', count: 160, active: false },
    { name: 'Academic Resources', count: 220, active: false }
  ];

  const featuredEBooks = [
    {
      id: 1,
      title: 'The Noble Quran - English Translation',
      author: 'Dr. Muhammad Taqi-ud-Din Al-Hilali & Dr. Muhammad Muhsin Khan',
      category: 'Quran & Tafsir',
      fileSize: '15.2 MB',
      format: 'PDF, EPUB, MOBI',
      pages: 1056,
      language: 'English/Arabic',
      rating: 4.9,
      downloads: 15420,
      publishDate: '2023-12-15',
      description: 'Complete English translation of the Holy Quran with Arabic text, widely accepted and used worldwide.',
      featured: true,
      free: true
    },
    {
      id: 2,
      title: 'Sahih Al-Bukhari - Complete Collection',
      author: 'Imam Muhammad ibn Ismail al-Bukhari',
      category: 'Hadith Collections',
      fileSize: '45.8 MB',
      format: 'PDF, EPUB',
      pages: 2400,
      language: 'English/Arabic',
      rating: 4.8,
      downloads: 8930,
      publishDate: '2023-11-20',
      description: 'The most authentic collection of Prophetic traditions, essential for Islamic scholarship.',
      featured: true,
      free: true
    },
    {
      id: 3,
      title: 'Islamic Finance in the Modern World',
      author: 'Dr. Abdullah Saeed',
      category: 'Contemporary Issues',
      fileSize: '8.5 MB',
      format: 'PDF, EPUB',
      pages: 320,
      language: 'English',
      rating: 4.6,
      downloads: 3240,
      publishDate: '2025-01-10',
      description: 'Comprehensive guide to Islamic banking and finance principles in contemporary practice.',
      featured: true,
      free: false
    },
    {
      id: 4,
      title: 'Stories from the Quran for Children',
      author: 'Saniyasnain Khan',
      category: 'Children\'s E-Books',
      fileSize: '25.3 MB',
      format: 'PDF (Illustrated)',
      pages: 128,
      language: 'English',
      rating: 4.7,
      downloads: 5670,
      publishDate: '2023-10-05',
      description: 'Beautifully illustrated stories from the Quran designed for young readers.',
      featured: true,
      free: true
    }
  ];

  const recentEBooks = [
    {
      title: 'The Fundamentals of Islamic Jurisprudence',
      author: 'Dr. Ahmad Hassan',
      category: 'Fiqh & Jurisprudence',
      fileSize: '12.4 MB',
      format: 'PDF, EPUB',
      rating: 4.5,
      downloads: 1890,
      publishDate: '2025-01-12'
    },
    {
      title: 'Women in Islamic History',
      author: 'Dr. Fatima Mernissi',
      category: 'Islamic History',
      fileSize: '9.8 MB',
      format: 'PDF, EPUB',
      rating: 4.4,
      downloads: 2340,
      publishDate: '2025-01-08'
    },
    {
      title: 'Islamic Ethics and Moral Values',
      author: 'Prof. Yusuf Al-Qaradawi',
      category: 'Contemporary Issues',
      fileSize: '7.2 MB',
      format: 'PDF, EPUB, MOBI',
      rating: 4.6,
      downloads: 1560,
      publishDate: '2025-01-05'
    },
    {
      title: 'The Life of Prophet Muhammad (PBUH)',
      author: 'Martin Lings',
      category: 'Biography & Seerah',
      fileSize: '18.7 MB',
      format: 'PDF, EPUB',
      rating: 4.8,
      downloads: 4230,
      publishDate: '2023-12-28'
    }
  ];

  const deviceCompatibility = [
    { device: 'Smartphones', icon: Smartphone, formats: 'EPUB, MOBI, PDF' },
    { device: 'Tablets', icon: Tablet, formats: 'PDF, EPUB' },
    { device: 'Computers', icon: Monitor, formats: 'All Formats' },
    { device: 'E-Readers', icon: BookOpen, formats: 'EPUB, MOBI' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Download className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Digital E-Books Library
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Access our extensive collection of Islamic e-books, downloadable in multiple formats. 
                Read on any device, anywhere, anytime.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Download className="h-6 w-6 mr-2" />
                  <span>1,200+ E-Books</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  <span>Multiple Formats</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search e-books by title, author, or subject..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option>All Categories</option>
                    {categories.slice(1).map((cat, index) => (
                      <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option>All Formats</option>
                    <option>PDF</option>
                    <option>EPUB</option>
                    <option>MOBI</option>
                  </select>
                  
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category, index) => (
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

        {/* Featured E-Books */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured E-Books
              </h2>
              <p className="text-lg text-gray-600">
                Popular and recommended digital Islamic literature
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredEBooks.map((ebook) => (
                <div key={ebook.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center mb-6">
                    <div className="bg-green-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-green-600" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {ebook.category}
                      </span>
                      {ebook.free && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {ebook.title}
                  </h3>
                  
                  <p className="text-green-600 font-medium mb-2 text-sm">
                    By {ebook.author}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {ebook.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">{ebook.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span className="font-medium">{ebook.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pages:</span>
                      <span className="font-medium">{ebook.pages}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{ebook.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Download className="h-4 w-4 mr-1" />
                      {ebook.downloads.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button className="border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Read on Any Device
              </h2>
              <p className="text-lg text-gray-600">
                Our e-books are compatible with all major devices and platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deviceCompatibility.map((device, index) => (
                <div key={index} className="text-center">
                  <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <device.icon className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {device.device}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {device.formats}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Additions */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent Additions
              </h2>
              <Link
                href="/library/catalog"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentEBooks.map((ebook, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {ebook.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Added {new Date(ebook.publishDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {ebook.title}
                    </h3>
                    
                    <p className="text-green-600 font-medium text-sm mb-2">
                      By {ebook.author}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-3">
                        <span>{ebook.format}</span>
                        <span>•</span>
                        <span>{ebook.fileSize}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span>{ebook.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          <span>{ebook.downloads}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Instructions */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-green-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How to Download & Read E-Books
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Download Instructions</h3>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li>1. Click the "Download" button on any e-book</li>
                    <li>2. Choose your preferred format (PDF, EPUB, MOBI)</li>
                    <li>3. Sign in with your library account</li>
                    <li>4. Download will start automatically</li>
                    <li>5. Open with your preferred reading app</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Recommended Apps</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>PDF:</strong> Adobe Reader, Foxit Reader</li>
                    <li>• <strong>EPUB:</strong> Apple Books, Google Play Books</li>
                    <li>• <strong>MOBI:</strong> Kindle App, Calibre</li>
                    <li>• <strong>All Formats:</strong> Moon+ Reader, FBReader</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Need help with downloads or reading apps?
                </p>
                <Link
                  href="/contact"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Contact Library Support
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Digital Reading Journey
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our vast collection of Islamic e-books and enhance your knowledge 
              with convenient digital reading on any device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/library/catalog"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Browse Full Catalog
              </Link>
              <Link
                href="/library/recommendations"
                className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
              >
                Get Recommendations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
