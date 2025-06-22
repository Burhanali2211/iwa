'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, User, Shield, GraduationCap, UserCheck, UserX, Users, Search, X, Mail, Phone, Calendar } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'PARENT';
  isActive: boolean;
  createdAt: string;
}

const UserRoleIcon = ({ role }: { role: User['role'] }) => {
    const getRoleIcon = () => {
        switch (role) {
            case 'ADMIN': return <Shield className="h-4 w-4 text-red-500" />;
            case 'TEACHER': return <GraduationCap className="h-4 w-4 text-blue-500" />;
            case 'STUDENT': return <User className="h-4 w-4 text-green-500" />;
            case 'PARENT': return <Users className="h-4 w-4 text-purple-500" />;
            default: return <User className="h-4 w-4 text-gray-500" />;
        }
    };

    return getRoleIcon();
};

const UserProfileModal = ({ user, isOpen, onClose }: { user: User | null; isOpen: boolean; onClose: () => void }) => {
    if (!isOpen || !user) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-surface p-6 rounded-2xl shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground">User Profile</h3>
                    <button onClick={onClose} className="text-text-muted hover:text-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random&size=80`}
                            alt="User Avatar"
                            className="h-20 w-20 rounded-full"
                        />
                        <div>
                            <h4 className="text-xl font-semibold text-foreground">{user.name}</h4>
                            <p className="text-text-secondary">{user.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <UserRoleIcon role={user.role} />
                                <span className="text-sm font-medium text-foreground">{user.role}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-text-muted" />
                            <span className="text-text-secondary">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-text-muted" />
                            <span className="text-text-secondary">Joined: {formatDate(user.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <User className="h-4 w-4 text-text-muted" />
                            <span className="text-text-secondary">User ID: {user.id}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                            Edit Profile
                        </button>
                        <button className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function TeamPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleActive = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      if (!response.ok) throw new Error('Failed to update user status');
      
      setUsers(users.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
      toast.success(`User ${user.isActive ? 'deactivated' : 'activated'}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const handleViewAllUsers = () => {
    router.push('/admin/users');
  };

  const handleViewAllMessages = () => {
    toast.success('Messages feature coming soon!');
  };

  const handleViewAllNotifications = () => {
    toast.success('Notifications feature coming soon!');
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => roleFilter === 'ALL' || user.role === roleFilter)
      .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [users, roleFilter, searchTerm]);
  
  const activeUsers = users.filter(u => u.isActive).length;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
         <div>
              <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
              <p className="text-text-secondary">Manage all users in the system.</p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface p-6 rounded-2xl shadow-md flex items-center gap-4">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                  <p className="text-text-secondary text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
              </div>
          </div>
           <div className="bg-surface p-6 rounded-2xl shadow-md flex items-center gap-4">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                  <p className="text-text-secondary text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">{activeUsers}</p>
              </div>
          </div>
           <div className="bg-surface p-6 rounded-2xl shadow-md flex items-center gap-4">
              <UserX className="h-8 w-8 text-red-500" />
              <div>
                  <p className="text-text-secondary text-sm">Inactive Users</p>
                  <p className="text-2xl font-bold text-foreground">{users.length - activeUsers}</p>
              </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-1/3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  />
              </div>
              <div className="flex items-center gap-4">
                  <select 
                      value={roleFilter} 
                      onChange={e => setRoleFilter(e.target.value)}
                      className="bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                      <option value="ALL">All Roles</option>
                      <option value="ADMIN">Admin</option>
                      <option value="TEACHER">Teacher</option>
                      <option value="STUDENT">Student</option>
                      <option value="PARENT">Parent</option>
                  </select>
                  <button 
                  onClick={() => router.push('/admin/users/create')}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                  <Plus className="h-5 w-5" />
                  Add Member
                  </button>
              </div>
          </div>

          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Joined</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`}
                              alt="User Avatar"
                              className="h-10 w-10 rounded-full"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-foreground">{user.name}</div>
                              <div className="text-sm text-text-secondary">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <UserRoleIcon role={user.role} />
                            <span className="ml-2 text-sm text-foreground">{user.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewProfile(user)}
                              className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleToggleActive(user)}
                              className={`p-1 rounded ${
                                user.isActive 
                                  ? 'text-red-600 hover:text-red-900 hover:bg-red-100' 
                                  : 'text-green-600 hover:text-green-900 hover:bg-green-100'
                              }`}
                            >
                              {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-100 rounded">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded">
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
      </div>

      <UserProfileModal
        user={selectedUser}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
} 