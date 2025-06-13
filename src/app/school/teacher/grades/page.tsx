'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  Plus, 
  BookOpen, 
  Calendar, 
  Users, 
  Award, 
  Search,
  Filter,
  Edit,
  Eye,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Grade {
  id: string;
  examName: string;
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  examDate: string;
  remarks?: string;
  student: {
    user: {
      name: string;
      email: string;
    };
    rollNumber: string;
    class: string;
  };
}

export default function TeacherGradesPage() {
  const router = useRouter();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterExam, setFilterExam] = useState('');

  const [newGrade, setNewGrade] = useState({
    studentId: '',
    examName: '',
    subject: '',
    maxMarks: '',
    obtainedMarks: '',
    examDate: '',
    remarks: '',
  });

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const response = await fetch('/api/grades');
      if (response.ok) {
        const data = await response.json();
        setGrades(data.grades || []);
      } else {
        toast.error('Failed to fetch grades');
      }
    } catch (error) {
      console.error('Error fetching grades:', error);
      toast.error('Error loading grades');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/grades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGrade,
          maxMarks: parseInt(newGrade.maxMarks),
          obtainedMarks: parseInt(newGrade.obtainedMarks),
        }),
      });

      if (response.ok) {
        toast.success('Grade added successfully!');
        setShowCreateModal(false);
        setNewGrade({
          studentId: '',
          examName: '',
          subject: '',
          maxMarks: '',
          obtainedMarks: '',
          examDate: '',
          remarks: '',
        });
        fetchGrades();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to add grade');
      }
    } catch (error) {
      console.error('Error creating grade:', error);
      toast.error('Error adding grade');
    }
  };

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.student.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.examName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === '' || grade.subject === filterSubject;
    const matchesExam = filterExam === '' || grade.examName === filterExam;
    return matchesSearch && matchesSubject && matchesExam;
  });

  const subjects = [...new Set(grades.map(g => g.subject))];
  const exams = [...new Set(grades.map(g => g.examName))];

  const calculateStats = () => {
    if (filteredGrades.length === 0) return { average: 0, highest: 0, lowest: 0, passRate: 0 };
    
    const percentages = filteredGrades.map(g => (g.obtainedMarks / g.maxMarks) * 100);
    const average = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
    const highest = Math.max(...percentages);
    const lowest = Math.min(...percentages);
    const passRate = (percentages.filter(p => p >= 40).length / percentages.length) * 100;
    
    return { average, highest, lowest, passRate };
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grade Management</h1>
            <p className="text-gray-600 mt-1">Manage student grades and exam results</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Grade</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average</p>
                <p className="text-2xl font-bold text-gray-900">{stats.average.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Highest</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highest.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lowest</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowest.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.passRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students or exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            
            <select
              value={filterExam}
              onChange={(e) => setFilterExam(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Exams</option>
              {exams.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
            
            <div className="text-sm text-gray-600 flex items-center">
              Total: {filteredGrades.length} grades
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGrades.map((grade) => {
                  const percentage = ((grade.obtainedMarks / grade.maxMarks) * 100).toFixed(1);
                  return (
                    <tr key={grade.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {grade.student.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {grade.student.rollNumber} - {grade.student.class}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {grade.examName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {grade.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {grade.obtainedMarks}/{grade.maxMarks}
                        </div>
                        <div className="text-sm text-gray-500">
                          {percentage}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          grade.grade === 'A+' || grade.grade === 'A' ? 'bg-green-100 text-green-800' :
                          grade.grade === 'B+' || grade.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                          grade.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                          grade.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(grade.examDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredGrades.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No grades found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterSubject || filterExam 
                ? 'Try adjusting your search filters' 
                : 'Start by adding grades for your students'}
            </p>
            {!searchTerm && !filterSubject && !filterExam && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Grade
              </button>
            )}
          </div>
        )}
      </main>

      {/* Create Grade Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Grade</h2>
              
              <form onSubmit={handleCreateGrade} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGrade.studentId}
                      onChange={(e) => setNewGrade({...newGrade, studentId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter student ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGrade.examName}
                      onChange={(e) => setNewGrade({...newGrade, examName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Mid-term Exam"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={newGrade.subject}
                      onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={newGrade.examDate}
                      onChange={(e) => setNewGrade({...newGrade, examDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Marks *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newGrade.maxMarks}
                      onChange={(e) => setNewGrade({...newGrade, maxMarks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter maximum marks"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Obtained Marks *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newGrade.obtainedMarks}
                      onChange={(e) => setNewGrade({...newGrade, obtainedMarks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter obtained marks"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={newGrade.remarks}
                    onChange={(e) => setNewGrade({...newGrade, remarks: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional remarks about performance..."
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Grade
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
