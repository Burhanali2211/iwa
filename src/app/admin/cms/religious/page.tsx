'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
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

  // Since we're using API with pagination, we don't need client-side filtering
  const filteredContent = content;

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Religious Content' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => router.push('/admin/cms/religious/create')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add Content</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Religious Content CMS" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Religious Content CMS" 
      description="Manage Islamic articles, prayers, Quran content, and khutbas"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-2xl font-bold text-gray-900">{content.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.isPublished).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.filter(c => c.isFeatured).length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {content.reduce((sum, c) => sum + c.views, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="prayer">Prayers</option>
              <option value="quran">Quran</option>
              <option value="khutba">Khutba</option>
              <option value="dua">Duas</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Worship">Worship</option>
              <option value="Khutba">Khutba</option>
              <option value="Duas">Duas</option>
              <option value="Quran Study">Quran Study</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredContent.length} of {content.length} items
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          {item.isFeatured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {item.content.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {item.views}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {item.likes}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.publishedAt ? formatDate(item.publishedAt) : formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => router.push(`/admin/cms/religious/${item.id}`)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/admin/cms/religious/${item.id}/edit`)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
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
    </CMSLayout>
  );
}
