'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  BookOpen,
  Clock,
  FileText,
  BookOpen as MosqueIcon,
  Star
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ReligiousContent {
  id: string;
  title: string;
  type: 'article' | 'prayer' | 'quran' | 'khutba' | 'dua';
  content: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  createdAt: string;
  lastModified: string;
  views: number;
  likes: number;
}

export default function ReligiousContentCMS() {
  const router = useRouter();
  const [content, setContent] = useState<ReligiousContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage] = useState(1);

  const fetchReligiousContent = useCallback(async () => {
    try {
      setIsLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType !== 'all' && { type: selectedType }),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        sortBy: 'lastModified',
        sortOrder: 'desc'
      });

      const response = await fetch(`/api/cms/religious?${params}`);
      const result = await response.json();

      if (result.success) {
        setContent(result.data);
      } else {
        toast.error(result.error || 'Failed to load religious content');
      }
    } catch (error) {
      console.error('Error fetching religious content:', error);
      toast.error('Failed to load religious content');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, selectedType, selectedCategory]);

  useEffect(() => {
    fetchReligiousContent();
  }, [fetchReligiousContent]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'prayer':
        return <Clock className="h-4 w-4" />;
      case 'quran':
        return <BookOpen className="h-4 w-4" />;
      case 'khutba':
        return <MosqueIcon className="h-4 w-4" />;
      case 'dua':
        return <Star className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete &quot;${title}&quot;? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/cms/religious/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Content deleted successfully');
        fetchReligiousContent(); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to delete content');
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  const filteredContent = content;

  if (isLoading) {
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
                        <span className="cursor-pointer hover:text-foreground" onClick={() => router.push('/admin')}>Admin</span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:text-foreground" onClick={() => router.push('/admin/cms')}>CMS</span>
                        <span className="mx-2">/</span>
                        <span>Religious Content</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Religious Content CMS</h1>
                    <p className="text-text-secondary mt-1">Manage Islamic articles, prayers, Quran content, and khutbas</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/admin/cms/religious/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Content
                    </button>
                </div>
            </div>
        </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Total Content</p>
              <p className="text-2xl font-bold text-foreground">{content.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Published</p>
              <p className="text-2xl font-bold text-foreground">
                {content.filter(c => c.isPublished).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Featured</p>
              <p className="text-2xl font-bold text-foreground">
                {content.filter(c => c.isFeatured).length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Total Views</p>
              <p className="text-2xl font-bold text-foreground">
                {content.reduce((sum, c) => sum + c.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface rounded-lg shadow-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-text-secondary mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by title, author, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Content Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="article">Article</option>
              <option value="prayer">Prayer</option>
              <option value="quran">Quran</option>
              <option value="khutba">Khutba</option>
              <option value="dua">Dua</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {/* Add category options here */}
            </select>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-surface rounded-lg shadow-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background">
            <tr>
              <th className="p-4 font-semibold text-sm text-text-secondary">Title</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Type</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Category</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Last Modified</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Stats</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-background">
                <td className="p-4">
                  <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-text-muted">by {item.author}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                    <span className="ml-1.5 capitalize">{item.type}</span>
                  </span>
                </td>
                <td className="p-4 text-sm text-text-secondary">{item.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.isPublished ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'}`}>
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-sm text-text-secondary">{formatDate(item.lastModified)}</td>
                <td className="p-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" /> {item.views}
                        <Star className="h-4 w-4" /> {item.likes}
                    </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => router.push(`/admin/cms/religious/${item.id}/edit`)} className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => router.push(`/religious/articles?id=${item.id}`)} className="p-2 text-text-secondary hover:text-info hover:bg-info/10 rounded-md">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.title)} className="p-2 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-md">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
