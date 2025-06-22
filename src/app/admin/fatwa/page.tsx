'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Download,
  User,
  Calendar,
  Clock,
  Languages,
  FileText,
  Star,
  Book,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Fatwa {
  id: string;
  question: string;
  answer: string;
  questioner: string;
  mufti: string;
  date: string;
  category: string;
  language: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  tags: string[];
  references: string[];
  isPublic: boolean;
  priority: 'Low' | 'Medium' | 'High';
  attachments: string[];
}

interface Mufti {
  id: string;
  name: string;
  title: string;
  specialization: string;
  credentials: string;
  image: string;
}

export default function FatwaPage() {
  const router = useRouter();
  const [fatwas, setFatwas] = useState<Fatwa[]>([
    {
      id: '1',
      question: 'Is it permissible to use credit cards with interest?',
      answer: 'According to Islamic law, dealing with interest (riba) is strictly prohibited. Credit cards that involve interest payments are not permissible. However, there are Islamic alternatives available such as Islamic credit cards that operate on a fee-based system without interest.',
      questioner: 'Ahmed Hassan',
      mufti: 'Dr. Abdullah Al-Rashid',
      date: '2024-01-15',
      category: 'Finance',
      language: 'English',
      status: 'Approved',
      tags: ['finance', 'riba', 'credit-cards', 'banking'],
      references: ['Quran 2:275-276', 'Sahih Bukhari 2086'],
      isPublic: true,
      priority: 'High',
      attachments: ['fatwa-1.pdf']
    },
    {
      id: '2',
      question: 'What is the ruling on using social media during Ramadan?',
      answer: 'Social media use during Ramadan is permissible as long as it doesn\'t interfere with your religious obligations. However, it\'s recommended to limit usage and focus on spiritual activities, Quran recitation, and family time.',
      questioner: 'Fatima Ali',
      mufti: 'Sheikh Muhammad Al-Zahra',
      date: '2024-01-10',
      category: 'Technology',
      language: 'English',
      status: 'Approved',
      tags: ['ramadan', 'social-media', 'technology', 'worship'],
      references: ['Quran 2:183', 'Sahih Muslim 1151'],
      isPublic: true,
      priority: 'Medium',
      attachments: []
    }
  ]);

  const [muftis] = useState<Mufti[]>([
    { id: '1', name: 'Dr. Abdullah Al-Rashid', title: 'Senior Mufti', specialization: 'Islamic Finance', credentials: 'PhD Islamic Law, Al-Azhar University', image: '/mufti1.jpg' },
    { id: '2', name: 'Sheikh Muhammad Al-Zahra', title: 'Associate Mufti', specialization: 'Contemporary Issues', credentials: 'MA Islamic Studies, Islamic University of Madinah', image: '/mufti2.jpg' },
    { id: '3', name: 'Dr. Aisha Al-Mahmoud', title: 'Senior Mufti', specialization: 'Family Law', credentials: 'PhD Islamic Jurisprudence, Umm Al-Qura University', image: '/mufti3.jpg' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterLanguage, setFilterLanguage] = useState('ALL');
  const [showFatwaModal, setShowFatwaModal] = useState(false);
  const [selectedFatwa, setSelectedFatwa] = useState<Fatwa | null>(null);

  const categories = ['ALL', 'Finance', 'Family', 'Technology', 'Health', 'Education', 'Politics', 'Social Issues', 'Worship'];
  const statuses = ['ALL', 'Approved', 'Pending', 'Rejected'];
  const priorities = ['ALL', 'Low', 'Medium', 'High'];
  const languages = ['ALL', 'English', 'Arabic', 'Urdu', 'French', 'Spanish'];

  const filteredFatwas = fatwas.filter(fatwa => {
    const matchesSearch = fatwa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatwa.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatwa.questioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fatwa.mufti.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || fatwa.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || fatwa.status === filterStatus;
    const matchesPriority = filterPriority === 'ALL' || fatwa.priority === filterPriority;
    const matchesLanguage = filterLanguage === 'ALL' || fatwa.language === filterLanguage;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesLanguage;
  });

  const handleAddFatwa = () => {
    setSelectedFatwa(null);
    setShowFatwaModal(true);
  };

  const handleEditFatwa = (fatwa: Fatwa) => {
    setSelectedFatwa(fatwa);
    setShowFatwaModal(true);
  };

  const handleDeleteFatwa = (fatwaId: string) => {
    if (confirm('Are you sure you want to delete this fatwa?')) {
      setFatwas(prev => prev.filter(fatwa => fatwa.id !== fatwaId));
      toast.success('Fatwa deleted successfully');
    }
  };

  const handleSaveFatwa = (fatwaData: Omit<Fatwa, 'id'>) => {
    if (selectedFatwa) {
      // Edit existing fatwa
      setFatwas(prev => prev.map(fatwa => 
        fatwa.id === selectedFatwa.id 
          ? { ...fatwaData, id: selectedFatwa.id }
          : fatwa
      ));
      toast.success('Fatwa updated successfully');
    } else {
      // Add new fatwa
      const newFatwa = { ...fatwaData, id: Date.now().toString() };
      setFatwas(prev => [...prev, newFatwa]);
      toast.success('Fatwa added successfully');
    }
    setShowFatwaModal(false);
  };

  const handlePreview = (fatwa: Fatwa) => {
    toast.success(`Previewing: ${fatwa.question.substring(0, 50)}...`);
  };

  const handleDownload = (fatwa: Fatwa) => {
    toast.success(`Downloading: ${fatwa.question.substring(0, 50)}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: fatwas.length,
    approved: fatwas.filter(f => f.status === 'Approved').length,
    pending: fatwas.filter(f => f.status === 'Pending').length,
    rejected: fatwas.filter(f => f.status === 'Rejected').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fatwa Database</h1>
          <p className="text-text-secondary">Manage Islamic rulings and religious guidance</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push('/admin/fatwa/muftis')}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Manage Muftis</span>
          </button>
          <button
            onClick={handleAddFatwa}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Fatwa</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Fatwas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search fatwas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-500 flex items-center justify-center">
            {filteredFatwas.length} fatwas found
          </div>
        </div>
      </div>

      {/* Fatwas Grid */}
      <div className="space-y-4">
        {filteredFatwas.map((fatwa) => (
          <div key={fatwa.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {fatwa.category}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(fatwa.status)}`}>
                    {fatwa.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(fatwa.priority)}`}>
                    {fatwa.priority}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{fatwa.language}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreview(fatwa)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Eye className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDownload(fatwa)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleEditFatwa(fatwa)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteFatwa(fatwa.id)}
                  className="p-2 hover:bg-red-100 rounded"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Question */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Question</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{fatwa.question}</p>
              </div>

              {/* Answer */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Answer</h4>
                <p className="text-gray-600">{fatwa.answer}</p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Questioner</p>
                    <p className="text-sm font-medium text-gray-900">{fatwa.questioner}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Mufti</p>
                    <p className="text-sm font-medium text-gray-900">{fatwa.mufti}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(fatwa.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Book className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Public</p>
                    <p className="text-sm font-medium text-gray-900">
                      {fatwa.isPublic ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {fatwa.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {fatwa.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* References */}
              {fatwa.references.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">References</h4>
                  <div className="flex flex-wrap gap-2">
                    {fatwa.references.map((reference, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {reference}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {fatwa.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {fatwa.attachments.map((attachment, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        {attachment}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredFatwas.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No fatwas found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterCategory !== 'ALL' || filterStatus !== 'ALL' || filterPriority !== 'ALL' || filterLanguage !== 'ALL'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first fatwa.'
            }
          </p>
          {!searchTerm && filterCategory === 'ALL' && filterStatus === 'ALL' && filterPriority === 'ALL' && filterLanguage === 'ALL' && (
            <button
              onClick={handleAddFatwa}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add First Fatwa
            </button>
          )}
        </div>
      )}

      {/* Fatwa Modal */}
      {showFatwaModal && (
        <FatwaModal
          fatwa={selectedFatwa}
          onClose={() => setShowFatwaModal(false)}
          onSave={handleSaveFatwa}
          muftis={muftis}
          categories={categories.filter(c => c !== 'ALL')}
          statuses={statuses.filter(s => s !== 'ALL')}
          priorities={priorities.filter(p => p !== 'ALL')}
          languages={languages.filter(l => l !== 'ALL')}
        />
      )}
    </div>
  );
}

// Fatwa Modal Component
interface FatwaModalProps {
  fatwa: Fatwa | null;
  onClose: () => void;
  onSave: (fatwaData: Omit<Fatwa, 'id'>) => void;
  muftis: Mufti[];
  categories: string[];
  statuses: string[];
  priorities: string[];
  languages: string[];
}

function FatwaModal({ fatwa, onClose, onSave, muftis, categories, statuses, priorities, languages }: FatwaModalProps) {
  const [formData, setFormData] = useState({
    question: fatwa?.question || '',
    answer: fatwa?.answer || '',
    questioner: fatwa?.questioner || '',
    mufti: fatwa?.mufti || '',
    date: fatwa?.date || new Date().toISOString().split('T')[0],
    category: fatwa?.category || 'Finance',
    language: fatwa?.language || 'English',
    status: fatwa?.status || 'Pending',
    tags: fatwa?.tags || [],
    references: fatwa?.references || [],
    isPublic: fatwa?.isPublic ?? true,
    priority: fatwa?.priority || 'Medium',
    attachments: fatwa?.attachments || []
  });

  const [newTag, setNewTag] = useState('');
  const [newReference, setNewReference] = useState('');
  const [newAttachment, setNewAttachment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Question and answer are required');
      return;
    }
    onSave(formData);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleAddReference = () => {
    if (newReference.trim() && !formData.references.includes(newReference.trim())) {
      setFormData({ ...formData, references: [...formData.references, newReference.trim()] });
      setNewReference('');
    }
  };

  const handleRemoveReference = (referenceToRemove: string) => {
    setFormData({ ...formData, references: formData.references.filter(ref => ref !== referenceToRemove) });
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim() && !formData.attachments.includes(newAttachment.trim())) {
      setFormData({ ...formData, attachments: [...formData.attachments, newAttachment.trim()] });
      setNewAttachment('');
    }
  };

  const handleRemoveAttachment = (attachmentToRemove: string) => {
    setFormData({ ...formData, attachments: formData.attachments.filter(att => att !== attachmentToRemove) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {fatwa ? 'Edit Fatwa' : 'Add New Fatwa'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <span className="text-2xl">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Questioner *
                </label>
                <input
                  type="text"
                  value={formData.questioner}
                  onChange={(e) => setFormData({...formData, questioner: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mufti *
                </label>
                <select
                  value={formData.mufti}
                  onChange={(e) => setFormData({...formData, mufti: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Mufti</option>
                  {muftis.map(mufti => (
                    <option key={mufti.id} value={mufti.name}>{mufti.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question *
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter the question..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter the detailed answer..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Public Fatwa</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                References
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.references.map((reference, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {reference}
                    <button
                      type="button"
                      onClick={() => handleRemoveReference(reference)}
                      className="ml-2 text-green-500 hover:text-green-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newReference}
                  onChange={(e) => setNewReference(e.target.value)}
                  placeholder="Add a reference..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddReference}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.attachments.map((attachment, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {attachment}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(attachment)}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newAttachment}
                  onChange={(e) => setNewAttachment(e.target.value)}
                  placeholder="Add attachment filename..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddAttachment}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {fatwa ? 'Update Fatwa' : 'Add Fatwa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 