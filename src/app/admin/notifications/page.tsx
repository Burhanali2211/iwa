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
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Send, 
  Clock, 
  Users,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
  target_audience: string[];
  scheduled_at?: string;
  sent_at?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  created_at: string;
  created_by: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: string;
  category: string;
}

const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'prayer-reminder',
    name: 'Prayer Time Reminder',
    title: 'Prayer Time Reminder',
    message: 'As-salamu alaykum! It\'s time for {prayer_name}. Please join us at the mosque.',
    type: 'info',
    category: 'Prayer'
  },
  {
    id: 'event-reminder',
    name: 'Event Reminder',
    title: 'Upcoming Event: {event_name}',
    message: 'Don\'t forget about {event_name} tomorrow at {event_time}. We look forward to seeing you!',
    type: 'info',
    category: 'Events'
  },
  {
    id: 'donation-thanks',
    name: 'Donation Thank You',
    title: 'Thank You for Your Donation',
    message: 'Jazakum Allahu khayran for your generous donation of {amount}. Your support helps our community grow.',
    type: 'success',
    category: 'Donations'
  },
  {
    id: 'maintenance-alert',
    name: 'Maintenance Alert',
    title: 'Maintenance Notice',
    message: 'The {facility_name} will be under maintenance from {start_date} to {end_date}. We apologize for any inconvenience.',
    type: 'warning',
    category: 'Maintenance'
  },
  {
    id: 'emergency-alert',
    name: 'Emergency Alert',
    title: 'Important Announcement',
    message: 'Emergency announcement: {message}. Please follow the instructions provided.',
    type: 'error',
    category: 'Emergency'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as const,
    priority: 'medium' as const,
    target_audience: [] as string[],
    scheduled_at: '',
    status: 'draft' as const
  });

  const audienceOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'students', label: 'Students' },
    { value: 'teachers', label: 'Teachers' },
    { value: 'parents', label: 'Parents' },
    { value: 'admin', label: 'Administrators' },
    { value: 'donors', label: 'Donors' },
    { value: 'volunteers', label: 'Volunteers' }
  ];

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNotification = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          title: newNotification.title,
          message: newNotification.message,
          type: newNotification.type,
          priority: newNotification.priority,
          target_audience: newNotification.target_audience,
          scheduled_at: newNotification.scheduled_at || null,
          status: newNotification.status,
          created_by: 'admin' // This should come from auth context
        })
        .select()
        .single();

      if (error) throw error;
      
      setNotifications([data, ...notifications]);
      setShowCreateDialog(false);
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        priority: 'medium',
        target_audience: [],
        scheduled_at: '',
        status: 'draft'
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const sendNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', notificationId);

      if (error) throw error;
      
      setNotifications(notifications.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: 'sent', sent_at: new Date().toISOString() }
          : notif
      ));
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) throw error;
      
      setNotifications(notifications.filter(notif => notif.id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const useTemplate = (template: NotificationTemplate) => {
    setNewNotification({
      ...newNotification,
      title: template.title,
      message: template.message,
      type: template.type as any
    });
    setShowTemplateDialog(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    draft: notifications.filter(n => n.status === 'draft').length
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Manage and send notifications to users</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Use Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Select Notification Template</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notificationTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{template.title}</p>
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{template.message}</p>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => useTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    placeholder="Enter notification title"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    placeholder="Enter notification message"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newNotification.type}
                      onValueChange={(value) => setNewNotification({ ...newNotification, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newNotification.priority}
                      onValueChange={(value) => setNewNotification({ ...newNotification, priority: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select
                    onValueChange={(value) => {
                      if (!newNotification.target_audience.includes(value)) {
                        setNewNotification({
                          ...newNotification,
                          target_audience: [...newNotification.target_audience, value]
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newNotification.target_audience.map((audience) => (
                      <Badge
                        key={audience}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => setNewNotification({
                          ...newNotification,
                          target_audience: newNotification.target_audience.filter(a => a !== audience)
                        })}
                      >
                        {audienceOptions.find(o => o.value === audience)?.label}
                        <XCircle className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="scheduled_at">Schedule (Optional)</Label>
                  <Input
                    id="scheduled_at"
                    type="datetime-local"
                    value={newNotification.scheduled_at}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduled_at: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createNotification} disabled={!newNotification.title || !newNotification.message}>
                    Create Notification
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Total Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <p className="text-sm text-gray-600">All notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.sent}</div>
            <p className="text-sm text-gray-600">Successfully sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Scheduled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.scheduled}</div>
            <p className="text-sm text-gray-600">Pending delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Drafts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-600">{stats.draft}</div>
            <p className="text-sm text-gray-600">Not yet sent</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{notification.message}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(notification.type)}
                      <Badge variant="outline" className="capitalize">
                        {notification.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {notification.target_audience.slice(0, 2).map((audience) => (
                        <Badge key={audience} variant="secondary" className="text-xs">
                          {audience}
                        </Badge>
                      ))}
                      {notification.target_audience.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{notification.target_audience.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(notification.status)}
                      <Badge variant={notification.status === 'sent' ? 'default' : 'secondary'}>
                        {notification.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {notification.status === 'draft' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => sendNotification(notification.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteNotification(notification.id)}
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