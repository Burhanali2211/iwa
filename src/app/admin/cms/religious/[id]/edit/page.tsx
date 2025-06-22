'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

export default function EditReligiousContent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
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

  const fetchContent = useCallback(async () => {
    try {
      setIsLoadingData(true);
      const response = await fetch(`/api/cms/religious/${id}`);
      const result = await response.json();

      if (result.success) {
        const data = result.data;
        setFormData({
          title: data.title || '',
          content: data.content || '',
          type: data.type || 'article',
          author: data.author || '',
          category: data.category || '',
          tags: data.tags || [],
          isPublished: data.isPublished || false,
          isFeatured: data.isFeatured || false,
          excerpt: data.excerpt || '',
          featuredImage: data.featuredImage || '',
          arabicText: data.arabicText || '',
          translation: data.translation || '',
          reference: data.reference || ''
        });
      } else {
        toast.error(result.error || 'Failed to load content');
        router.push('/admin/cms/religious');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to load content');
      router.push('/admin/cms/religious');
    } finally {
      setIsLoadingData(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id, fetchContent]);

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

      const response = await fetch(`/api/cms/religious/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Religious content ${publish ? 'published' : 'updated'} successfully!`);
        router.push('/admin/cms/religious');
      } else {
        toast.error(result.error || 'Failed to update content');
      }
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ReligiousContentForm, value: string | boolean | string[]) => {
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
    { label: 'Edit Content' }
  ];

  if (isLoadingData) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

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
                    <h1 className="text-3xl font-bold text-foreground">Edit Religious Content</h1>
                    <p className="text-text-secondary mt-1">Modify and update existing Islamic content</p>
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
          <h2 className="text-xl font-bold text-foreground mb-6">Main Content</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Title *</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="A brief summary of the content"
              />
              {errors.excerpt && <p className="text-sm text-destructive mt-1">{errors.excerpt}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Main Content (Markdown supported) *</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={15}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="Write your main content here..."
              />
              {errors.content && <p className="text-sm text-destructive mt-1">{errors.content}</p>}
            </div>
          </div>
        </div>
        
        <div className="bg-surface p-8 rounded-lg shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Additional Content</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Arabic Text</label>
                    <textarea
                        value={formData.arabicText}
                        onChange={(e) => handleInputChange('arabicText', e.target.value)}
                        rows={5}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary font-arabic text-lg"
                        placeholder="Enter Arabic text if any"
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Translation</label>
                    <textarea
                        value={formData.translation}
                        onChange={(e) => handleInputChange('translation', e.target.value)}
                        rows={5}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                        placeholder="Enter translation if any"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Reference</label>
                    <input
                        type="text"
                        value={formData.reference}
                        onChange={(e) => handleInputChange('reference', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Quran 2:183, Sahih al-Bukhari 5"
                    />
                </div>
            </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Categorization & Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="Enter author name"
              />
              {errors.author && <p className="text-sm text-destructive mt-1">{errors.author}</p>}
            </div>

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

            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-2">Featured Image URL</label>
                <input
                    type="text"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/image.jpg"
                />
            </div>

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
                {isLoading ? 'Publishing...' : 'Publish Content'}
            </button>
        </div>
      </form>
    </div>
  );
}
