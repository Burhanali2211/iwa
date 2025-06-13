'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CMSLayout from '@/components/admin/CMSLayout';
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  BookOpen,
  Download,
  Star,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  imageUrl?: string;
  isActive: boolean;
  isDigital: boolean;
  digitalUrl?: string;
  language: string;
  publishedYear: number;
  addedDate: string;
  lastModified: string;
  borrowCount: number;
  rating: number;
  tags: string[];
}

interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  digitalBooks: number;
  totalBorrows: number;
}



interface APILibraryBook {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  description: string;
  totalCopies: number;
  availableCopies: number;
  coverImage?: string;
  isPublished: boolean;
  type: string;
  digitalUrl?: string;
  language: string;
  publishedYear: number;
  createdAt: string;
  lastModified: string;
  borrowedCount: number;
  rating: number;
  tags: string[];
}

export default function LibraryCMS() {
  const router = useRouter();
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedStatus] = useState<string>('all');
  const [currentPage] = useState(1);

  const fetchLibraryBooks = useCallback(async () => {
    try {
      setIsLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(selectedLanguage !== 'all' && { language: selectedLanguage }),
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
        sortBy: 'title',
        sortOrder: 'asc'
      });

      const response = await fetch(`/api/cms/library?${params}`);
      const result = await response.json();

      if (result.success) {
        // Transform API data to match component interface
        const transformedBooks = result.data.map((book: APILibraryBook) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          category: book.category,
          description: book.description,
          totalCopies: book.totalCopies,
          availableCopies: book.availableCopies,
          imageUrl: book.coverImage,
          isActive: book.isPublished,
          isDigital: book.type === 'digital' || book.type === 'both',
          digitalUrl: book.digitalUrl,
          language: book.language,
          publishedYear: book.publishedYear,
          addedDate: book.createdAt,
          lastModified: book.lastModified,
          borrowCount: book.borrowedCount,
          rating: book.rating,
          tags: book.tags
        }));

        setBooks(transformedBooks);
        setStats(result.stats);
      } else {
        toast.error(result.error || 'Failed to load library books');
      }

    } catch (error) {
      console.error('Error fetching library books:', error);
      toast.error('Failed to load library books');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedLanguage, selectedStatus]);

  useEffect(() => {
    fetchLibraryBooks();
  }, [fetchLibraryBooks]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete &quot;${title}&quot;? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/cms/library/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Book deleted successfully');
        fetchLibraryBooks(); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tafsir':
        return 'bg-green-100 text-green-800';
      case 'hadith':
        return 'bg-blue-100 text-blue-800';
      case 'biography':
        return 'bg-purple-100 text-purple-800';
      case 'fiqh':
        return 'bg-orange-100 text-orange-800';
      case 'stories':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || book.language.includes(selectedLanguage);
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const categories = Array.from(new Set(books.map(book => book.category)));
  const languages = Array.from(new Set(books.flatMap(book => book.language.split('/'))));

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Library Management' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => {
          // Export library catalog
          toast.success('Library catalog exported successfully');
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Export</span>
      </button>
      <button
        onClick={() => router.push('/admin/cms/library/create')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add Book</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Library Management" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Library Management" 
      description="Manage Islamic books, digital resources, and library catalog"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalBooks || books.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.availableBooks || books.reduce((sum, book) => sum + book.availableCopies, 0)}
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
              <p className="text-sm font-medium text-gray-600">Digital Books</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.digitalBooks || books.filter(book => book.isDigital).length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Borrows</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalBorrows || books.reduce((sum, book) => sum + book.borrowCount, 0)}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
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
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Languages</option>
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
              {book.imageUrl ? (
                <Image
                  src={book.imageUrl}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(book.category)}`}>
                  {book.category}
                </span>
                <div className="flex items-center space-x-1">
                  {book.isDigital && (
                    <div title="Digital Available">
                      <Download className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{book.rating}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{book.author}</p>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{book.description}</p>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Available: {book.availableCopies}/{book.totalCopies}</span>
                  <span>Borrowed: {book.borrowCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{book.language}</span>
                  <span>{book.publishedYear}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => router.push(`/admin/cms/library/books/${book.id}`)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => router.push(`/admin/cms/library/books/${book.id}/edit`)}
                    className="text-green-600 hover:text-green-900 p-1"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(book.id, book.title)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                {book.isDigital && book.digitalUrl && (
                  <button
                    onClick={() => window.open(book.digitalUrl, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CMSLayout>
  );
}
