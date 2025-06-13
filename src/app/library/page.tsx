import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Search, Download, Star, Clock, Users, Award, Eye, Library, Video, Heart, ArrowRight, Bookmark, Globe, Sparkles } from 'lucide-react';
import Card, { FeatureCard, ServiceCard, StatCard } from '@/components/ui/Card';

export default function LibraryPage() {
  const libraryServices = [
    {
      title: 'Digital Catalog',
      description: 'Browse our comprehensive collection of Islamic books, manuscripts, and scholarly resources with advanced search capabilities',
      icon: BookOpen,
      href: '/library/catalog',
      color: 'bg-blue-100 text-blue-600',
      stats: '5,000+ Books',
      gradient: 'from-blue-500 to-indigo-600',
      pattern: 'islamic-pattern-1'
    },
    {
      title: 'E-Books & Digital Resources',
      description: 'Access our extensive digital library featuring authentic Islamic literature, Quran commentaries, and scholarly works',
      icon: Globe,
      href: '/library/ebooks',
      color: 'bg-emerald-100 text-emerald-600',
      stats: '1,200+ E-Books',
      gradient: 'from-emerald-500 to-teal-600',
      pattern: 'islamic-pattern-2'
    },
    {
      title: 'Curated Collections',
      description: 'Discover carefully selected reading lists, scholarly recommendations, and thematic collections by Islamic experts',
      icon: Sparkles,
      href: '/library/recommendations',
      color: 'bg-purple-100 text-purple-600',
      stats: '50+ Collections',
      gradient: 'from-purple-500 to-pink-600',
      pattern: 'islamic-pattern-3'
    }
  ];

  const featuredBooks = [
    {
      title: 'The Sealed Nectar',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      category: 'Biography',
      rating: 4.9,
      downloads: 1250,
      description: 'Complete biography of Prophet Muhammad (PBUH)',
      available: true
    },
    {
      title: 'Tafsir Ibn Kathir',
      author: 'Ibn Kathir',
      category: 'Quran Commentary',
      rating: 4.8,
      downloads: 890,
      description: 'Classical commentary on the Holy Quran',
      available: true
    },
    {
      title: 'Fortress of the Muslim',
      author: 'Said bin Ali bin Wahf Al-Qahtani',
      category: 'Duas & Supplications',
      rating: 4.7,
      downloads: 2100,
      description: 'Collection of authentic Islamic prayers',
      available: true
    }
  ];

  const libraryStats = [
    { label: 'Total Books', value: '5,000+', icon: BookOpen },
    { label: 'Digital Resources', value: '1,200+', icon: Download },
    { label: 'Active Members', value: '850+', icon: Users },
    { label: 'Monthly Visitors', value: '2,500+', icon: Eye }
  ];

  const categories = [
    { name: 'Quran & Tafsir', count: 450, color: 'bg-green-500' },
    { name: 'Hadith', count: 320, color: 'bg-blue-500' },
    { name: 'Islamic History', count: 280, color: 'bg-purple-500' },
    { name: 'Fiqh & Jurisprudence', count: 380, color: 'bg-orange-500' },
    { name: 'Biography', count: 220, color: 'bg-red-500' },
    { name: 'Contemporary Issues', count: 180, color: 'bg-teal-500' },
    { name: 'Children\'s Books', count: 350, color: 'bg-pink-500' },
    { name: 'Academic Resources', count: 420, color: 'bg-indigo-500' }
  ];

  const recentAdditions = [
    {
      title: 'Islamic Finance Principles',
      author: 'Dr. Muhammad Ayub',
      dateAdded: '2025-01-15',
      category: 'Finance'
    },
    {
      title: 'Stories of the Prophets',
      author: 'Ibn Kathir',
      dateAdded: '2025-01-12',
      category: 'Biography'
    },
    {
      title: 'The Ideal Muslim',
      author: 'Muhammad Ali al-Hashimi',
      dateAdded: '2025-01-10',
      category: 'Character Building'
    },
    {
      title: 'Women in Islam',
      author: 'Jamal Badawi',
      dateAdded: '2025-01-08',
      category: 'Women\'s Issues'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none islamic-pattern-1"></div>
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none islamic-pattern-3"></div>

      <Header />

      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="hero-padding bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute inset-0 islamic-pattern-2 opacity-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center animate-fade-in-up">
              <div className="flex justify-center mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-2xl">
                  <Library className="h-16 w-16" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-shadow-lg">
                Islamic Library & Resources
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed opacity-95">
                Discover our extensive collection of Islamic books, digital resources,
                and scholarly materials to enhance your knowledge and spiritual growth through
                centuries of Islamic wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/library/catalog"
                  className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Browse Catalog
                </Link>
                <Link
                  href="/library/ebooks"
                  className="border-3 border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Access E-Books
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Library Stats */}
        <section className="section-padding bg-white relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {libraryStats.map((stat, index) => {
                const variants = ['elevated', 'modern', 'glass', 'bordered'] as const;
                const colors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600'];
                const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-orange-100'];

                return (
                  <div
                    key={index}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <StatCard
                      icon={stat.icon}
                      label={stat.label}
                      value={stat.value}
                      color={colors[index]}
                      bgColor={bgColors[index]}
                      variant={variants[index]}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        </section>

        {/* Enhanced Library Services */}
        <section className="section-padding-lg bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 islamic-pattern-2 opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 islamic-pattern-1 opacity-15"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-gradient">
                Library Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Access our comprehensive library services designed to support
                your Islamic education and research needs with modern technology and traditional wisdom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {libraryServices.map((service, index) => {
                const variants = ['elevated', 'modern', 'glass'] as const;
                const variant = variants[index];

                // Simplified design logic
                const isFirstCard = index === 0;
                const isSecondCard = index === 1;
                const isThirdCard = index === 2;

                return (
                  <Link
                    key={index}
                    href={service.href}
                    className="animate-slide-in-left group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Card
                      variant={variant}
                      hover="lift"
                      className={`h-full group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden ${
                        isFirstCard
                          ? `bg-gradient-to-br ${service.gradient} text-white`
                          : isSecondCard
                          ? 'bg-white border-l-4 border-emerald-500'
                          : 'bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg border border-white/20'
                      }`}
                    >
                      {/* Background pattern */}
                      {(isFirstCard || isThirdCard) && (
                        <div className={`absolute inset-0 ${service.pattern} opacity-10 pointer-events-none`}></div>
                      )}

                      <div className="text-center relative z-10">
                        <div className={`inline-flex p-4 rounded-full mb-6 shadow-lg ${
                          isFirstCard
                            ? 'bg-white/20 backdrop-blur-sm'
                            : isSecondCard
                            ? service.color.replace('text-', 'bg-').replace('-600', '-100')
                            : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}>
                          <service.icon className={`h-8 w-8 ${
                            isFirstCard
                              ? 'text-white'
                              : isSecondCard
                              ? service.color
                              : 'text-white'
                          }`} />
                        </div>

                        <h3 className={`text-xl font-bold mb-4 ${
                          isFirstCard
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}>
                          {service.title}
                        </h3>

                        <p className={`leading-relaxed mb-6 ${
                          isFirstCard
                            ? 'text-white/90'
                            : isSecondCard
                            ? 'text-gray-600'
                            : 'text-gray-700'
                        }`}>
                          {service.description}
                        </p>

                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                          isFirstCard
                            ? 'text-white/80 bg-white/20'
                            : isSecondCard
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-purple-600 bg-purple-50'
                        }`}>
                          <Bookmark className="h-4 w-4 mr-2" />
                          {service.stats}
                        </div>

                        {/* Hover arrow indicator */}
                        <div className={`mt-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                          isFirstCard ? 'text-white' : 'text-gray-900'
                        }`}>
                          <span className="text-sm font-semibold mr-2">Explore</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Featured Books */}
        <section className="section-padding-lg bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-gradient">
                Featured Books
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Popular and recommended Islamic literature from renowned scholars and authors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBooks.map((book, index) => {
                const variants = ['elevated', 'modern', 'glass'] as const;
                const variant = variants[index];

                // Simplified design logic
                const isFirstBook = index === 0;
                const isSecondBook = index === 1;

                const headerGradients = [
                  'from-emerald-400 via-teal-500 to-blue-600',
                  'from-blue-400 via-indigo-500 to-purple-600',
                  'from-purple-400 via-pink-500 to-rose-500'
                ];

                const patterns = ['islamic-pattern-1', 'islamic-pattern-2', 'islamic-pattern-3'];

                const categoryBgs = [
                  'bg-gradient-to-r from-emerald-500 to-teal-600',
                  'bg-gradient-to-r from-blue-500 to-indigo-600',
                  'bg-gradient-to-r from-purple-500 to-pink-600'
                ];

                const buttonGradients = [
                  'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
                  'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
                  'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                ];

                return (
                  <div
                    key={index}
                    className="animate-scale-in group"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Card
                      variant={variant}
                      hover="lift"
                      className={`h-full group-hover:shadow-2xl transition-all duration-500 ${
                        isFirstBook
                          ? 'bg-white shadow-2xl'
                          : isSecondBook
                          ? 'bg-white border-t-4 border-blue-500'
                          : 'bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-lg border border-white/20'
                      }`}
                    >
                      {/* Enhanced book cover area */}
                      <div className={`bg-gradient-to-br ${headerGradients[index]} h-52 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                        <div className={`absolute inset-0 ${patterns[index]} opacity-20`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="relative z-10 text-center">
                          <BookOpen className="h-16 w-16 text-white mb-3 drop-shadow-lg" />
                          <div className="text-white/80 text-sm font-medium">
                            {book.category}
                          </div>
                        </div>

                        {/* Floating rating badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center shadow-lg">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-bold text-gray-900">{book.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="mb-4">
                          <span className={`${categoryBgs[index]} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                            {book.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {book.title}
                        </h3>

                        <p className="text-blue-600 font-semibold mb-3 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          By {book.author}
                        </p>

                        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                          {book.description}
                        </p>

                        {/* Enhanced stats section */}
                        <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-yellow-100 p-2 rounded-full mr-3">
                              <Star className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{book.rating}</div>
                              <div className="text-xs text-gray-500">Rating</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <Download className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{book.downloads}</div>
                              <div className="text-xs text-gray-500">Downloads</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className={`flex-1 bg-gradient-to-r ${buttonGradients[index]} text-white py-3 px-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center`}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Read Online
                          </button>
                          <button className="border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Book Categories */}
        <section className="section-padding-lg bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 islamic-pattern-3 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 islamic-pattern-2 opacity-15"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
                <Library className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-gradient">
                Browse by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our organized collection of Islamic literature across diverse topics and subjects
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                // Simplified design variants to avoid complex conditional logic
                const variants = ['elevated', 'modern', 'glass', 'bordered'] as const;
                const variant = variants[index % 4];

                const getDesignClasses = (idx: number) => {
                  switch (idx % 4) {
                    case 0:
                      return {
                        cardClass: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50',
                        iconClass: 'rounded-2xl group-hover:rotate-3',
                        titleClass: 'text-gray-900 group-hover:text-blue-600'
                      };
                    case 1:
                      return {
                        cardClass: 'bg-gradient-to-br from-gray-50 to-white border-l-4 border-emerald-500',
                        iconClass: 'rounded-full',
                        titleClass: 'text-gray-900 group-hover:text-emerald-600'
                      };
                    case 2:
                      return {
                        cardClass: 'bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-sm border border-white/20',
                        iconClass: 'rounded-xl group-hover:-rotate-3',
                        titleClass: 'text-gray-900 group-hover:text-purple-600'
                      };
                    default:
                      return {
                        cardClass: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-orange-50',
                        iconClass: 'rounded-2xl',
                        titleClass: 'text-gray-900 group-hover:text-orange-600'
                      };
                  }
                };

                const design = getDesignClasses(index);

                return (
                  <Link
                    key={index}
                    href={`/library/catalog?category=${encodeURIComponent(category.name)}`}
                    className="animate-slide-in-left group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card
                      variant={variant}
                      hover="lift"
                      className={`h-full text-center ${design.cardClass} group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 islamic-pattern-1 opacity-5 group-hover:opacity-10 transition-opacity"></div>

                      <div className="relative z-10">
                        <div className={`w-14 h-14 ${category.color} ${design.iconClass} mb-4 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center`}>
                          {/* Icon placeholder - using geometric shapes for Islamic aesthetic */}
                          <div className="w-6 h-6 bg-white rounded-sm transform rotate-45"></div>
                        </div>

                        <h3 className={`font-bold mb-2 text-lg ${design.titleClass} transition-colors`}>
                          {category.name}
                        </h3>

                        <div className="mb-4">
                          <p className="text-gray-600 font-medium text-sm">
                            {category.count} books
                          </p>
                        </div>

                        {/* Enhanced explore button */}
                        <div className="mt-4 flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <div className="bg-blue-50 group-hover:bg-blue-100 px-4 py-2 rounded-full flex items-center transition-all duration-300 group-hover:scale-105">
                            <span className="text-sm font-semibold mr-2">Explore</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Recent Additions */}
        <section className="section-padding-lg bg-gradient-to-br from-white to-gray-50 relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-gradient">
                Recent Additions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Discover the latest Islamic books and resources added to our collection
              </p>
              <Link
                href="/library/catalog"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg group"
              >
                View All Books
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentAdditions.map((book, index) => {
                const cardVariants = ['elevated', 'modern', 'glass', 'bordered'] as const;
                const gradients = [
                  'from-blue-500 to-indigo-600',
                  'from-emerald-500 to-teal-600',
                  'from-purple-500 to-pink-600',
                  'from-orange-500 to-red-600'
                ];

                return (
                  <div
                    key={index}
                    className="animate-slide-in-left group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <Card
                      variant={cardVariants[index]}
                      hover="lift"
                      className="h-full bg-white group-hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Enhanced book icon with gradient */}
                        <div className={`bg-gradient-to-br ${gradients[index]} rounded-xl p-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Header with category and date */}
                          <div className="flex items-center justify-between mb-3">
                            <span className={`bg-gradient-to-r ${gradients[index]} text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm`}>
                              {book.category}
                            </span>
                            <div className="flex items-center text-gray-500 text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(book.dateAdded).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Book title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {book.title}
                          </h3>

                          {/* Author */}
                          <p className="text-blue-600 font-semibold text-sm mb-4 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            By {book.author}
                          </p>

                          {/* Action buttons */}
                          <div className="flex items-center space-x-3">
                            <button className={`flex-1 bg-gradient-to-r ${gradients[index]} text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold flex items-center justify-center group-hover:scale-105`}>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Read Now
                            </button>
                            <button className="border-2 border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        </section>

        {/* Enhanced Search Section */}
        <section className="section-padding-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 islamic-pattern-1 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 islamic-pattern-3 opacity-10"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-gradient">
                Search Our Library
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find books, authors, topics, and resources quickly with our advanced search capabilities
              </p>
            </div>

            <Card variant="elevated" className="bg-white/90 backdrop-blur-sm shadow-2xl">
              <div className="space-y-6">
                {/* Main search input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search books, authors, topics, or keywords..."
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center">
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Advanced filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80">
                      <option>All Categories</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80">
                      <option>All Languages</option>
                      <option>Arabic</option>
                      <option>English</option>
                      <option>Urdu</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Format</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80">
                      <option>All Formats</option>
                      <option>Physical Books</option>
                      <option>E-Books</option>
                      <option>Audio Books</option>
                      <option>Manuscripts</option>
                    </select>
                  </div>
                </div>

                {/* Quick search suggestions */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Quran Commentary', 'Hadith Collections', 'Islamic History', 'Fiqh', 'Biography', 'Children Books'].map((term, index) => (
                      <button
                        key={index}
                        className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="section-padding-lg bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-bounce-in">
              <Card variant="gradient" className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 islamic-pattern-1 opacity-10"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">
                    Expand Your Islamic Knowledge
                  </h2>
                  <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
                    Join our library community and access thousands of Islamic books,
                    resources, and scholarly materials to deepen your understanding of Islam
                    and strengthen your spiritual journey.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                      href="/library/catalog"
                      className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Explore Full Catalog
                    </Link>
                    <Link
                      href="/contact"
                      className="border-3 border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      Contact Librarian
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
