import React from 'react';
import Link from 'next/link';
import {
  Building2,
  BookOpen,
  Users,
  Heart,
  Calendar,
  GraduationCap,
  Video,
  FileText,
  CreditCard,
  Library,
  UserCheck,
  Award,
  ArrowRight
} from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-30 -z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23065f46' fill-opacity='0.04'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-20 -z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Idarah Wali Ul Aser Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our services dedicated to bringing authentic Islamic knowledge and
            continuing the mission of Sayyed Mustafa Hamadani in Chattergam Kashmir.
          </p>
        </div>

        {/* Religious Services - Hero Layout */}
        <div className="mb-24 bg-gradient-to-br from-gray-50 to-gray-100 -mx-4 px-8 py-16 rounded-3xl shadow-lg">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Religious Services</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Featured Service */}
          <Link href="/religious/live" className="block mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden group hover:from-green-700 hover:to-emerald-800 transition-all duration-300">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Library & Knowledge Center</h3>
                  <p className="text-white/90 text-lg mb-4 max-w-2xl">Access our comprehensive library founded to bring light of knowledge to people, featuring authentic Islamic texts and resources.</p>
                  <div className="flex items-center text-white/80 group-hover:translate-x-2 transition-transform">
                    <span className="font-semibold mr-2">Start Watching</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-white/60" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary Services */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/religious/events">
              <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-blue-100 group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Islamic Events Calendar</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Stay updated with all religious events, special occasions, and community gatherings throughout the year.</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/religious/articles">
              <div className="bg-white border-2 border-green-100 rounded-xl p-6 hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-purple-100 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Khutba & Articles</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Access our collection of Friday khutbas, Islamic articles, and educational content for spiritual growth.</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Educational Excellence - Timeline Layout */}
        <div className="mb-24 bg-gradient-to-br from-blue-50 to-green-50 -mx-4 px-8 py-16 rounded-3xl shadow-lg">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Maktab Wali Ul Aser</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="space-y-8">
              <Link href="/school/student" className="block">
                <div className="relative flex items-start space-x-8 group">
                  <div className="relative z-10 bg-white border-4 border-blue-100 rounded-full p-4 group-hover:border-blue-300 transition-colors">
                    <GraduationCap className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Student Portal</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">Comprehensive student management system with grades, attendance, assignments, and communication tools.</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      <span className="mr-2">Access Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/school/teacher" className="block">
                <div className="relative flex items-start space-x-8 group">
                  <div className="relative z-10 bg-white border-4 border-blue-100 rounded-full p-4 group-hover:border-blue-300 transition-colors">
                    <UserCheck className="h-8 w-8 text-teal-600" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Teacher Dashboard</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">Advanced tools for educators to manage classes, track student progress, and communicate with parents.</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      <span className="mr-2">Access Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/school/results" className="block">
                <div className="relative flex items-start space-x-8 group">
                  <div className="relative z-10 bg-white border-4 border-blue-100 rounded-full p-4 group-hover:border-blue-300 transition-colors">
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Online Examinations</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">Secure online testing platform with instant results, detailed analytics, and performance tracking.</p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      <span className="mr-2">Access Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden rounded-2xl p-8">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232563eb' fill-opacity='0.03'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Join Idarah Wali Ul Aser</h3>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Be part of our mission to spread authentic Islamic knowledge and continue the legacy
                of Sayyed Mustafa Hamadani in Chattergam Kashmir.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/school/admissions"
                  className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Apply for Admission
                </Link>
                <Link
                  href="/contact"
                  className="border-3 border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
