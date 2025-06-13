'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import { 
  Save, 
  Eye, 
  ArrowLeft,
  School,
  Bell,
  Users,
  FileText,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SchoolContentForm {
  type: 'course' | 'announcement' | 'faculty' | 'timetable' | 'assignment';
  title: string;
  description: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  metadata: Record<string, string | number | boolean>;
}

const contentTypes = [
  { value: 'course', label: 'Course', icon: School, description: 'Educational courses and programs' },
  { value: 'announcement', label: 'Announcement', icon: Bell, description: 'Important notices and updates' },
  { value: 'faculty', label: 'Faculty', icon: Users, description: 'Faculty member profiles' },
  { value: 'timetable', label: 'Timetable', icon: Calendar, description: 'Class schedules and timing' },
  { value: 'assignment', label: 'Assignment', icon: FileText, description: 'Student assignments and tasks' }
];

export default function CreateSchoolContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<SchoolContentForm>({
    type: 'course',
    title: '',
    description: '',
    content: '',
    status: 'draft',
    metadata: {}
  });

  const [errors, setErrors] = useState<Partial<SchoolContentForm>>({});

  const validateForm = () => {
    const newErrors: Partial<SchoolContentForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        status: publish ? 'published' : 'draft'
      };

      const response = await fetch('/api/cms/school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`School content ${publish ? 'published' : 'saved as draft'} successfully!`);
        router.push('/admin/cms/school');
      } else {
        toast.error(result.error || 'Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SchoolContentForm, value: string | Record<string, string | number | boolean>) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMetadataChange = (key: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value }
    }));
  };

  const renderTypeSpecificFields = () => {
    switch (formData.type) {
      case 'course':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={String(formData.metadata.duration || '')}
                onChange={(e) => handleMetadataChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 6 months, 12 weeks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level
              </label>
              <select
                value={String(formData.metadata.level || '')}
                onChange={(e) => handleMetadataChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prerequisites
              </label>
              <input
                type="text"
                value={String(formData.metadata.prerequisites || '')}
                onChange={(e) => handleMetadataChange('prerequisites', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Basic Arabic reading"
              />
            </div>
          </div>
        );

      case 'announcement':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={String(formData.metadata.priority || '')}
                onChange={(e) => handleMetadataChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={String(formData.metadata.expiryDate || '')}
                onChange={(e) => handleMetadataChange('expiryDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'faculty':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                value={String(formData.metadata.department || '')}
                onChange={(e) => handleMetadataChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Islamic Studies, Arabic Language"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualifications
              </label>
              <input
                type="text"
                value={String(formData.metadata.qualifications || '')}
                onChange={(e) => handleMetadataChange('qualifications', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., PhD in Islamic Studies"
              />
            </div>
          </div>
        );

      case 'assignment':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={String(formData.metadata.dueDate || '')}
                onChange={(e) => handleMetadataChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={String(formData.metadata.subject || '')}
                onChange={(e) => handleMetadataChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Quran Studies, Islamic History"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade
              </label>
              <input
                type="text"
                value={String(formData.metadata.grade || '')}
                onChange={(e) => handleMetadataChange('grade', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Grade 8, Level 2"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'School Management', href: '/admin/cms/school' },
    { label: 'Create Content' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => router.back()}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
      <button
        onClick={(e) => handleSubmit(e, false)}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        <span>Save Draft</span>
      </button>
      <button
        onClick={(e) => handleSubmit(e, true)}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
      >
        <Eye className="h-4 w-4" />
        <span>Publish</span>
      </button>
    </div>
  );

  return (
    <CMSLayout
      title="Create School Content"
      description="Add new content to the school management system"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        {/* Content Type Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('type', type.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.type === type.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`h-6 w-6 mb-2 ${
                    formData.type === type.value ? 'text-green-600' : 'text-gray-600'
                  }`} />
                  <h4 className="font-medium text-gray-900">{type.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter content title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of the content"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter the detailed content..."
              />
            </div>
          </div>
        </div>

        {/* Type-specific Fields */}
        {renderTypeSpecificFields() && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Details
            </h3>
            {renderTypeSpecificFields()}
          </div>
        )}
      </form>
    </CMSLayout>
  );
}
