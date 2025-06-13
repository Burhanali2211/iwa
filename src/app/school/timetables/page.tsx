import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Clock, Calendar, Download, Filter, Search, BookOpen, Users } from 'lucide-react';

// Type definitions for timetable
interface TimetableEntry {
  subject: string;
  teacher: string;
  room: string;
}

interface WeeklyTimetable {
  Monday: TimetableEntry[];
  Tuesday: TimetableEntry[];
  Wednesday: TimetableEntry[];
  Thursday: TimetableEntry[];
  Friday: TimetableEntry[];
}

export default function TimetablesPage() {
  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const timeSlots = [
    '8:00 AM - 8:45 AM',
    '8:45 AM - 9:30 AM',
    '9:30 AM - 10:15 AM',
    '10:15 AM - 10:30 AM', // Break
    '10:30 AM - 11:15 AM',
    '11:15 AM - 12:00 PM',
    '12:00 PM - 12:45 PM',
    '12:45 PM - 1:30 PM', // Lunch
    '1:30 PM - 2:15 PM',
    '2:15 PM - 3:00 PM'
  ];

  const sampleTimetable: WeeklyTimetable = {
    'Monday': [
      { subject: 'Islamic Studies', teacher: 'Imam Abdullah', room: 'Room 101' },
      { subject: 'Arabic Language', teacher: 'Dr. Sarah Ahmed', room: 'Room 102' },
      { subject: 'Mathematics', teacher: 'Mr. Ahmed Khan', room: 'Room 103' },
      { subject: 'BREAK', teacher: '', room: '' },
      { subject: 'English Language', teacher: 'Ms. Fatima Ali', room: 'Room 104' },
      { subject: 'Science', teacher: 'Dr. Omar Hassan', room: 'Lab 1' },
      { subject: 'History', teacher: 'Prof. Yusuf Ibrahim', room: 'Room 105' },
      { subject: 'LUNCH', teacher: '', room: '' },
      { subject: 'Physical Education', teacher: 'Coach Malik', room: 'Gymnasium' },
      { subject: 'Art & Crafts', teacher: 'Ms. Aisha Khan', room: 'Art Room' }
    ],
    'Tuesday': [
      { subject: 'Quran Recitation', teacher: 'Qari Muhammad', room: 'Room 101' },
      { subject: 'Mathematics', teacher: 'Mr. Ahmed Khan', room: 'Room 103' },
      { subject: 'English Language', teacher: 'Ms. Fatima Ali', room: 'Room 104' },
      { subject: 'BREAK', teacher: '', room: '' },
      { subject: 'Science', teacher: 'Dr. Omar Hassan', room: 'Lab 1' },
      { subject: 'Arabic Language', teacher: 'Dr. Sarah Ahmed', room: 'Room 102' },
      { subject: 'Geography', teacher: 'Mr. Hassan Malik', room: 'Room 106' },
      { subject: 'LUNCH', teacher: '', room: '' },
      { subject: 'Computer Science', teacher: 'Ms. Zainab Ali', room: 'Computer Lab' },
      { subject: 'Islamic History', teacher: 'Ustadh Omar Ali', room: 'Room 107' }
    ],
    'Wednesday': [
      { subject: 'Islamic Studies', teacher: 'Imam Abdullah', room: 'Room 101' },
      { subject: 'Science', teacher: 'Dr. Omar Hassan', room: 'Lab 1' },
      { subject: 'Mathematics', teacher: 'Mr. Ahmed Khan', room: 'Room 103' },
      { subject: 'BREAK', teacher: '', room: '' },
      { subject: 'Arabic Language', teacher: 'Dr. Sarah Ahmed', room: 'Room 102' },
      { subject: 'English Language', teacher: 'Ms. Fatima Ali', room: 'Room 104' },
      { subject: 'Social Studies', teacher: 'Ms. Maryam Hassan', room: 'Room 108' },
      { subject: 'LUNCH', teacher: '', room: '' },
      { subject: 'Library Period', teacher: 'Librarian', room: 'Library' },
      { subject: 'Music', teacher: 'Mr. Ali Ahmad', room: 'Music Room' }
    ],
    'Thursday': [
      { subject: 'Hadith Studies', teacher: 'Imam Abdullah', room: 'Room 101' },
      { subject: 'Mathematics', teacher: 'Mr. Ahmed Khan', room: 'Room 103' },
      { subject: 'English Language', teacher: 'Ms. Fatima Ali', room: 'Room 104' },
      { subject: 'BREAK', teacher: '', room: '' },
      { subject: 'Science', teacher: 'Dr. Omar Hassan', room: 'Lab 1' },
      { subject: 'Arabic Language', teacher: 'Dr. Sarah Ahmed', room: 'Room 102' },
      { subject: 'Physical Education', teacher: 'Coach Malik', room: 'Gymnasium' },
      { subject: 'LUNCH', teacher: '', room: '' },
      { subject: 'Islamic Ethics', teacher: 'Ustadh Omar Ali', room: 'Room 107' },
      { subject: 'Study Hall', teacher: 'Various', room: 'Study Hall' }
    ],
    'Friday': [
      { subject: 'Quran Recitation', teacher: 'Qari Muhammad', room: 'Room 101' },
      { subject: 'Islamic Studies', teacher: 'Imam Abdullah', room: 'Room 101' },
      { subject: 'Mathematics', teacher: 'Mr. Ahmed Khan', room: 'Room 103' },
      { subject: 'BREAK', teacher: '', room: '' },
      { subject: 'English Language', teacher: 'Ms. Fatima Ali', room: 'Room 104' },
      { subject: 'Science', teacher: 'Dr. Omar Hassan', room: 'Lab 1' },
      { subject: 'JUMMAH PRAYER', teacher: 'All Students', room: 'Main Hall' },
      { subject: 'LUNCH', teacher: '', room: '' },
      { subject: 'Community Service', teacher: 'Various', room: 'Various' },
      { subject: 'Assembly', teacher: 'All Staff', room: 'Main Hall' }
    ]
  };

  const academicCalendar = [
    {
      event: 'First Semester Begins',
      date: '2025-09-01',
      type: 'academic'
    },
    {
      event: 'Mid-term Examinations',
      date: '2025-10-15',
      type: 'exam'
    },
    {
      event: 'Eid ul-Adha Holiday',
      date: '2025-06-17',
      type: 'holiday'
    },
    {
      event: 'Parent-Teacher Conference',
      date: '2025-11-20',
      type: 'event'
    },
    {
      event: 'Winter Break Begins',
      date: '2025-12-20',
      type: 'holiday'
    },
    {
      event: 'Second Semester Begins',
      date: '2025-01-08',
      type: 'academic'
    },
    {
      event: 'Final Examinations',
      date: '2025-05-15',
      type: 'exam'
    },
    {
      event: 'Graduation Ceremony',
      date: '2025-06-15',
      type: 'event'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Clock className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                School Timetables
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Access class schedules, academic calendar, and important dates. 
                Stay organized with our comprehensive timetable system.
              </p>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-2" />
                  <span>Daily Schedules</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-6 w-6 mr-2" />
                  <span>PDF Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grade Selection */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Select Grade:</label>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <option value="">Choose Grade Level</option>
                  {grades.map((grade, index) => (
                    <option key={index} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Timetable */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Weekly Class Schedule - Grade 8
              </h2>
              <p className="text-lg text-gray-600">
                Sample timetable showing daily class schedule
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-teal-600 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Monday</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Tuesday</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Wednesday</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Thursday</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Friday</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timeSlots.map((time, index) => (
                      <tr key={index} className={`${
                        time.includes('BREAK') || time.includes('LUNCH') ? 'bg-gray-50' : 'bg-white'
                      }`}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {time}
                        </td>
                        {Object.keys(sampleTimetable).map((day) => {
                          const subject = sampleTimetable[day as keyof WeeklyTimetable][index];
                          const isBreak = subject?.subject === 'BREAK' || subject?.subject === 'LUNCH' || subject?.subject === 'JUMMAH PRAYER';
                          
                          return (
                            <td key={day} className="px-4 py-3">
                              {subject && (
                                <div className={`text-sm ${isBreak ? 'text-center font-medium text-gray-600' : ''}`}>
                                  <div className={`${isBreak ? '' : 'font-medium text-gray-900'}`}>
                                    {subject.subject}
                                  </div>
                                  {!isBreak && (
                                    <>
                                      <div className="text-xs text-gray-600">{subject.teacher}</div>
                                      <div className="text-xs text-gray-500">{subject.room}</div>
                                    </>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Calendar */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Academic Calendar 2025-2025
              </h2>
              <p className="text-lg text-gray-600">
                Important dates and events throughout the academic year
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {academicCalendar.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-3">
                    <Calendar className="h-6 w-6 text-teal-600 mr-3" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'exam' ? 'bg-red-100 text-red-800' :
                      item.type === 'holiday' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.event}
                  </h3>
                  
                  <div className="text-teal-600 font-medium">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Access
              </h2>
              <p className="text-lg text-gray-600">
                Frequently accessed timetable resources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/school/timetables?grade=primary"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
              >
                <BookOpen className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Primary School</h3>
                <p className="text-sm text-gray-600">Grades 1-5 Timetables</p>
              </Link>
              
              <Link
                href="/school/timetables?grade=middle"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
              >
                <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Middle School</h3>
                <p className="text-sm text-gray-600">Grades 6-8 Timetables</p>
              </Link>
              
              <Link
                href="/school/timetables?grade=high"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
              >
                <Clock className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">High School</h3>
                <p className="text-sm text-gray-600">Grades 9-12 Timetables</p>
              </Link>
              
              <Link
                href="/school/timetables?type=exam"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center"
              >
                <Calendar className="h-8 w-8 text-teal-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Exam Schedule</h3>
                <p className="text-sm text-gray-600">Test and Exam Dates</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Timetable Notes */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-teal-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Important Timetable Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Class Timings</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Each period is 45 minutes long</li>
                    <li>• Morning break: 10:15 AM - 10:30 AM</li>
                    <li>• Lunch break: 12:45 PM - 1:30 PM</li>
                    <li>• Friday Jummah prayer: 12:00 PM - 1:30 PM</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Special Notes</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Timetables may change due to special events</li>
                    <li>• Check for updates regularly</li>
                    <li>• Contact office for any clarifications</li>
                    <li>• Download PDF versions for offline access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help with Timetables?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our academic office for any questions about class schedules, 
              room changes, or special arrangements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Contact Academic Office
              </Link>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                Download All Timetables
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
