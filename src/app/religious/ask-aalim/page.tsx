import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { MessageCircle, Send, User, Calendar, CheckCircle, Clock, Search, Filter } from 'lucide-react';

export default function AskAalimPage() {
  const recentQuestions = [
    {
      id: 1,
      question: 'What is the proper way to perform Wudu (ablution)?',
      category: 'Worship',
      askedBy: 'Anonymous',
      askedDate: '2025-01-15',
      status: 'answered',
      scholar: 'Imam Abdullah Rahman',
      answerPreview: 'Wudu is performed in a specific sequence as taught by Prophet Muhammad (PBUH)...'
    },
    {
      id: 2,
      question: 'Can I pray Salah if I am traveling and cannot find the Qibla direction?',
      category: 'Prayer',
      askedBy: 'Ahmad K.',
      askedDate: '2025-01-14',
      status: 'answered',
      scholar: 'Dr. Sarah Ahmed',
      answerPreview: 'When traveling and unable to determine the Qibla direction, you should...'
    },
    {
      id: 3,
      question: 'What are the rules for fasting during Ramadan for pregnant women?',
      category: 'Fasting',
      askedBy: 'Sister Fatima',
      askedDate: '2025-01-13',
      status: 'pending',
      scholar: null,
      answerPreview: null
    },
    {
      id: 4,
      question: 'How should I handle conflicts with non-Muslim colleagues at work?',
      category: 'Social Issues',
      askedBy: 'Yusuf M.',
      askedDate: '2025-01-12',
      status: 'answered',
      scholar: 'Ustadh Omar Ali',
      answerPreview: 'Islam teaches us to maintain good relationships with all people...'
    }
  ];

  const scholars = [
    {
      name: 'Imam Abdullah Rahman',
      specialization: 'Fiqh & Worship',
      experience: '15 years',
      questionsAnswered: 450,
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Dr. Sarah Ahmed',
      specialization: 'Islamic Studies & History',
      experience: '12 years',
      questionsAnswered: 320,
      image: '/api/placeholder/100/100'
    },
    {
      name: 'Ustadh Omar Ali',
      specialization: 'Youth & Contemporary Issues',
      experience: '8 years',
      questionsAnswered: 280,
      image: '/api/placeholder/100/100'
    }
  ];

  const categories = [
    'Worship', 'Prayer', 'Fasting', 'Hajj & Umrah', 'Zakat', 'Marriage & Family',
    'Social Issues', 'Business Ethics', 'Youth Issues', 'Women&apos;s Issues', 'Other'
  ];

  const popularQuestions = [
    'How to perform Salah correctly?',
    'What breaks the fast during Ramadan?',
    'Rules for Zakat calculation',
    'Islamic guidelines for marriage',
    'Dealing with workplace challenges as a Muslim'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <MessageCircle className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ask an Aalim (Scholar)
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Get authentic Islamic guidance from qualified scholars. 
                Ask your questions about faith, worship, and daily life according to Islamic teachings.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>Qualified Scholars</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-2" />
                  <span>Quick Response</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ask Question Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Submit Your Question
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name or leave blank for anonymous"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Question *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Please describe your question in detail. The more specific you are, the better our scholars can help you."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email to receive notification when answered"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree that my question may be published anonymously to help other community members
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Question
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Our Scholars */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Qualified Scholars
              </h2>
              <p className="text-lg text-gray-600">
                Meet our team of experienced Islamic scholars ready to help you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {scholars.map((scholar, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {scholar.name}
                  </h3>
                  <p className="text-teal-600 font-medium mb-2">
                    {scholar.specialization}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{scholar.experience} of experience</p>
                    <p>{scholar.questionsAnswered}+ questions answered</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Q&A */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent Questions & Answers
              </h2>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Q&A..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {recentQuestions.map((qa) => (
                <div key={qa.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                          {qa.category}
                        </span>
                        <div className={`flex items-center text-sm ${
                          qa.status === 'answered' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {qa.status === 'answered' ? (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <Clock className="h-4 w-4 mr-1" />
                          )}
                          {qa.status === 'answered' ? 'Answered' : 'Pending'}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {qa.question}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <User className="h-4 w-4 mr-1" />
                        Asked by {qa.askedBy}
                        <Calendar className="h-4 w-4 ml-4 mr-1" />
                        {new Date(qa.askedDate).toLocaleDateString()}
                      </div>
                      
                      {qa.status === 'answered' && qa.answerPreview && (
                        <div className="bg-gray-50 rounded-lg p-4 mt-4">
                          <div className="flex items-center mb-2">
                            <User className="h-4 w-4 mr-2 text-teal-600" />
                            <span className="text-sm font-medium text-teal-600">
                              Answered by {qa.scholar}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            {qa.answerPreview}
                          </p>
                          <button className="text-teal-600 hover:text-teal-700 text-sm font-medium mt-2">
                            Read full answer →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                View More Q&A
              </button>
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularQuestions.map((question, index) => (
                <button
                  key={index}
                  className="text-left bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Islamic Guidance?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't hesitate to ask. Our qualified scholars are here to provide 
              authentic Islamic guidance based on Quran and Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                Ask Your Question
              </button>
              <Link
                href="/religious/articles"
                className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors"
              >
                Browse Articles
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
