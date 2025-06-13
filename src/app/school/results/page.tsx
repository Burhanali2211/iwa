import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Award, TrendingUp, Download, Search, Eye, Calendar, BarChart3, Users } from 'lucide-react';

export default function ResultsPage() {
  const examTypes = [
    { name: 'Mid-term Exams', date: '2025-01-15', status: 'published' },
    { name: 'Final Exams', date: '2025-05-20', status: 'upcoming' },
    { name: 'Unit Tests', date: '2025-01-08', status: 'published' },
    { name: 'Annual Exams', date: '2025-06-15', status: 'upcoming' }
  ];

  const sampleResults = {
    studentInfo: {
      name: 'Ahmad Hassan',
      studentId: 'STU2025001',
      grade: 'Grade 8',
      section: 'A',
      rollNumber: '15'
    },
    examInfo: {
      examName: 'Mid-term Examination',
      examDate: 'January 2025',
      resultDate: '2025-01-25'
    },
    subjects: [
      { name: 'Islamic Studies', marks: 92, totalMarks: 100, grade: 'A+', remarks: 'Excellent' },
      { name: 'Arabic Language', marks: 88, totalMarks: 100, grade: 'A', remarks: 'Very Good' },
      { name: 'English Language', marks: 85, totalMarks: 100, grade: 'A', remarks: 'Good' },
      { name: 'Mathematics', marks: 90, totalMarks: 100, grade: 'A+', remarks: 'Excellent' },
      { name: 'Science', marks: 87, totalMarks: 100, grade: 'A', remarks: 'Very Good' },
      { name: 'Social Studies', marks: 83, totalMarks: 100, grade: 'B+', remarks: 'Good' },
      { name: 'Computer Science', marks: 95, totalMarks: 100, grade: 'A+', remarks: 'Outstanding' }
    ],
    summary: {
      totalMarks: 620,
      obtainedMarks: 620,
      percentage: 88.57,
      grade: 'A',
      position: 3,
      totalStudents: 45
    }
  };

  const gradeScale = [
    { grade: 'A+', range: '90-100%', gpa: '4.0', description: 'Outstanding' },
    { grade: 'A', range: '80-89%', gpa: '3.5-3.9', description: 'Excellent' },
    { grade: 'B+', range: '70-79%', gpa: '3.0-3.4', description: 'Very Good' },
    { grade: 'B', range: '60-69%', gpa: '2.5-2.9', description: 'Good' },
    { grade: 'C+', range: '50-59%', gpa: '2.0-2.4', description: 'Satisfactory' },
    { grade: 'C', range: '40-49%', gpa: '1.5-1.9', description: 'Pass' },
    { grade: 'F', range: 'Below 40%', gpa: '0.0', description: 'Fail' }
  ];

  const performanceStats = [
    { label: 'Overall Percentage', value: '88.57%', icon: BarChart3, color: 'text-green-600' },
    { label: 'Class Position', value: '3rd', icon: Award, color: 'text-blue-600' },
    { label: 'Grade Point Average', value: '3.8', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Subjects Passed', value: '7/7', icon: Users, color: 'text-orange-600' }
  ];

  const topPerformers = [
    { name: 'Fatima Ali', grade: 'Grade 12', percentage: 96.5, position: 1 },
    { name: 'Omar Hassan', grade: 'Grade 11', percentage: 94.2, position: 2 },
    { name: 'Aisha Khan', grade: 'Grade 10', percentage: 93.8, position: 3 },
    { name: 'Yusuf Ahmed', grade: 'Grade 9', percentage: 92.1, position: 4 },
    { name: 'Zainab Malik', grade: 'Grade 8', percentage: 91.5, position: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Award className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Examination Results
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Access your academic performance, exam results, and progress reports. 
                Track your educational journey with detailed analytics and insights.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  <span>Detailed Reports</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-6 w-6 mr-2" />
                  <span>PDF Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Result Search */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Check Your Results
              </h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your student ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Type *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                      <option value="">Select Exam</option>
                      {examTypes.map((exam, index) => (
                        <option key={index} value={exam.name} disabled={exam.status !== 'published'}>
                          {exam.name} {exam.status !== 'published' ? '(Not Available)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Search className="h-5 w-5 mr-2" />
                  View Results
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {performanceStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
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

        {/* Sample Result Card */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sample Result Report
              </h2>
              <p className="text-lg text-gray-600">
                Example of detailed examination result format
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Islamic School & Religious Center
                </h3>
                <p className="text-lg text-gray-600">Examination Result Report</p>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{sampleResults.studentInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student ID:</span>
                      <span className="font-medium">{sampleResults.studentInfo.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-medium">{sampleResults.studentInfo.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roll Number:</span>
                      <span className="font-medium">{sampleResults.studentInfo.rollNumber}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Examination Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exam:</span>
                      <span className="font-medium">{sampleResults.examInfo.examName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exam Date:</span>
                      <span className="font-medium">{sampleResults.examInfo.examDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Result Date:</span>
                      <span className="font-medium">{new Date(sampleResults.examInfo.resultDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Results */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Subject-wise Results</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b">Subject</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 border-b">Marks Obtained</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 border-b">Total Marks</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 border-b">Percentage</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 border-b">Grade</th>
                        <th className="px-4 py-2 text-center text-sm font-medium text-gray-900 border-b">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleResults.subjects.map((subject, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-900">{subject.name}</td>
                          <td className="px-4 py-2 text-sm text-center">{subject.marks}</td>
                          <td className="px-4 py-2 text-sm text-center">{subject.totalMarks}</td>
                          <td className="px-4 py-2 text-sm text-center">{((subject.marks / subject.totalMarks) * 100).toFixed(1)}%</td>
                          <td className="px-4 py-2 text-sm text-center font-medium">{subject.grade}</td>
                          <td className="px-4 py-2 text-sm text-center">{subject.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Overall Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{sampleResults.summary.percentage}%</div>
                    <div className="text-sm text-gray-600">Overall Percentage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{sampleResults.summary.grade}</div>
                    <div className="text-sm text-gray-600">Overall Grade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{sampleResults.summary.position}</div>
                    <div className="text-sm text-gray-600">Class Position</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{sampleResults.summary.totalStudents}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <div className="text-center mt-8">
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto">
                  <Download className="h-5 w-5 mr-2" />
                  Download Result PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grade Scale */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Grading Scale
              </h2>
              <p className="text-lg text-gray-600">
                Understanding our academic grading system
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gradeScale.map((scale, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {scale.grade}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {scale.range}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    GPA: {scale.gpa}
                  </div>
                  <div className="text-xs text-gray-500">
                    {scale.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Performers */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Top Performers
              </h2>
              <p className="text-lg text-gray-600">
                Celebrating academic excellence across all grades
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">Position</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Student Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Grade</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Percentage</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Recognition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topPerformers.map((student, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Award className={`h-5 w-5 mr-2 ${
                              student.position === 1 ? 'text-yellow-500' :
                              student.position === 2 ? 'text-gray-400' :
                              student.position === 3 ? 'text-orange-600' : 'text-gray-300'
                            }`} />
                            <span className="font-medium">{student.position}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-red-600">
                          {student.percentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            student.position <= 3 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {student.position <= 3 ? 'Honor Roll' : 'Merit List'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-red-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help with Your Results?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our academic office for any questions about your results, 
              grade calculations, or academic performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Contact Academic Office
              </Link>
              <Link
                href="/school/student"
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors"
              >
                Student Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
