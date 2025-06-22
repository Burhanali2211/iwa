'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Duration
              </label>
              <input
                type="text"
                value={String(formData.metadata.duration || '')}
                onChange={(e) => handleMetadataChange('duration', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., 6 months, 12 weeks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Level
              </label>
              <select
                value={String(formData.metadata.level || '')}
                onChange={(e) => handleMetadataChange('level', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Prerequisites
              </label>
              <input
                type="text"
                value={String(formData.metadata.prerequisites || '')}
                onChange={(e) => handleMetadataChange('prerequisites', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Basic Arabic reading"
              />
            </div>
          </div>
        );

      case 'announcement':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Priority
              </label>
              <select
                value={String(formData.metadata.priority || '')}
                onChange={(e) => handleMetadataChange('priority', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={String(formData.metadata.expiryDate || '')}
                onChange={(e) => handleMetadataChange('expiryDate', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        );

      case 'faculty':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Department
              </label>
              <input
                type="text"
                value={String(formData.metadata.department || '')}
                onChange={(e) => handleMetadataChange('department', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Islamic Studies, Arabic Language"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Qualifications
              </label>
              <input
                type="text"
                value={String(formData.metadata.qualifications || '')}
                onChange={(e) => handleMetadataChange('qualifications', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., PhD in Islamic Studies"
              />
            </div>
          </div>
        );

      case 'assignment':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={String(formData.metadata.dueDate || '')}
                onChange={(e) => handleMetadataChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Subject
              </label>
              <input
                type="text"
                value={String(formData.metadata.subject || '')}
                onChange={(e) => handleMetadataChange('subject', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Fiqh, Hadith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Grade
              </label>
              <input
                type="text"
                value={String(formData.metadata.grade || '')}
                onChange={(e) => handleMetadataChange('grade', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Grade 8, Level 2"
              />
            </div>
          </div>
        );

      case 'timetable':
        return (
          <div>
            <p className="text-sm text-text-secondary">Timetable specific fields can be added here.</p>
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

  return (
    <div className="p-1">
      <header className="bg-surface p-6 rounded-lg shadow-card mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center text-sm text-text-muted mb-2">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {crumb.href ? (
                    <span className="cursor-pointer hover:text-foreground" onClick={() => router.push(crumb.href!)}>{crumb.label}</span>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-foreground">Create School Content</h1>
            <p className="text-text-secondary mt-1">Add a new course, announcement, faculty member, etc.</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button onClick={(e) => handleSubmit(e, true)} disabled={isLoading} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4" />
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Content Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {contentTypes.map(({ value, label, icon: Icon, description }) => (
              <div
                key={value}
                onClick={() => handleInputChange('type', value)}
                className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.type === value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}
              >
                <Icon className={`h-8 w-8 mb-3 ${formData.type === value ? 'text-primary' : 'text-text-secondary'}`} />
                <h3 className="font-semibold text-foreground">{label}</h3>
                <p className="text-xs text-text-muted mt-1">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Content Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="Enter content title"
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="A brief summary of the content"
              />
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Main Content (Markdown supported)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={10}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="Write your main content here..."
              />
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Metadata</h2>
          {renderTypeSpecificFields()}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isLoading}
            className="px-6 py-2 border border-border rounded-md text-text-secondary hover:bg-background"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isLoading}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {isLoading ? 'Publishing...' : 'Publish Content'}
          </button>
        </div>
      </form>
    </div>
  );
}
