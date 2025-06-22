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
  Upload,
  User,
  Calendar,
  Clock,
  Languages,
  FileText,
  Star,
  Book,
  CheckCircle,
  AlertCircle,
  Volume2
} from 'lucide-react';

interface Khutba {
  id: string;
  title: string;
  content: string;
  speaker: string;
  date: string;
  duration: number;
  language: string;
  category: string;
  attachments: string[];
  isPublished: boolean;
  summary: string;
  keywords: string[];
  audience: string;
  mosque: string;
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  specialization: string;
  image: string;
}

export default function KhutbaPage() {
  const router = useRouter();
  const [khutbas, setKhutbas] = useState<Khutba[]>([
    {
      id: '1',
      title: 'The Importance of Prayer in Islam',
      content: 'In this khutba, we will discuss the fundamental importance of prayer in our daily lives...',
      speaker: 'Imam Abdullah',
      date: '2024-01-19',
      duration: 25,
      language: 'English',
      category: 'Worship',
      attachments: ['khutba-1.pdf', 'audio-1.mp3'],
      isPublished: true,
      summary: 'A comprehensive discussion on the importance of prayer and its spiritual benefits.',
      keywords: ['prayer', 'worship', 'spirituality', 'daily routine'],
      audience: 'General',
      mosque: 'Main Mosque'
    },
    {
      id: '2',
      title: 'Building Strong Family Bonds',
      content: 'Family is the foundation of society. Today we will explore how to strengthen our family relationships...',
      speaker: 'Imam Fatima',
      date: '2024-01-12',
      duration: 30,
      language: 'English',
      category: 'Family',
      attachments: ['khutba-2.pdf'],
      isPublished: true,
      summary: 'Guidance on building and maintaining strong family relationships in Islam.',
      keywords: ['family', 'relationships', 'marriage', 'children'],
      audience: 'Families',
      mosque: 'Community Center'
    }
  ]);

  const [speakers] = useState<Speaker[]>([
    { id: '1', name: 'Imam Abdullah', title: 'Senior Imam', specialization: 'Islamic Law', image: '/imam1.jpg' },
    { id: '2', name: 'Imam Fatima', title: 'Associate Imam', specialization: 'Family Counseling', image: '/imam2.jpg' },
    { id: '3', name: 'Imam Hassan', title: 'Youth Imam', specialization: 'Youth Development', image: '/imam3.jpg' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterLanguage, setFilterLanguage] = useState('ALL');
  const [filterSpeaker, setFilterSpeaker] = useState('ALL');
  const [showKhutbaModal, setShowKhutbaModal] = useState(false);
  const [selectedKhutba, setSelectedKhutba] = useState<Khutba | null>(null);

  const categories = ['ALL', 'Worship', 'Family', 'Social Issues', 'Islamic History', 'Contemporary Issues', 'Youth', 'Women'];
  const languages = ['ALL', 'English', 'Arabic', 'Urdu', 'French', 'Spanish'];
  const audiences = ['General', 'Youth', 'Families', 'Women', 'Men', 'Children'];

  const filteredKhutbas = khutbas.filter(khutba => {
    const matchesSearch = khutba.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         khutba.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         khutba.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || khutba.category === filterCategory;
    const matchesLanguage = filterLanguage === 'ALL' || khutba.language === filterLanguage;
    const matchesSpeaker = filterSpeaker === 'ALL' || khutba.speaker === filterSpeaker;
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesSpeaker;
  });

  const handleAddKhutba = () => {
    setSelectedKhutba(null);
    setShowKhutbaModal(true);
  };

  const handleEditKhutba = (khutba: Khutba) => {
    setSelectedKhutba(khutba);
    setShowKhutbaModal(true);
  };

  const handleDeleteKhutba = (khutbaId: string) => {
    if (confirm('Are you sure you want to delete this khutba?')) {
      setKhutbas(prev => prev.filter(khutba => khutba.id !== khutbaId));
      toast.success('Khutba deleted successfully');
    }
  };

  const handleSaveKhutba = (khutbaData: Omit<Khutba, 'id'>) => {
    if (selectedKhutba) {
      // Edit existing khutba
      setKhutbas(prev => prev.map(khutba => 
        khutba.id === selectedKhutba.id 
          ? { ...khutbaData, id: selectedKhutba.id }
          : khutba
      ));
      toast.success('Khutba updated successfully');
    } else {
      // Add new khutba
      const newKhutba = { ...khutbaData, id: Date.now().toString() };
      setKhutbas(prev => [...prev, newKhutba]);
      toast.success('Khutba added successfully');
    }
    setShowKhutbaModal(false);
  };

  const handlePreview = (khutba: Khutba) => {
    toast.success(`Previewing: ${khutba.title}`);
  };

  const handleDownload = (khutba: Khutba) => {
    toast.success(`Downloading: ${khutba.title}`);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Khutba Management</h1>
          <p className="text-text-secondary">Manage sermons, speakers, and religious content</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => router.push('/admin/khutba/speakers')}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Manage Speakers</span>
          </button>
          <button
            onClick={handleAddKhutba}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Khutba</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Khutbas</p>
              <p className="text-2xl font-bold text-gray-900">{khutbas.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{khutbas.filter(k => k.isPublished).length}</p>
            </div>
            <Eye className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Speakers</p>
              <p className="text-2xl font-bold text-gray-900">{speakers.length}</p>
            </div>
            <User className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Languages</p>
              <p className="text-2xl font-bold text-gray-900">{new Set(khutbas.map(k => k.language)).size}</p>
            </div>
            <Languages className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search khutbas..."
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
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterSpeaker}
              onChange={(e) => setFilterSpeaker(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="ALL">All Speakers</option>
              {speakers.map(speaker => (
                <option key={speaker.id} value={speaker.name}>{speaker.name}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-500 flex items-center justify-center">
            {filteredKhutbas.length} khutbas found
          </div>
        </div>
      </div>

      {/* Khutbas Grid */}
      <div className="space-y-4">
        {filteredKhutbas.map((khutba) => (
          <div key={khutba.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {khutba.category}
                </div>
                <div className="flex items-center space-x-2">
                  {khutba.isPublished ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Published</span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Draft</span>
                  )}
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{khutba.language}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreview(khutba)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Eye className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDownload(khutba)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleEditKhutba(khutba)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteKhutba(khutba.id)}
                  className="p-2 hover:bg-red-100 rounded"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{khutba.title}</h3>
            <p className="text-gray-600 mb-4">{khutba.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{khutba.speaker}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {new Date(khutba.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{formatDuration(khutba.duration)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{khutba.audience}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Content Preview</h4>
                <p className="text-gray-600 text-sm line-clamp-3">{khutba.content}</p>
              </div>

              {khutba.keywords.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {khutba.keywords.map((keyword, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {khutba.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {khutba.attachments.map((attachment, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center">
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

      {filteredKhutbas.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No khutbas found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterCategory !== 'ALL' || filterLanguage !== 'ALL' || filterSpeaker !== 'ALL'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first khutba.'
            }
          </p>
          {!searchTerm && filterCategory === 'ALL' && filterLanguage === 'ALL' && filterSpeaker === 'ALL' && (
            <button
              onClick={handleAddKhutba}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add First Khutba
            </button>
          )}
        </div>
      )}

      {/* Khutba Modal */}
      {showKhutbaModal && (
        <KhutbaModal
          khutba={selectedKhutba}
          onClose={() => setShowKhutbaModal(false)}
          onSave={handleSaveKhutba}
          speakers={speakers}
          categories={categories.filter(c => c !== 'ALL')}
          languages={languages.filter(l => l !== 'ALL')}
          audiences={audiences}
        />
      )}
    </div>
  );
}

// Khutba Modal Component
interface KhutbaModalProps {
  khutba: Khutba | null;
  onClose: () => void;
  onSave: (khutbaData: Omit<Khutba, 'id'>) => void;
  speakers: Speaker[];
  categories: string[];
  languages: string[];
  audiences: string[];
}

function KhutbaModal({ khutba, onClose, onSave, speakers, categories, languages, audiences }: KhutbaModalProps) {
  const [formData, setFormData] = useState({
    title: khutba?.title || '',
    content: khutba?.content || '',
    speaker: khutba?.speaker || '',
    date: khutba?.date || new Date().toISOString().split('T')[0],
    duration: khutba?.duration || 30,
    language: khutba?.language || 'English',
    category: khutba?.category || 'Worship',
    attachments: khutba?.attachments || [],
    isPublished: khutba?.isPublished ?? false,
    summary: khutba?.summary || '',
    keywords: khutba?.keywords || [],
    audience: khutba?.audience || 'General',
    mosque: khutba?.mosque || 'Main Mosque'
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newAttachment, setNewAttachment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    onSave(formData);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData({ ...formData, keywords: [...formData.keywords, newKeyword.trim()] });
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData({ ...formData, keywords: formData.keywords.filter(keyword => keyword !== keywordToRemove) });
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim() && !formData.attachments.includes(newAttachment.trim())) {
      setFormData({ ...formData, attachments: [...formData.attachments, newAttachment.trim()] });
      setNewAttachment('');
    }
  };

  const handleRemoveAttachment = (attachmentToRemove: string) => {
    setFormData({ ...formData, attachments: formData.attachments.filter(attachment => attachment !== attachmentToRemove) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {khutba ? 'Edit Khutba' : 'Add New Khutba'}
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
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speaker *
                </label>
                <select
                  value={formData.speaker}
                  onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Speaker</option>
                  {speakers.map(speaker => (
                    <option key={speaker.id} value={speaker.name}>{speaker.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Audience
                </label>
                <select
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {audiences.map(audience => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mosque
                </label>
                <input
                  type="text"
                  value={formData.mosque}
                  onChange={(e) => setFormData({...formData, mosque: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Brief summary of the khutba..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Full content of the khutba..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.keywords.map((keyword, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(keyword)}
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
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Add a keyword..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
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
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {attachment}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(attachment)}
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

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
              </label>
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
                {khutba ? 'Update Khutba' : 'Add Khutba'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 