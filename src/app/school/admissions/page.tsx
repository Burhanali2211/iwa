import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { GraduationCap, FileText, Calendar, CheckCircle, Clock, Users, Award, BookOpen, Send } from 'lucide-react';

export default function AdmissionsPage() {
  const admissionProcess = [
    {
      step: 1,
      title: 'Submit Application',
      description: 'Complete the online application form with required documents',
      icon: FileText,
      status: 'active'
    },
    {
      step: 2,
      title: 'Document Review',
      description: 'Our admissions team reviews your application and documents',
      icon: CheckCircle,
      status: 'pending'
    },
    {
      step: 3,
      title: 'Assessment Test',
      description: 'Student takes age-appropriate academic and Islamic studies assessment',
      icon: BookOpen,
      status: 'pending'
    },
    {
      step: 4,
      title: 'Interview',
      description: 'Parent and student interview with admissions committee',
      icon: Users,
      status: 'pending'
    },
    {
      step: 5,
      title: 'Decision',
      description: 'Admission decision communicated within 2 weeks',
      icon: Award,
      status: 'pending'
    }
  ];

  const gradeRequirements = [
    {
      level: 'Primary School (Grades 1-5)',
      ageRange: '6-11 years',
      requirements: [
        'Birth certificate',
        'Previous school records (if applicable)',
        'Immunization records',
        'Parent/guardian identification',
        'Passport-size photographs'
      ],
      tuitionFee: '$2,500/year'
    },
    {
      level: 'Middle School (Grades 6-8)',
      ageRange: '12-14 years',
      requirements: [
        'Academic transcripts from previous school',
        'Teacher recommendation letters',
        'Birth certificate',
        'Immunization records',
        'Assessment test results'
      ],
      tuitionFee: '$3,000/year'
    },
    {
      level: 'High School (Grades 9-12)',
      ageRange: '15-18 years',
      requirements: [
        'Complete academic transcripts',
        'Standardized test scores',
        'Teacher recommendation letters',
        'Personal statement essay',
        'Extracurricular activity records'
      ],
      tuitionFee: '$3,500/year'
    }
  ];

  const importantDates = [
    {
      event: 'Application Opens',
      date: 'January 15, 2025',
      description: 'Online application portal becomes available'
    },
    {
      event: 'Application Deadline',
      date: 'March 31, 2025',
      description: 'Last date to submit complete applications'
    },
    {
      event: 'Assessment Tests',
      date: 'April 15-30, 2025',
      description: 'Scheduled assessment tests for applicants'
    },
    {
      event: 'Interviews',
      date: 'May 1-15, 2025',
      description: 'Parent and student interviews'
    },
    {
      event: 'Admission Results',
      date: 'May 31, 2025',
      description: 'Final admission decisions announced'
    },
    {
      event: 'Registration Deadline',
      date: 'June 30, 2025',
      description: 'Deadline for accepted students to confirm enrollment'
    }
  ];

  const scholarshipPrograms = [
    {
      name: 'Academic Excellence Scholarship',
      coverage: 'Up to 50% tuition',
      criteria: 'Outstanding academic performance and test scores'
    },
    {
      name: 'Islamic Studies Scholarship',
      coverage: 'Up to 30% tuition',
      criteria: 'Exceptional knowledge in Islamic studies and Quran memorization'
    },
    {
      name: 'Need-Based Financial Aid',
      coverage: 'Up to 75% tuition',
      criteria: 'Demonstrated financial need and academic merit'
    },
    {
      name: 'Community Service Award',
      coverage: 'Up to 25% tuition',
      criteria: 'Outstanding community service and leadership'
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
                  <GraduationCap className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                School Admissions
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Join our Islamic educational community where academic excellence meets 
                spiritual growth. Apply now for the upcoming academic year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Apply Now
                </button>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                >
                  Contact Admissions
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Admission Process
              </h2>
              <p className="text-lg text-gray-600">
                Follow these simple steps to complete your admission application
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block"></div>
              
              <div className="space-y-8">
                {admissionProcess.map((step, index) => (
                  <div key={step.step} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 md:w-1/2">
                      <div className={`bg-white rounded-lg shadow-lg p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            step.status === 'active' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            <step.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Step {step.step}: {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex w-8 h-8 bg-purple-600 rounded-full items-center justify-center text-white font-bold text-sm absolute left-1/2 transform -translate-x-1/2">
                      {step.step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grade Requirements */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Admission Requirements by Grade Level
              </h2>
              <p className="text-lg text-gray-600">
                Specific requirements and fees for each educational level
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {gradeRequirements.map((grade, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {grade.level}
                    </h3>
                    <div className="text-purple-600 font-semibold mb-2">
                      Age: {grade.ageRange}
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {grade.tuitionFee}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Required Documents:</h4>
                    <ul className="space-y-2">
                      {grade.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Important Dates
              </h2>
              <p className="text-lg text-gray-600">
                Key dates for the admission process - mark your calendar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantDates.map((date, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {date.event}
                    </h3>
                  </div>
                  <div className="text-xl font-bold text-purple-600 mb-2">
                    {date.date}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {date.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarship Programs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Scholarship Programs
              </h2>
              <p className="text-lg text-gray-600">
                Financial assistance opportunities for deserving students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scholarshipPrograms.map((scholarship, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {scholarship.name}
                      </h3>
                      <div className="text-2xl font-bold text-purple-600 mb-3">
                        {scholarship.coverage}
                      </div>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-gray-700 text-sm">
                    <strong>Criteria:</strong> {scholarship.criteria}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Interested in applying for financial assistance?
              </p>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Apply for Scholarship
              </button>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Start Your Application
                </h2>
                <p className="text-gray-600">
                  Begin the admission process by filling out this preliminary form
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student's Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level Applying For *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select Grade Level</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select Academic Year</option>
                      <option value="2025-2025">2025-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous School (if applicable)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Comments or Questions
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the terms and conditions and privacy policy *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help with Your Application?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our admissions team is here to help you through every step of the process. 
              Contact us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Contact Admissions Office
              </Link>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors">
                Schedule Campus Visit
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
