import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Users, Mail, Phone, MapPin, Search, Filter, Award, BookOpen } from 'lucide-react';

export default function StaffPage() {
  const staffCategories = [
    { name: 'All Staff', count: 45, active: true },
    { name: 'Administration', count: 8, active: false },
    { name: 'Islamic Studies', count: 12, active: false },
    { name: 'Academic Teachers', count: 18, active: false },
    { name: 'Support Staff', count: 7, active: false }
  ];

  const administrationStaff = [
    {
      name: 'Dr. Muhammad Al-Rashid',
      position: 'Principal',
      department: 'Administration',
      email: 'principal@islamicschool.edu',
      phone: '+1 (555) 123-4567',
      office: 'Principal Office, 1st Floor',
      qualifications: 'PhD in Islamic Studies, M.Ed in Educational Leadership',
      experience: '20 years',
      specialization: 'Educational Administration, Islamic Curriculum Development',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Sister Fatima Hassan',
      position: 'Vice Principal',
      department: 'Administration',
      email: 'vp@islamicschool.edu',
      phone: '+1 (555) 123-4568',
      office: 'VP Office, 1st Floor',
      qualifications: 'M.Ed in Educational Management, B.A in Islamic Studies',
      experience: '15 years',
      specialization: 'Student Affairs, Academic Coordination',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Mr. Ahmed Khan',
      position: 'Academic Coordinator',
      department: 'Administration',
      email: 'academic@islamicschool.edu',
      phone: '+1 (555) 123-4569',
      office: 'Academic Office, 2nd Floor',
      qualifications: 'M.A in Education, B.Sc in Mathematics',
      experience: '12 years',
      specialization: 'Curriculum Planning, Academic Assessment',
      image: '/api/placeholder/150/150'
    }
  ];

  const islamicStudiesTeachers = [
    {
      name: 'Imam Abdullah Rahman',
      position: 'Head of Islamic Studies',
      department: 'Islamic Studies',
      email: 'imam@islamicschool.edu',
      phone: '+1 (555) 123-4570',
      office: 'Islamic Studies Dept, 3rd Floor',
      qualifications: 'M.A in Islamic Studies, Ijazah in Quran',
      experience: '18 years',
      specialization: 'Quran, Hadith, Islamic Jurisprudence',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. Sarah Ahmed',
      position: 'Arabic Language Teacher',
      department: 'Islamic Studies',
      email: 'arabic@islamicschool.edu',
      phone: '+1 (555) 123-4571',
      office: 'Room 301',
      qualifications: 'PhD in Arabic Literature, M.A in Linguistics',
      experience: '14 years',
      specialization: 'Arabic Grammar, Classical Literature',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Ustadh Omar Ali',
      position: 'Islamic Ethics Teacher',
      department: 'Islamic Studies',
      email: 'ethics@islamicschool.edu',
      phone: '+1 (555) 123-4572',
      office: 'Room 302',
      qualifications: 'M.A in Islamic Philosophy, B.A in Islamic Studies',
      experience: '10 years',
      specialization: 'Islamic Ethics, Contemporary Issues',
      image: '/api/placeholder/150/150'
    }
  ];

  const academicTeachers = [
    {
      name: 'Ms. Fatima Ali',
      position: 'English Language Teacher',
      department: 'Languages',
      email: 'english@islamicschool.edu',
      phone: '+1 (555) 123-4573',
      office: 'Room 201',
      qualifications: 'M.A in English Literature, B.Ed',
      experience: '8 years',
      specialization: 'English Literature, Creative Writing',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. Omar Hassan',
      position: 'Science Teacher',
      department: 'Sciences',
      email: 'science@islamicschool.edu',
      phone: '+1 (555) 123-4574',
      office: 'Science Lab 1',
      qualifications: 'PhD in Chemistry, M.Sc in Education',
      experience: '16 years',
      specialization: 'Chemistry, Physics, Environmental Science',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Prof. Yusuf Ibrahim',
      position: 'Mathematics Teacher',
      department: 'Mathematics',
      email: 'math@islamicschool.edu',
      phone: '+1 (555) 123-4575',
      office: 'Room 203',
      qualifications: 'M.Sc in Mathematics, B.Ed',
      experience: '12 years',
      specialization: 'Advanced Mathematics, Statistics',
      image: '/api/placeholder/150/150'
    }
  ];

  const supportStaff = [
    {
      name: 'Ms. Zainab Ali',
      position: 'Librarian',
      department: 'Library Services',
      email: 'library@islamicschool.edu',
      phone: '+1 (555) 123-4576',
      office: 'Main Library',
      qualifications: 'M.L.I.S, B.A in Islamic Studies',
      experience: '9 years',
      specialization: 'Digital Resources, Islamic Literature',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Mr. Hassan Malik',
      position: 'IT Coordinator',
      department: 'Technology',
      email: 'it@islamicschool.edu',
      phone: '+1 (555) 123-4577',
      office: 'IT Office, Basement',
      qualifications: 'B.Sc in Computer Science, Network+ Certified',
      experience: '6 years',
      specialization: 'Network Administration, Educational Technology',
      image: '/api/placeholder/150/150'
    }
  ];

  const allStaff = [
    ...administrationStaff,
    ...islamicStudiesTeachers,
    ...academicTeachers,
    ...supportStaff
  ];

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
                  <Users className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Staff Directory
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Meet our dedicated team of educators, administrators, and support staff 
                committed to providing quality Islamic education and nurturing young minds.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  <span>45+ Staff Members</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  <span>Qualified Educators</span>
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
                    placeholder="Search staff by name, department, or subject..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                  <option>Sort by Name</option>
                  <option>Sort by Department</option>
                  <option>Sort by Experience</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Categories */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {staffCategories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    category.active
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Administration Staff */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Administration
              </h2>
              <p className="text-lg text-gray-600">
                Leadership team guiding our educational mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {administrationStaff.map((staff, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {staff.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-1">
                      {staff.position}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {staff.department}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                      <a href={`mailto:${staff.email}`} className="hover:text-indigo-600">
                        {staff.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                      <a href={`tel:${staff.phone}`} className="hover:text-indigo-600">
                        {staff.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                      {staff.office}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-700 mb-2">
                      <strong>Experience:</strong> {staff.experience}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Qualifications:</strong> {staff.qualifications}
                    </p>
                    <p className="text-gray-700">
                      <strong>Specialization:</strong> {staff.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Islamic Studies Teachers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Islamic Studies Department
              </h2>
              <p className="text-lg text-gray-600">
                Scholars dedicated to Islamic education and spiritual guidance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {islamicStudiesTeachers.map((staff, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {staff.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-1">
                      {staff.position}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-green-600" />
                      <a href={`mailto:${staff.email}`} className="hover:text-green-600">
                        {staff.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-green-600" />
                      {staff.office}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-700 mb-1">
                      <strong>Experience:</strong> {staff.experience}
                    </p>
                    <p className="text-gray-700">
                      <strong>Specialization:</strong> {staff.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Teachers */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Academic Faculty
              </h2>
              <p className="text-lg text-gray-600">
                Expert educators in various academic disciplines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {academicTeachers.map((staff, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {staff.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-1">
                      {staff.position}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {staff.department}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      <a href={`mailto:${staff.email}`} className="hover:text-blue-600">
                        {staff.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      {staff.office}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-700 mb-1">
                      <strong>Experience:</strong> {staff.experience}
                    </p>
                    <p className="text-gray-700">
                      <strong>Specialization:</strong> {staff.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Staff */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Support Staff
              </h2>
              <p className="text-lg text-gray-600">
                Essential team members supporting our educational mission
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportStaff.map((staff, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {staff.name}
                    </h3>
                    <p className="text-purple-600 font-medium mb-1">
                      {staff.position}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {staff.department}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-purple-600" />
                      <a href={`mailto:${staff.email}`} className="hover:text-purple-600">
                        {staff.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                      {staff.office}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-gray-700 mb-1">
                      <strong>Experience:</strong> {staff.experience}
                    </p>
                    <p className="text-gray-700">
                      <strong>Specialization:</strong> {staff.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                General Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Main Office</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-indigo-600" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                      <span>info@islamicschool.edu</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                      <span>123 Education Street, City, State 12345</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Office Hours</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>Monday - Thursday: 8:00 AM - 4:00 PM</p>
                    <p>Friday: 8:00 AM - 12:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                    <p className="text-indigo-600 font-medium mt-2">
                      Emergency Contact: +1 (555) 123-9999
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Educational Team
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for qualified educators and support staff 
              who share our commitment to Islamic education and student success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Contact HR Department
              </Link>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors">
                View Career Opportunities
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
