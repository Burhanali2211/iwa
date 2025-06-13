import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Bell, Calendar, Download, Search, Filter, AlertCircle, Info, CheckCircle, Clock } from 'lucide-react';

export default function NoticesPage() {
  const noticeCategories = [
    { name: 'All Notices', count: 24, active: true },
    { name: 'Academic', count: 8, active: false },
    { name: 'Events', count: 6, active: false },
    { name: 'Administrative', count: 5, active: false },
    { name: 'Emergency', count: 2, active: false },
    { name: 'General', count: 3, active: false }
  ];

  const notices = [
    {
      id: 1,
      title: 'Mid-term Examination Schedule Released',
      category: 'Academic',
      priority: 'high',
      date: '2025-01-15',
      publishedBy: 'Academic Office',
      content: 'The mid-term examination schedule for all grades has been finalized. Students are advised to check their respective timetables and prepare accordingly. Exam hall allocation will be announced separately.',
      attachments: ['Exam_Schedule_2025.pdf', 'Exam_Guidelines.pdf'],
      targetAudience: 'All Students',
      expiryDate: '2025-02-15',
      featured: true
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting - February 2025',
      category: 'Events',
      priority: 'medium',
      date: '2025-01-12',
      publishedBy: 'Administration',
      content: 'Parent-Teacher meetings are scheduled for February 10-11, 2025. Parents are requested to book their slots through the school portal or contact the respective class teachers.',
      attachments: ['PTM_Schedule.pdf'],
      targetAudience: 'Parents & Teachers',
      expiryDate: '2025-02-11',
      featured: true
    },
    {
      id: 3,
      title: 'New Library Books Available',
      category: 'General',
      priority: 'low',
      date: '2025-01-10',
      publishedBy: 'Library Department',
      content: 'The library has received new collection of Islamic literature and academic books. Students can now access these resources during library hours.',
      attachments: ['New_Books_List.pdf'],
      targetAudience: 'All Students',
      expiryDate: '2025-03-10',
      featured: false
    },
    {
      id: 4,
      title: 'School Closure Due to Weather Conditions',
      category: 'Emergency',
      priority: 'urgent',
      date: '2025-01-08',
      publishedBy: 'Principal Office',
      content: 'Due to severe weather conditions, the school will remain closed on January 9, 2025. All classes and activities are suspended. Regular schedule will resume on January 10, 2025.',
      attachments: [],
      targetAudience: 'All Students & Staff',
      expiryDate: '2025-01-10',
      featured: true
    },
    {
      id: 5,
      title: 'Islamic Studies Competition Registration',
      category: 'Events',
      priority: 'medium',
      date: '2025-01-05',
      publishedBy: 'Islamic Studies Department',
      content: 'Registration is now open for the annual Islamic Studies competition. Students from grades 6-12 can participate. Registration deadline is January 25, 2025.',
      attachments: ['Competition_Rules.pdf', 'Registration_Form.pdf'],
      targetAudience: 'Grades 6-12',
      expiryDate: '2025-01-25',
      featured: false
    },
    {
      id: 6,
      title: 'Fee Payment Deadline Extension',
      category: 'Administrative',
      priority: 'medium',
      date: '2025-01-03',
      publishedBy: 'Finance Office',
      content: 'The deadline for semester fee payment has been extended to January 31, 2025. Parents are requested to complete payments to avoid late fees.',
      attachments: ['Fee_Structure_2025.pdf'],
      targetAudience: 'All Parents',
      expiryDate: '2025-01-31',
      featured: false
    }
  ];

  const urgentNotices = notices.filter(notice => notice.priority === 'urgent' || notice.priority === 'high');
  const recentNotices = notices.slice(0, 4);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Bell className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                School Notice Board
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Stay informed with the latest announcements, important updates, 
                and school communications. Never miss important information.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Bell className="h-6 w-6 mr-2" />
                  <span>Latest Updates</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-6 w-6 mr-2" />
                  <span>Downloadable Files</span>
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
                    placeholder="Search notices..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
                  <option>Sort by Date</option>
                  <option>Sort by Priority</option>
                  <option>Sort by Category</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Notice Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {noticeCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category.active
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Urgent Notices */}
        {urgentNotices.length > 0 && (
          <section className="py-8 bg-red-50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center mb-6">
                <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                <h2 className="text-xl font-bold text-red-900">
                  Urgent Notices
                </h2>
              </div>
              
              <div className="space-y-4">
                {urgentNotices.map((notice) => (
                  <div key={notice.id} className="bg-white border-l-4 border-red-500 rounded-lg p-4 shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {getPriorityIcon(notice.priority)}
                          <h3 className="text-lg font-semibold text-gray-900 ml-2">
                            {notice.title}
                          </h3>
                        </div>
                        <p className="text-gray-700 mb-3">
                          {notice.content}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(notice.date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          <span>{notice.publishedBy}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                        {notice.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Notices */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Notices
              </h2>
              <p className="text-lg text-gray-600">
                Latest announcements and important updates
              </p>
            </div>

            <div className="space-y-6">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        {getPriorityIcon(notice.priority)}
                        <h3 className="text-xl font-bold text-gray-900 ml-2">
                          {notice.title}
                        </h3>
                        {notice.featured && (
                          <span className="ml-3 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                          {notice.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}>
                          {notice.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {notice.content}
                  </p>
                  
                  {notice.attachments.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Attachments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {notice.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {attachment}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Published: {new Date(notice.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Expires: {new Date(notice.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span>By: {notice.publishedBy}</span>
                      <span>For: {notice.targetAudience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                Load More Notices
              </button>
            </div>
          </div>
        </section>

        {/* Notice Archive */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Notice Archive
              </h2>
              <p className="text-lg text-gray-600">
                Access previous notices and announcements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/school/notices?archive=2025"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">2025 Notices</h3>
                <p className="text-sm text-gray-600">Current year announcements</p>
              </Link>
              
              <Link
                href="/school/notices?archive=2023"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">2023 Notices</h3>
                <p className="text-sm text-gray-600">Previous year archive</p>
              </Link>
              
              <Link
                href="/school/notices?category=academic"
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
              >
                <Bell className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Academic Notices</h3>
                <p className="text-sm text-gray-600">Education-related announcements</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-50 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Stay Updated
                </h2>
                <p className="text-gray-600">
                  Subscribe to receive important notices and announcements via email
                </p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Preference
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                      <option>All Notices</option>
                      <option>Urgent Only</option>
                      <option>Academic Only</option>
                      <option>Events Only</option>
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Subscribe to Notifications
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-yellow-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Have Questions About a Notice?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact the relevant department or our main office for clarification 
              on any announcements or notices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
              >
                Contact Main Office
              </Link>
              <Link
                href="/school/staff"
                className="border-2 border-yellow-600 text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:text-white transition-colors"
              >
                View Staff Directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
