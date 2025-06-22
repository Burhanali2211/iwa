'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  GraduationCap,
  BookOpen,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  studentProfile?: {
    rollNumber: string;
    class: string;
    section?: string;
  } | null;
  teacherProfile?: {
    employeeId: string;
    department: string;
    subjects: string[];
  } | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        role: selectedRole === 'ALL' ? '' : selectedRole,
        search: debouncedSearchTerm,
      });

      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setPagination(data.pagination);
      } else {
        toast.error(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, selectedRole, debouncedSearchTerm]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      toast.error('Please login to access admin panel.');
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'ADMIN') {
      toast.error('Access denied. Admin privileges required.');
      router.push('/unauthorized');
      return;
    }

    fetchUsers();
  }, [router, fetchUsers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPagination(prev => ({ ...prev, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/users/${userToDelete.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User deleted successfully');
        fetchUsers(); // Re-fetch users
      } else {
        toast.error(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('Failed to delete user');
    } finally {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return <GraduationCap className="h-4 w-4" />;
      case 'TEACHER':
        return <BookOpen className="h-4 w-4" />;
      case 'ADMIN':
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return 'bg-blue-100 text-blue-800';
      case 'TEACHER':
        return 'bg-green-100 text-green-800';
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'PARENT':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading && users.length === 0) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'User Management' }
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
                    <h1 className="text-3xl font-bold text-foreground">User Management</h1>
                    <p className="text-text-secondary mt-1">Manage all users in the system</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/admin/users/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add User
                    </button>
                </div>
            </div>
        </header>

      {/* Filters and Search */}
      <div className="bg-surface rounded-lg shadow-card p-6 mb-8">
        <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
              />
            </div>
          
            <div className="flex items-center gap-4">
                <div className="p-2 bg-background border border-border rounded-lg">
                    <Filter className="h-5 w-5 text-text-secondary" />
                </div>
                <select
                    value={selectedRole}
                    onChange={(e) => handleRoleFilter(e.target.value)}
                    className="border border-border rounded-lg px-4 py-2 bg-background focus:ring-2 focus:ring-primary"
                >
                    <option value="ALL">All Roles</option>
                    <option value="ADMIN">Admin</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="STUDENT">Student</option>
                    <option value="PARENT">Parent</option>
                </select>
            </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface rounded-lg shadow-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background">
            <tr>
              <th className="p-4 font-semibold text-sm text-text-secondary">User</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Role</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Contact</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Details</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-background">
                <td className="p-4">
                  <div className="font-semibold text-foreground">{user.name}</div>
                  <div className="text-xs text-text-muted">{user.email}</div>
                </td>
                <td className="p-4">
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role}
                    </span>
                </td>
                <td className="p-4 text-sm text-text-secondary">{user.phone || '-'}</td>
                <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                </td>
                <td className="p-4 text-xs text-text-secondary">
                  {user.studentProfile && `Class: ${user.studentProfile.class}-${user.studentProfile.section}`}
                  {user.teacherProfile && `Dept: ${user.teacherProfile.department}`}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                      <button onClick={() => router.push(`/admin/users/${user.id}`)} className="p-2 text-text-secondary hover:text-info hover:bg-info/10 rounded-md">
                          <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => router.push(`/admin/users/${user.id}/edit`)} className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                          <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => { setUserToDelete(user); setIsDeleteModalOpen(true); }} className="p-2 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-md">
                          <Trash2 className="h-4 w-4" />
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-text-muted">
            Showing {pagination.page * pagination.limit - pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of {pagination.totalCount} users
        </span>
        <div className="flex items-center gap-2">
            <button
                onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                disabled={pagination.page <= 1}
                className="p-2 rounded-md border border-border disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4"/>
            </button>
            <span className="text-sm px-2">Page {pagination.page} of {pagination.totalPages}</span>
            <button
                onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                disabled={pagination.page >= pagination.totalPages}
                className="p-2 rounded-md border border-border disabled:opacity-50"
            >
                <ChevronRight className="h-4 w-4"/>
            </button>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-lg shadow-xl p-8 max-w-md">
                <h2 className="text-xl font-bold text-foreground">Confirm Deletion</h2>
                <p className="text-text-secondary mt-2">Are you sure you want to delete the user <span className="font-bold">{userToDelete.name}</span>? This action cannot be undone.</p>
                <div className="flex justify-end gap-4 mt-6">
                    <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 rounded-md border border-border text-text-secondary">
                        Cancel
                    </button>
                    <button onClick={handleDeleteUser} className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground">
                        Delete
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
