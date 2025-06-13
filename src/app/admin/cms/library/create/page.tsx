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
  Download,
  Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LibraryBookForm {
  title: string;
  author: string;
  isbn: string;
  category: string;
  language: string;
  description: string;
  publisher: string;
  publishedYear: number | '';
  pages: number | '';
  type: 'physical' | 'digital' | 'both';
  status: 'available' | 'borrowed' | 'reserved' | 'maintenance';
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  coverImage: string;
  digitalUrl: string;
  location: string;
}

const bookTypes = [
  { value: 'physical', label: 'Physical Book', icon: BookOpen, description: 'Physical copy available in library' },
  { value: 'digital', label: 'Digital Book', icon: Download, description: 'Digital/PDF version available' },
  { value: 'both', label: 'Both Formats', icon: Globe, description: 'Both physical and digital available' }
];

const categories = [
  'Tafsir', 'Hadith', 'Fiqh', 'Biography', 'History', 'Stories', 
  'Arabic Language', 'Islamic Studies', 'Comparative Religion', 
  'Philosophy', 'Children', 'Youth', 'Women', 'Family'
];

const languages = [
  'Arabic', 'English', 'Urdu', 'Turkish', 'French', 'Spanish', 
  'Indonesian', 'Malay', 'Persian', 'Bengali', 'Arabic/English'
];

export default function CreateLibraryBook() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const [formData, setFormData] = useState<LibraryBookForm>({
    title: '',
    author: '',
    isbn: '',
    category: '',
    language: '',
    description: '',
    publisher: '',
    publishedYear: '',
    pages: '',
    type: 'physical',
    status: 'available',
    tags: [],
    isPublished: false,
    isFeatured: false,
    coverImage: '',
    digitalUrl: '',
    location: ''
  });

  const [errors, setErrors] = useState<Partial<LibraryBookForm>>({});

  const validateForm = () => {
    const newErrors: Partial<LibraryBookForm> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.language.trim()) {
      newErrors.language = 'Language is required';
    }

    if (formData.type === 'digital' || formData.type === 'both') {
      if (!formData.digitalUrl.trim()) {
        newErrors.digitalUrl = 'Digital URL is required for digital books';
      }
    }

    if (formData.type === 'physical' || formData.type === 'both') {
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required for physical books';
      }
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
        isPublished: publish,
        publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
        pages: formData.pages ? Number(formData.pages) : undefined
      };

      const response = await fetch('/api/cms/library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Book ${publish ? 'published' : 'saved as draft'} successfully!`);
        router.push('/admin/cms/library');
      } else {
        toast.error(result.error || 'Failed to save book');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error('Failed to save book');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LibraryBookForm, value: string | number | boolean) => {
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
    { label: 'Library Management', href: '/admin/cms/library' },
    { label: 'Add New Book' }
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
      title="Add New Book"
      description="Add a new book to the Islamic library collection"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        {/* Book Type Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookTypes.map((type) => {
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
                placeholder="Enter book title"
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
                ISBN
              </label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="978-1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publisher
              </label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter publisher name"
              />
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
                Language *
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.language ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              {errors.language && (
                <p className="text-red-500 text-sm mt-1">{errors.language}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Published Year
              </label>
              <input
                type="number"
                value={formData.publishedYear}
                onChange={(e) => handleInputChange('publishedYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="2024"
                min="1"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages
              </label>
              <input
                type="number"
                value={formData.pages}
                onChange={(e) => handleInputChange('pages', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="300"
                min="1"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Brief description of the book content..."
            />
          </div>
        </div>

        {/* Type-specific Fields */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {formData.type === 'both' ? 'Physical & Digital Details' : 
             formData.type === 'digital' ? 'Digital Details' : 'Physical Details'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(formData.type === 'physical' || formData.type === 'both') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Physical Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Section A, Shelf 3"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            )}

            {(formData.type === 'digital' || formData.type === 'both') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital URL *
                </label>
                <input
                  type="url"
                  value={formData.digitalUrl}
                  onChange={(e) => handleInputChange('digitalUrl', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.digitalUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://example.com/book.pdf"
                />
                {errors.digitalUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.digitalUrl}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange('coverImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
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
                Featured Book
              </label>
            </div>
          </div>
        </div>
      </form>
    </CMSLayout>
  );
}
