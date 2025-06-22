'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
                    <h1 className="text-3xl font-bold text-foreground">Add New Book</h1>
                    <p className="text-text-secondary mt-1">Add a new book to the Islamic library collection</p>
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

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        <div className="bg-surface p-8 rounded-lg shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Book Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bookTypes.map(({ value, label, icon: Icon, description }) => (
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
          <h2 className="text-xl font-bold text-foreground mb-6">Book Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., The Sealed Nectar"
              />
              {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Safiur Rahman Mubarakpuri"
              />
              {errors.author && <p className="text-sm text-destructive mt-1">{errors.author}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">ISBN</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => handleInputChange('isbn', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., 978-1591440710"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="A brief summary of the book's content"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Categorization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Language *</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a language</option>
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
              {errors.language && <p className="text-sm text-destructive mt-1">{errors.language}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">Tags</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  placeholder="Add a tag and press Enter"
                />
                <button type="button" onClick={addTag} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1 text-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-4 w-4 text-text-muted hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Publication & Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Publisher</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Dar-us-Salam"
              />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Published Year</label>
                <input
                    type="number"
                    value={formData.publishedYear}
                    onChange={(e) => handleInputChange('publishedYear', e.target.value ? parseInt(e.target.value) : '')}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 1996"
                />
            </div>
            
            {(formData.type === 'digital' || formData.type === 'both') && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">Digital URL *</label>
                <input
                  type="text"
                  value={formData.digitalUrl}
                  onChange={(e) => handleInputChange('digitalUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/book.pdf"
                />
                {errors.digitalUrl && <p className="text-sm text-destructive mt-1">{errors.digitalUrl}</p>}
              </div>
            )}
            
            {(formData.type === 'physical' || formData.type === 'both') && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Shelf A-3, Main Hall"
                />
                {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
              </div>
            )}

            <div className="md:col-span-2 flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-text-secondary">Publish on site</label>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-text-secondary">Mark as featured</label>
                </div>
            </div>
          </div>
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
                {isLoading ? 'Publishing...' : 'Publish Book'}
            </button>
        </div>
      </form>
    </div>
  );
}
