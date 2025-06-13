'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import {
  Save,
  Eye,
  ArrowLeft,
  Plus,
  X,
  BookOpen,
  FileText,
  MessageSquare,
  Mic,
  Heart
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ReligiousContentForm {
  title: string;
  content: string;
  type: 'article' | 'prayer' | 'quran' | 'khutba' | 'dua';
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  excerpt: string;
  featuredImage: string;
  arabicText: string;
  translation: string;
  reference: string;
}

const contentTypes = [
  { value: 'article', label: 'Article', icon: FileText, description: 'Islamic articles and educational content' },
  { value: 'prayer', label: 'Prayer', icon: MessageSquare, description: 'Prayer guides and instructions' },
  { value: 'quran', label: 'Quran', icon: BookOpen, description: 'Quranic verses and commentary' },
  { value: 'khutba', label: 'Khutba', icon: Mic, description: 'Friday sermons and speeches' },
  { value: 'dua', label: 'Dua', icon: Heart, description: 'Supplications and invocations' }
];

const categories = [
  'Worship', 'Quran Study', 'Hadith', 'Islamic History', 'Daily Duas', 
  'Ramadan', 'Hajj & Umrah', 'Islamic Ethics', 'Family & Marriage', 
  'Youth & Education', 'Community', 'Interfaith'
];

export default function CreateReligiousContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const [formData, setFormData] = useState<ReligiousContentForm>({
    title: '',
    content: '',
    type: 'article',
    author: '',
    category: '',
    tags: [],
    isPublished: false,
    isFeatured: false,
    excerpt: '',
    featuredImage: '',
    arabicText: '',
    translation: '',
    reference: ''
  });

  const [errors, setErrors] = useState<Partial<ReligiousContentForm>>({});

  const validateForm = () => {
    const newErrors: Partial<ReligiousContentForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.excerpt && formData.excerpt.length > 500) {
      newErrors.excerpt = 'Excerpt must be less than 500 characters';
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
        isPublished: publish
      };

      const response = await fetch('/api/cms/religious', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Religious content ${publish ? 'published' : 'saved as draft'} successfully!`);
        router.push('/admin/cms/religious');
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

  const handleInputChange = (field: keyof ReligiousContentForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Religious Content', href: '/admin/cms/religious' },
    { label: 'Create New Content' }
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
      title="Create Religious Content"
      description="Add new Islamic content to your website"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter author name"
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">{errors.author}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => handleInputChange('reference', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Quran 2:255, Sahih Bukhari"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description of the content (optional)"
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={12}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter the main content..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>

            {(formData.type === 'quran' || formData.type === 'dua') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arabic Text
                  </label>
                  <textarea
                    value={formData.arabicText}
                    onChange={(e) => handleInputChange('arabicText', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter Arabic text..."
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Translation
                  </label>
                  <textarea
                    value={formData.translation}
                    onChange={(e) => handleInputChange('translation', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter English translation..."
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                Featured Content
              </label>
            </div>
          </div>
        </div>
      </form>
    </CMSLayout>
  );
}
