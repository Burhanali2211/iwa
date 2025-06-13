import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Search, Filter, Star, Download, Eye, Calendar, User } from 'lucide-react';

export default function CatalogPage() {
  const categories = [
    { name: 'All Books', count: 5000, active: true },
    { name: 'Quran & Tafsir', count: 450, active: false },
    { name: 'Hadith', count: 320, active: false },
    { name: 'Islamic History', count: 280, active: false },
    { name: 'Fiqh & Jurisprudence', count: 380, active: false },
    { name: 'Biography', count: 220, active: false },
    { name: 'Contemporary Issues', count: 180, active: false },
    { name: 'Children\'s Books', count: 350, active: false },
    { name: 'Academic Resources', count: 420, active: false }
  ];

  const books = [
    {
      id: 1,
      title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      category: 'Biography',
      isbn: '978-9960899558',
      publisher: 'Darussalam',
      year: 2002,
      pages: 624,
      language: 'English',
      rating: 4.9,
      reviews: 245,
      availability: 'Available',
      copies: 15,
      location: 'Section A, Shelf 12',
      description: 'Complete biography of Prophet Muhammad (PBUH) - Winner of the first prize in the worldwide competition on the biography of the Prophet organized by the Muslim World League.',
      tags: ['Biography', 'Seerah', 'Prophet Muhammad', 'Islamic History']
    },
    {
      id: 2,
      title: 'Tafsir Ibn Kathir (Abridged)',
      author: 'Ibn Kathir',
      category: 'Quran & Tafsir',
      isbn: '978-9960892900',
      publisher: 'Darussalam',
      year: 2000,
      pages: 3200,
      language: 'English',
      rating: 4.8,
      reviews: 189,
      availability: 'Available',
      copies: 8,
      location: 'Section B, Shelf 5',
      description: 'Classical commentary on the Holy Quran by the renowned scholar Ibn Kathir. This abridged version makes the tafsir accessible to modern readers.',
      tags: ['Tafsir', 'Quran', 'Commentary', 'Classical']
    },
    {
      id: 3,
      title: 'Fortress of the Muslim',
      author: 'Said bin Ali bin Wahf Al-Qahtani',
      category: 'Duas & Supplications',
      isbn: '978-9960897745',
      publisher: 'Darussalam',
      year: 1996,
      pages: 256,
      language: 'English/Arabic',
      rating: 4.7,
      reviews: 312,
      availability: 'Available',
      copies: 25,
      location: 'Section C, Shelf 8',
      description: 'Collection of authentic Islamic prayers and supplications from the Quran and Sunnah for daily use.',
      tags: ['Duas', 'Prayers', 'Supplications', 'Daily Use']
    },
    {
      id: 4,
      title: 'The Ideal Muslim',
      author: 'Muhammad Ali al-Hashimi',
      category: 'Character Building',
      isbn: '978-9960850375',
      publisher: 'International Islamic Publishing House',
      year: 1999,
      pages: 432,
      language: 'English',
      rating: 4.6,
      reviews: 156,
      availability: 'Checked Out',
      copies: 12,
      location: 'Section D, Shelf 3',
      description: 'Comprehensive guide to Islamic character and conduct based on Quranic teachings and Prophetic traditions.',
      tags: ['Character', 'Ethics', 'Islamic Conduct', 'Self-Development']
    },
    {
      id: 5,
      title: 'Stories of the Prophets',
      author: 'Ibn Kathir',
      category: 'Biography',
      isbn: '978-9960892917',
      publisher: 'Darussalam',
      year: 2003,
      pages: 688,
      language: 'English',
      rating: 4.8,
      reviews: 203,
      availability: 'Available',
      copies: 18,
      location: 'Section A, Shelf 15',
      description: 'Stories of all the Prophets mentioned in the Quran, compiled from authentic Islamic sources.',
      tags: ['Prophets', 'Stories', 'Islamic History', 'Biography']
    },
    {
      id: 6,
      title: 'Islamic Finance: Principles and Practice',
      author: 'Dr. Muhammad Ayub',
      category: 'Contemporary Issues',
      isbn: '978-0470030691',
      publisher: 'John Wiley & Sons',
      year: 2007,
      pages: 544,
      language: 'English',
      rating: 4.5,
      reviews: 89,
      availability: 'Available',
      copies: 6,
      location: 'Section E, Shelf 10',
      description: 'Comprehensive guide to Islamic banking and finance principles in the modern world.',
      tags: ['Finance', 'Banking', 'Economics', 'Contemporary']
    }
  ];

  const filterOptions = [
    { label: 'Availability', options: ['Available', 'Checked Out', 'Reserved'] },
    { label: 'Language', options: ['English', 'Arabic', 'Urdu', 'Bilingual'] },
    { label: 'Publication Year', options: ['2020-2025', '2015-2019', '2010-2014', 'Before 2010'] },
    { label: 'Rating', options: ['4.5+ Stars', '4.0+ Stars', '3.5+ Stars', 'All Ratings'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <BookOpen className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Digital Library Catalog
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Explore our comprehensive collection of Islamic books, academic resources, 
                and scholarly materials. Find, reserve, and access thousands of titles.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-2" />
                  <span>5,000+ Books</span>
                </div>
                <div className="flex items-center">
                  <Search className="h-6 w-6 mr-2" />
                  <span>Advanced Search</span>
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
                      placeholder="Search by title, author, ISBN, or keywords..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Categories</option>
                    {categories.slice(1).map((cat, index) => (
                      <option key={index} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="text-sm text-blue-600 hover:text-blue-700">Advanced Search</button>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Browse by Subject</button>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">New Arrivals</button>
                <span className="text-gray-300">|</span>
                <button className="text-sm text-blue-600 hover:text-blue-700">Popular Books</button>
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count.toLocaleString()})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">Clear All</button>
                  </div>
                  
                  {filterOptions.map((filter, index) => (
                    <div key={index} className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">{filter.label}</h4>
                      <div className="space-y-2">
                        {filter.options.map((option, optIndex) => (
                          <label key={optIndex} className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
                    <p className="text-gray-600">Showing {books.length} of 5,000+ books</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Sort by Relevance</option>
                      <option>Sort by Title</option>
                      <option>Sort by Author</option>
                      <option>Sort by Year</option>
                      <option>Sort by Rating</option>
                    </select>
                    
                    <div className="flex border border-gray-300 rounded-lg">
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-l-lg">
                        <BookOpen className="h-4 w-4" />
                      </button>
                      <button className="px-3 py-2 hover:bg-gray-50 rounded-r-lg">
                        <Filter className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {books.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-32 flex-shrink-0">
                          <div className="bg-blue-100 h-40 w-full rounded-lg flex items-center justify-center">
                            <BookOpen className="h-16 w-16 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {book.title}
                              </h3>
                              <p className="text-blue-600 font-medium mb-1">
                                By {book.author}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span>{book.publisher}, {book.year}</span>
                                <span>•</span>
                                <span>{book.pages} pages</span>
                                <span>•</span>
                                <span>{book.language}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center mb-2">
                                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                <span className="font-medium">{book.rating}</span>
                                <span className="text-gray-500 text-sm ml-1">({book.reviews})</span>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                book.availability === 'Available' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {book.availability}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4 line-clamp-2">
                            {book.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {book.tags.map((tag, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center space-x-4">
                                <span>ISBN: {book.isbn}</span>
                                <span>Location: {book.location}</span>
                                <span>Copies: {book.copies}</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                {book.availability === 'Available' ? 'Reserve' : 'Join Waitlist'}
                              </button>
                              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                <Eye className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Load More Books
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Access
              </h2>
              <p className="text-lg text-gray-600">
                Popular sections and featured collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/library/catalog?category=new-arrivals"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">New Arrivals</h3>
                <p className="text-sm text-gray-600">Latest additions to our collection</p>
              </Link>
              
              <Link
                href="/library/catalog?category=popular"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Popular Books</h3>
                <p className="text-sm text-gray-600">Most borrowed and highly rated</p>
              </Link>
              
              <Link
                href="/library/catalog?category=children"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <User className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Children's Section</h3>
                <p className="text-sm text-gray-600">Books for young readers</p>
              </Link>
              
              <Link
                href="/library/catalog?category=academic"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Academic Resources</h3>
                <p className="text-sm text-gray-600">Textbooks and reference materials</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Finding a Book?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our librarians are here to help you find the perfect resources for your 
              research, studies, or personal reading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Ask a Librarian
              </Link>
              <Link
                href="/library/recommendations"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Browse Recommendations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
