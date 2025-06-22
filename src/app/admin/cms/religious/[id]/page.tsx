'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  if (!content) {
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
                        <h1 className="text-3xl font-bold text-foreground">Content Not Found</h1>
                        <p className="text-text-secondary mt-1">The requested content could not be found or no longer exists.</p>
                    </div>
                </div>
            </header>
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
                    <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
                    <p className="text-text-secondary mt-1">Review and manage Islamic content</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <button onClick={() => router.push(`/admin/cms/religious/${id}/edit`)} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-info text-info hover:bg-info/10">
                        <Edit className="h-4 w-4" />
                        Edit
                    </button>
                    <button onClick={handleDelete} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface rounded-lg shadow-card p-8">
                <div className="flex items-center space-x-4 mb-6">
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
                        ? 'bg-success/20 text-success' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                    {content.isPublished ? 'Published' : 'Draft'}
                    </span>
                </div>
                {content.featuredImage && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                        <img src={content.featuredImage} alt={content.title} className="w-full h-auto object-cover" />
                    </div>
                )}
                {content.excerpt && <p className="text-lg text-text-secondary mb-6 italic">{content.excerpt}</p>}
                
                {content.arabicText && (
                    <div className="mb-6 text-right font-arabic text-2xl" dir="rtl">
                        {content.arabicText}
                    </div>
                )}
                {content.translation && (
                    <div className="mb-6 pl-4 border-l-4 border-border">
                        <p className="text-text-secondary italic">{content.translation}</p>
                    </div>
                )}
                <div className="prose prose-lg max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
            <div className="bg-surface rounded-lg shadow-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Details</h3>
                <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                        <span className="text-text-muted flex items-center"><User className="h-4 w-4 mr-2" />Author</span>
                        <span className="font-medium text-foreground">{content.author}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-text-muted flex items-center"><BookOpen className="h-4 w-4 mr-2" />Category</span>
                        <span className="font-medium text-foreground">{content.category}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-text-muted flex items-center"><Calendar className="h-4 w-4 mr-2" />Published</span>
                        <span className="font-medium text-foreground">{content.publishedAt ? formatDate(content.publishedAt) : 'Not published'}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-text-muted flex items-center"><Eye className="h-4 w-4 mr-2" />Views</span>
                        <span className="font-medium text-foreground">{content.views.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-text-muted flex items-center"><Heart className="h-4 w-4 mr-2" />Likes</span>
                        <span className="font-medium text-foreground">{content.likes.toLocaleString()}</span>
                    </li>
                </ul>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {content.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-background rounded-full text-sm text-text-secondary">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
