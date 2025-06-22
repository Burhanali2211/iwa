'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Shield, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  user_count: number;
  created_at: string;
  is_active: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const defaultPermissions = [
  // User Management
  { id: 'users.view', name: 'View Users', description: 'Can view user list and profiles', category: 'User Management' },
  { id: 'users.create', name: 'Create Users', description: 'Can create new users', category: 'User Management' },
  { id: 'users.edit', name: 'Edit Users', description: 'Can edit user information', category: 'User Management' },
  { id: 'users.delete', name: 'Delete Users', description: 'Can delete users', category: 'User Management' },
  
  // Content Management
  { id: 'content.view', name: 'View Content', description: 'Can view all content', category: 'Content Management' },
  { id: 'content.create', name: 'Create Content', description: 'Can create new content', category: 'Content Management' },
  { id: 'content.edit', name: 'Edit Content', description: 'Can edit existing content', category: 'Content Management' },
  { id: 'content.delete', name: 'Delete Content', description: 'Can delete content', category: 'Content Management' },
  { id: 'content.publish', name: 'Publish Content', description: 'Can publish content', category: 'Content Management' },
  
  // Islamic Features
  { id: 'prayer.view', name: 'View Prayer Times', description: 'Can view prayer times', category: 'Islamic Features' },
  { id: 'prayer.manage', name: 'Manage Prayer Times', description: 'Can manage prayer time settings', category: 'Islamic Features' },
  { id: 'quran.view', name: 'View Quran Content', description: 'Can view Quran content', category: 'Islamic Features' },
  { id: 'quran.manage', name: 'Manage Quran Content', description: 'Can manage Quran content', category: 'Islamic Features' },
  { id: 'khutba.view', name: 'View Khutba', description: 'Can view khutba content', category: 'Islamic Features' },
  { id: 'khutba.manage', name: 'Manage Khutba', description: 'Can manage khutba content', category: 'Islamic Features' },
  { id: 'fatwa.view', name: 'View Fatwa', description: 'Can view fatwa database', category: 'Islamic Features' },
  { id: 'fatwa.manage', name: 'Manage Fatwa', description: 'Can manage fatwa database', category: 'Islamic Features' },
  
  // School Management
  { id: 'school.view', name: 'View School Data', description: 'Can view school information', category: 'School Management' },
  { id: 'school.manage', name: 'Manage School', description: 'Can manage school settings', category: 'School Management' },
  { id: 'grades.view', name: 'View Grades', description: 'Can view student grades', category: 'School Management' },
  { id: 'grades.manage', name: 'Manage Grades', description: 'Can manage student grades', category: 'School Management' },
  { id: 'attendance.view', name: 'View Attendance', description: 'Can view attendance records', category: 'School Management' },
  { id: 'attendance.manage', name: 'Manage Attendance', description: 'Can manage attendance', category: 'School Management' },
  
  // Financial Management
  { id: 'donations.view', name: 'View Donations', description: 'Can view donation records', category: 'Financial Management' },
  { id: 'donations.manage', name: 'Manage Donations', description: 'Can manage donations', category: 'Financial Management' },
  { id: 'fees.view', name: 'View Fees', description: 'Can view fee records', category: 'Financial Management' },
  { id: 'fees.manage', name: 'Manage Fees', description: 'Can manage fee collection', category: 'Financial Management' },
  
  // System Administration
  { id: 'settings.view', name: 'View Settings', description: 'Can view system settings', category: 'System Administration' },
  { id: 'settings.manage', name: 'Manage Settings', description: 'Can manage system settings', category: 'System Administration' },
  { id: 'roles.view', name: 'View Roles', description: 'Can view roles and permissions', category: 'System Administration' },
  { id: 'roles.manage', name: 'Manage Roles', description: 'Can manage roles and permissions', category: 'System Administration' },
  { id: 'analytics.view', name: 'View Analytics', description: 'Can view analytics and reports', category: 'System Administration' },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions] = useState<Permission[]>(defaultPermissions);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    is_active: true
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoles(data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRole = async () => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .insert({
          name: newRole.name,
          description: newRole.description,
          permissions: newRole.permissions,
          is_active: newRole.is_active,
          user_count: 0
        })
        .select()
        .single();

      if (error) throw error;
      
      setRoles([data, ...roles]);
      setShowCreateDialog(false);
      setNewRole({ name: '', description: '', permissions: [], is_active: true });
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const updateRole = async (roleId: string, updates: Partial<Role>) => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .update(updates)
        .eq('id', roleId)
        .select()
        .single();

      if (error) throw error;
      
      setRoles(roles.map(role => role.id === roleId ? data : role));
      setEditingRole(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const deleteRole = async (roleId: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    try {
      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;
      
      setRoles(roles.filter(role => role.id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const togglePermission = (permissionId: string) => {
    if (newRole.permissions.includes(permissionId)) {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(p => p !== permissionId)
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    }
  };

  const getPermissionCategory = (permissionId: string) => {
    return permissions.find(p => p.id === permissionId)?.category || 'Other';
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Roles & Permissions</h1>
          <p className="text-gray-600 mt-2">Manage user roles and their permissions</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <Label htmlFor="roleDescription">Description</Label>
                <Textarea
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Enter role description"
                />
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="mt-2 space-y-4">
                  {Object.entries(groupedPermissions).map(([category, perms]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-3">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {perms.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-2 p-2 rounded border cursor-pointer hover:bg-gray-50"
                            onClick={() => togglePermission(permission.id)}
                          >
                            <input
                              type="checkbox"
                              checked={newRole.permissions.includes(permission.id)}
                              onChange={() => {}}
                              className="rounded"
                            />
                            <div>
                              <div className="font-medium text-sm">{permission.name}</div>
                              <div className="text-xs text-gray-500">{permission.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={createRole} disabled={!newRole.name}>
                  Create Role
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Total Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{roles.length}</div>
            <p className="text-sm text-gray-600">Active roles in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {roles.reduce((sum, role) => sum + role.user_count, 0)}
            </div>
            <p className="text-sm text-gray-600">Users with assigned roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{permissions.length}</div>
            <p className="text-sm text-gray-600">Available permissions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{role.user_count}</TableCell>
                  <TableCell>
                    <Badge variant={role.is_active ? "default" : "secondary"}>
                      {role.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingRole(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateRole(role.id, { is_active: !role.is_active })}
                      >
                        {role.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteRole(role.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 