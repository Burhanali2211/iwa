'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Upload,
  Search,
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  maxMarks: number;
  description: string;
  instructions?: string;
  submissionStatus: 'SUBMITTED' | 'PENDING';
  userSubmission?: {
    id: string;
    submittedAt: string;
    status: string;
    grade?: number;
  };
}

export default function StudentAssignmentsPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');

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

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAssignment || !submissionContent.trim()) {
      toast.error('Please provide assignment content');
      return;
    }

    try {
      const response = await fetch('/api/assignments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId: selectedAssignment.id,
          content: submissionContent,
        }),
      });

      if (response.ok) {
        toast.success('Assignment submitted successfully!');
        setShowSubmissionModal(false);
        setSubmissionContent('');
        setSelectedAssignment(null);
        fetchAssignments();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to submit assignment');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error('Error submitting assignment');
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || assignment.submissionStatus === filterStatus;
    const matchesSubject = filterSubject === '' || assignment.subject === filterSubject;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const subjects = [...new Set(assignments.map(a => a.subject))];

  const getStatusColor = (assignment: Assignment) => {
    if (assignment.submissionStatus === 'SUBMITTED') {
      return 'bg-green-100 text-green-800';
    }
    
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) return 'bg-red-100 text-red-800'; // Overdue
    if (daysDiff <= 1) return 'bg-orange-100 text-orange-800'; // Due soon
    return 'bg-blue-100 text-blue-800'; // Pending
  };

  const getStatusText = (assignment: Assignment) => {
    if (assignment.submissionStatus === 'SUBMITTED') {
      return 'Submitted';
    }
    
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) return 'Overdue';
    if (daysDiff <= 1) return 'Due Soon';
    return 'Pending';
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <p className="text-gray-600 mt-1">View and submit your assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => a.submissionStatus === 'PENDING').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => a.submissionStatus === 'SUBMITTED').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => 
                    a.submissionStatus === 'PENDING' && new Date(a.dueDate) < new Date()
                  ).length}
                </p>
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
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="SUBMITTED">Submitted</option>
            </select>
            
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
              Showing: {filteredAssignments.length} assignments
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{assignment.title}</h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(assignment)}`}>
                      {getStatusText(assignment)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {assignment.subject}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      Max Marks: {assignment.maxMarks}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                  
                  {assignment.instructions && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
                      <p className="text-blue-800 text-sm">{assignment.instructions}</p>
                    </div>
                  )}
                  
                  {assignment.userSubmission && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-green-900 mb-2">Your Submission:</h4>
                      <p className="text-green-800 text-sm">
                        Submitted on: {new Date(assignment.userSubmission.submittedAt).toLocaleDateString()}
                      </p>
                      {assignment.userSubmission.grade && (
                        <p className="text-green-800 text-sm">
                          Grade: {assignment.userSubmission.grade}/{assignment.maxMarks}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                {assignment.submissionStatus === 'PENDING' && new Date(assignment.dueDate) > new Date() && (
                  <button
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setShowSubmissionModal(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Submit Assignment</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus || filterSubject 
                ? 'Try adjusting your search filters' 
                : 'No assignments have been assigned yet'}
            </p>
          </div>
        )}
      </main>

      {/* Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Submit Assignment: {selectedAssignment.title}
              </h2>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Assignment Details:</h3>
                <p className="text-sm text-gray-600 mb-1">Subject: {selectedAssignment.subject}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Due Date: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Max Marks: {selectedAssignment.maxMarks}</p>
              </div>
              
              <form onSubmit={handleSubmitAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Content *
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your assignment content here..."
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSubmissionModal(false);
                      setSubmissionContent('');
                      setSelectedAssignment(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Assignment
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
