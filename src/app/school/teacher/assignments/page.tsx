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
  FileText, 
  Clock,
  Edit,
  Eye,
  Trash2,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submissionCount: number;
  maxMarks: number;
  description: string;
  status: string;
}

export default function TeacherAssignmentsPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: '',
    maxMarks: '',
    instructions: '',
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/assignments');
      if (response.ok) {
        const data = await response.json();
        setAssignments(data.assignments || []);
      } else {
        toast.error('Failed to fetch assignments');
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Error loading assignments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newAssignment,
          maxMarks: parseInt(newAssignment.maxMarks),
        }),
      });

      if (response.ok) {
        toast.success('Assignment created successfully!');
        setShowCreateModal(false);
        setNewAssignment({
          title: '',
          description: '',
          subject: '',
          class: '',
          dueDate: '',
          maxMarks: '',
          instructions: '',
        });
        fetchAssignments();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to create assignment');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast.error('Error creating assignment');
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === '' || assignment.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = [...new Set(assignments.map(a => a.subject))];

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
            <h1 className="text-3xl font-bold text-gray-900">Assignment Management</h1>
            <p className="text-gray-600 mt-1">Create and manage assignments for your classes</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create Assignment</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search assignments..."
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
            <div className="text-sm text-gray-600 flex items-center">
              Total: {filteredAssignments.length} assignments
            </div>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {assignment.subject} - {assignment.class}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {assignment.submissionCount} submissions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      Max Marks: {assignment.maxMarks}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">{assignment.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  new Date(assignment.dueDate) > new Date() 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {new Date(assignment.dueDate) > new Date() ? 'Active' : 'Expired'}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/school/teacher/assignments/${assignment.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Edit Assignment"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Assignment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterSubject 
                ? 'Try adjusting your search filters' 
                : 'Create your first assignment to get started'}
            </p>
            {!searchTerm && !filterSubject && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Assignment
              </button>
            )}
          </div>
        )}
      </main>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Assignment</h2>
              
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignment Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter assignment title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAssignment.subject}
                      onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Mathematics, Islamic Studies"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAssignment.class}
                      onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Grade 8A, Grade 9B"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={newAssignment.dueDate}
                      onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Marks *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newAssignment.maxMarks}
                      onChange={(e) => setNewAssignment({...newAssignment, maxMarks: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter maximum marks"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe the assignment requirements..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={newAssignment.instructions}
                    onChange={(e) => setNewAssignment({...newAssignment, instructions: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Additional instructions for students..."
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
                    Create Assignment
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
