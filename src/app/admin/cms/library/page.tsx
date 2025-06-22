'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
                        <span>Library Management</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Library Management</h1>
                    <p className="text-text-secondary mt-1">Manage Islamic books, digital resources, and library catalog</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button onClick={() => router.push('/admin/cms/library/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Book
                    </button>
                </div>
            </div>
        </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Total Books</p>
              <p className="text-2xl font-bold text-foreground">{stats?.totalBooks || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Available</p>
              <p className="text-2xl font-bold text-foreground">{stats?.availableBooks || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Digital Books</p>
              <p className="text-2xl font-bold text-foreground">{stats?.digitalBooks || 0}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Download className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Total Borrows</p>
              <p className="text-2xl font-bold text-foreground">{stats?.totalBorrows || 0}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface rounded-lg shadow-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by title, author, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Languages</option>
              {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-surface rounded-lg shadow-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background">
            <tr>
              <th className="p-4 font-semibold text-sm text-text-secondary">Book</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Author</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Category</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Copies</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b border-border hover:bg-background">
                <td className="p-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={book.imageUrl || '/library.jpg'}
                      alt={book.title}
                      width={40}
                      height={56}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{book.title}</p>
                      <p className="text-sm text-text-muted">{book.publishedYear}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-text-secondary">{book.author}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(book.category)}`}>
                    {book.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.isActive ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'}`}>
                    {book.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-sm text-text-secondary">{book.availableCopies} / {book.totalCopies}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => router.push(`/admin/cms/library/${book.id}/edit`)} className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => router.push(`/library/catalog?book=${book.id}`)} className="p-2 text-text-secondary hover:text-info hover:bg-info/10 rounded-md">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(book.id, book.title)} className="p-2 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-md">
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
