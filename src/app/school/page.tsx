import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Users, GraduationCap, Calendar, FileText, CreditCard, Clock, UserCheck, Bell, Award } from 'lucide-react';

export default function SchoolPage() {
  const schoolServices = [
    {
      title: 'Student Portal',
      description: 'Access assignments, grades, and academic resources',
      icon: BookOpen,
      href: '/school/student',
      color: 'bg-blue-100 text-blue-600',
      userType: 'Students'
    },
    {
      title: 'Teacher Dashboard',
      description: 'Manage classes, assignments, and student progress',
      icon: Users,
      href: '/school/teacher',
      color: 'bg-green-100 text-green-600',
      userType: 'Teachers'
    },
    {
      title: 'Admissions',
      description: 'Apply for admission and track application status',
      icon: GraduationCap,
      href: '/school/admissions',
      color: 'bg-purple-100 text-purple-600',
      userType: 'All'
    },
    {
      title: 'Fee Payment',
      description: 'Pay school fees online securely and conveniently',
      icon: CreditCard,
      href: '/school/fees',
      color: 'bg-orange-100 text-orange-600',
      userType: 'Parents'
    },
    {
      title: 'Timetables',
      description: 'View class schedules and academic calendar',
      icon: Clock,
      href: '/school/timetables',
      color: 'bg-teal-100 text-teal-600',
      userType: 'All'
    },
    {
      title: 'Results',
      description: 'Check exam results and academic performance',
      icon: Award,
      href: '/school/results',
      color: 'bg-red-100 text-red-600',
      userType: 'Students'
    },
    {
      title: 'Staff Directory',
      description: 'Contact information for teachers and staff',
      icon: UserCheck,
      href: '/school/staff',
      color: 'bg-indigo-100 text-indigo-600',
      userType: 'All'
    },
    {
      title: 'Notice Board',
      description: 'Important announcements and school updates',
      icon: Bell,
      href: '/school/notices',
      color: 'bg-yellow-100 text-yellow-600',
      userType: 'All'
    }
  ];

  const quickStats = [
    { label: 'Total Students', value: '850+', icon: Users },
    { label: 'Teaching Staff', value: '45+', icon: UserCheck },
    { label: 'Graduation Rate', value: '98%', icon: GraduationCap },
    { label: 'Years of Excellence', value: '25+', icon: Award }
  ];

  const recentAnnouncements = [
    {
      title: 'Mid-term Examination Schedule Released',
      date: '2025-01-15',
      category: 'Academics',
      priority: 'high'
    },
    {
      title: 'Parent-Teacher Meeting - January 2025',
      date: '2025-01-12',
      category: 'Events',
      priority: 'medium'
    },
    {
      title: 'New Library Books Available',
      date: '2025-01-10',
      category: 'Library',
      priority: 'low'
    },
    {
      title: 'Islamic Studies Competition Registration Open',
      date: '2025-01-08',
      category: 'Competition',
      priority: 'medium'
    }
  ];

  const academicPrograms = [
    {
      level: 'Primary School',
      grades: 'Grades 1-5',
      description: 'Foundation education with Islamic values integration',
      subjects: ['Islamic Studies', 'Arabic', 'English', 'Mathematics', 'Science', 'Social Studies']
    },
    {
      level: 'Middle School',
      grades: 'Grades 6-8',
      description: 'Comprehensive curriculum preparing for higher education',
      subjects: ['Advanced Islamic Studies', 'Quran & Hadith', 'Arabic Literature', 'Sciences', 'Mathematics']
    },
    {
      level: 'High School',
      grades: 'Grades 9-12',
      description: 'College preparatory program with Islamic scholarship',
      subjects: ['Islamic Jurisprudence', 'Comparative Religion', 'Advanced Sciences', 'Literature', 'Philosophy']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Islamic School Management
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Comprehensive educational services combining academic excellence with Islamic values. 
                Access student portals, teacher resources, and administrative services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/school/student"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Student Portal
                </Link>
                <Link
                  href="/school/teacher"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Teacher Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* School Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                School Services & Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access all school-related services and resources from our comprehensive 
                management system designed for students, teachers, and parents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {schoolServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
                >
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {service.description}
                  </p>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                    For {service.userType}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Programs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Academic Programs
              </h2>
              <p className="text-lg text-gray-600">
                Comprehensive Islamic education from primary through high school
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {academicPrograms.map((program, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.level}
                    </h3>
                    <div className="text-blue-600 font-semibold mb-3">
                      {program.grades}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {program.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Core Subjects:</h4>
                    <div className="space-y-2">
                      {program.subjects.map((subject, subIndex) => (
                        <div key={subIndex} className="flex items-center text-sm text-gray-600">
                          <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Announcements */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent Announcements
              </h2>
              <Link
                href="/school/notices"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.priority === 'high' 
                            ? 'bg-red-100 text-red-800'
                            : announcement.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {announcement.category}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${
                          announcement.priority === 'high' 
                            ? 'bg-red-500'
                            : announcement.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}></span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <p className="text-lg text-gray-600">
                Frequently used services and resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/school/fees"
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Pay Fees</h3>
                <p className="text-sm text-gray-600">Make secure online payments</p>
              </Link>
              
              <Link
                href="/school/results"
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <Award className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Check Results</h3>
                <p className="text-sm text-gray-600">View exam results and grades</p>
              </Link>
              
              <Link
                href="/school/timetables"
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <Clock className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">View Timetable</h3>
                <p className="text-sm text-gray-600">Class schedules and timings</p>
              </Link>
              
              <Link
                href="/school/admissions"
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Apply Now</h3>
                <p className="text-sm text-gray-600">Submit admission application</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Islamic Educational Community
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience quality education rooted in Islamic values. 
              Contact us to learn more about our programs and admission process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/school/admissions"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
