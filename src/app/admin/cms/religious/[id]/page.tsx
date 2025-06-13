'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import { 
  Edit, 
  ArrowLeft,
  Eye,
  Star,
  Calendar,
  User,
  Tag,
  BookOpen,
  FileText,
  MessageSquare,
  Mic,
  Heart,
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ReligiousContent {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'prayer' | 'quran' | 'khutba' | 'dua';
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  excerpt?: string;
  featuredImage?: string;
  arabicText?: string;
  translation?: string;
  reference?: string;
  views: number;
  likes: number;
  publishedAt?: string;
  createdAt: string;
  lastModified: string;
}

export default function ViewReligiousContent() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [content, setContent] = useState<ReligiousContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/cms/religious/${id}`);
      const result = await response.json();

      if (result.success) {
        setContent(result.data);
      } else {
        toast.error(result.error || 'Failed to load content');
        router.push('/admin/cms/religious');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to load content');
      router.push('/admin/cms/religious');
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id, fetchContent]);

  const handleDelete = async () => {
    if (!content) return;
    
    if (!confirm(`Are you sure you want to delete &quot;${content.title}&quot;? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/cms/religious/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Content deleted successfully');
        router.push('/admin/cms/religious');
      } else {
        toast.error(result.error || 'Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'prayer':
        return <MessageSquare className="h-5 w-5" />;
      case 'quran':
        return <BookOpen className="h-5 w-5" />;
      case 'khutba':
        return <Mic className="h-5 w-5" />;
      case 'dua':
        return <Heart className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'prayer':
        return 'bg-green-100 text-green-800';
      case 'quran':
        return 'bg-purple-100 text-purple-800';
      case 'khutba':
        return 'bg-orange-100 text-orange-800';
      case 'dua':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Religious Content', href: '/admin/cms/religious' },
    { label: content?.title || 'View Content' }
  ];

  const actions = content ? (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => router.back()}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
      <button
        onClick={() => router.push(`/admin/cms/religious/${id}/edit`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Edit className="h-4 w-4" />
        <span>Edit</span>
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        <span>Delete</span>
      </button>
    </div>
  ) : null;

  if (isLoading) {
    return (
      <CMSLayout
        title="View Religious Content"
        description="Loading content..."
        breadcrumbs={breadcrumbs}
      >
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  if (!content) {
    return (
      <CMSLayout
        title="Content Not Found"
        description="The requested content could not be found"
        breadcrumbs={breadcrumbs}
      >
        <div className="text-center py-12">
          <p className="text-gray-600">Content not found</p>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout
      title="View Religious Content"
      description="Review and manage Islamic content"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(content.type)}`}>
                  {getTypeIcon(content.type)}
                  <span className="ml-2 capitalize">{content.type}</span>
                </span>
                {content.isFeatured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <Star className="h-4 w-4 mr-1" />
                    Featured
                  </span>
                )}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  content.isPublished 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {content.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h1>
              
              {content.excerpt && (
                <p className="text-lg text-gray-600 mb-4">{content.excerpt}</p>
              )}

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{content.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(content.publishedAt || content.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{content.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>{content.likes} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content</h2>
          
          {content.arabicText && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Arabic Text</h3>
              <p className="text-xl text-gray-800 leading-relaxed" dir="rtl">
                {content.arabicText}
              </p>
            </div>
          )}

          {content.translation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Translation</h3>
              <p className="text-gray-800 leading-relaxed">
                {content.translation}
              </p>
            </div>
          )}

          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {content.content}
            </div>
          </div>

          {content.reference && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reference</h3>
              <p className="text-gray-800 font-medium">
                {content.reference}
              </p>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Metadata</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
              <p className="text-gray-900">{content.category}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Created</h3>
              <p className="text-gray-900">{formatDate(content.createdAt)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Last Modified</h3>
              <p className="text-gray-900">{formatDate(content.lastModified)}</p>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
