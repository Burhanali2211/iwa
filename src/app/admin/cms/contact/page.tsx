'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Plus,
  Edit,
  Eye,
  FileText,
  MessageSquare,
  Globe,
  Users,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactInfo {
  id: string;
  type: 'phone' | 'email' | 'address' | 'hours' | 'social';
  label: string;
  value: string;
  isPublic: boolean;
  order: number;
  lastModified: string;
}

interface ContactForm {
  id: string;
  name: string;
  description: string;
  fields: string[];
  isActive: boolean;
  submissions: number;
  lastModified: string;
}

interface ContactStats {
  totalContacts: number;
  activeForms: number;
  monthlySubmissions: number;
  responseRate: number;
  averageResponseTime: number;
  publicContacts: number;
}

export default function ContactManagementCMS() {
  const router = useRouter();
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [forms, setForms] = useState<ContactForm[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'info' | 'forms' | 'location'>('overview');

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setIsLoading(true);

      // Fetch contact data from API
      const response = await fetch('/api/cms/contact');
      const result = await response.json();

      if (result.success) {
        // Transform API data to match component interface
        const transformedContacts = result.data.map((contact: {
          id: string;
          type: string;
          title: string;
          email?: string;
          phone?: string;
          address?: { street: string };
          description?: string;
          isPublished: boolean;
          sortOrder: number;
          lastModified: string;
        }) => ({
          id: contact.id,
          type: contact.type === 'general' ? 'phone' : contact.type,
          label: contact.title,
          value: contact.email || contact.phone || contact.address?.street || contact.description,
          isPublic: contact.isPublished,
          order: contact.sortOrder,
          lastModified: contact.lastModified
        }));

        const transformedStats: ContactStats = {
          totalContacts: result.stats.totalContacts,
          activeForms: 3, // This would come from forms API
          monthlySubmissions: 45, // This would come from analytics
          responseRate: 92, // This would come from analytics
          averageResponseTime: 4.5, // This would come from analytics
          publicContacts: result.stats.publishedContacts
        };

        setStats(transformedStats);
        setContactInfo(transformedContacts);

        // Mock forms data - this would come from a separate forms API
        const mockForms: ContactForm[] = [
          {
            id: '1',
            name: 'General Contact Form',
            description: 'Main contact form for general inquiries',
            fields: ['name', 'email', 'phone', 'subject', 'message'],
            isActive: true,
            submissions: 156,
            lastModified: '2024-01-18T10:30:00Z'
          },
          {
            id: '2',
            name: 'Admission Inquiry',
            description: 'Form for prospective students and parents',
            fields: ['name', 'email', 'phone', 'student_age', 'program_interest', 'message'],
            isActive: true,
            submissions: 89,
            lastModified: '2024-01-17T15:20:00Z'
          },
          {
            id: '3',
            name: 'Event Registration',
            description: 'Registration form for Islamic center events',
            fields: ['name', 'email', 'phone', 'event_name', 'attendees', 'dietary_requirements'],
            isActive: true,
            submissions: 234,
            lastModified: '2024-01-16T09:15:00Z'
          }
        ];

        setForms(mockForms);
      } else {
        toast.error(result.error || 'Failed to load contact data');
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
      toast.error('Failed to load contact management data');

      // Fallback to mock data if API fails
      const mockStats: ContactStats = {
        totalContacts: 12,
        activeForms: 3,
        monthlySubmissions: 45,
        responseRate: 92,
        averageResponseTime: 4.5,
        publicContacts: 8
      };

      const mockContactInfo: ContactInfo[] = [
        {
          id: '1',
          type: 'phone',
          label: 'Main Office',
          value: '+1-555-0123',
          isPublic: true,
          order: 1,
          lastModified: '2024-01-18T10:30:00Z'
        }
      ];

      setStats(mockStats);
      setContactInfo(mockContactInfo);
      setForms([]);
    } finally {
      setIsLoading(false);
    }
  };



  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'address':
        return <MapPin className="h-5 w-5" />;
      case 'hours':
        return <Clock className="h-5 w-5" />;
      case 'social':
        return <Globe className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'phone':
        return 'bg-blue-50 text-blue-700';
      case 'email':
        return 'bg-green-50 text-green-700';
      case 'address':
        return 'bg-purple-50 text-purple-700';
      case 'hours':
        return 'bg-orange-50 text-orange-700';
      case 'social':
        return 'bg-indigo-50 text-indigo-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                        <span>Contact</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Contact Management</h1>
                    <p className="text-text-secondary mt-1">Manage all contact information, forms, and submissions.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => window.open('/contact', '_blank')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <Eye className="h-4 w-4" />
                        Preview
                    </button>
                    <button onClick={() => router.push('/admin/cms/contact/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        Add Contact
                    </button>
                </div>
            </div>
        </header>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-text-muted">Total Contacts</p>
                        <p className="text-2xl font-bold text-foreground">{stats.totalContacts}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg"><Users className="h-6 w-6 text-blue-600" /></div>
                </div>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-text-muted">Active Forms</p>
                        <p className="text-2xl font-bold text-foreground">{stats.activeForms}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg"><FileText className="h-6 w-6 text-green-600" /></div>
                </div>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-text-muted">Monthly Submissions</p>
                        <p className="text-2xl font-bold text-foreground">{stats.monthlySubmissions}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg"><MessageSquare className="h-6 w-6 text-purple-600" /></div>
                </div>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-text-muted">Response Rate</p>
                        <p className="text-2xl font-bold text-foreground">{stats.responseRate}%</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg"><Clock className="h-6 w-6 text-orange-600" /></div>
                </div>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-text-muted">Avg. Response Time</p>
                        <p className="text-2xl font-bold text-foreground">{stats.averageResponseTime}h</p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-lg"><Clock className="h-6 w-6 text-indigo-600" /></div>
                </div>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-text-muted">Public Contacts</p>
                        <p className="text-2xl font-bold text-foreground">{stats.publicContacts}</p>
                    </div>
                    <div className="bg-teal-100 p-3 rounded-lg"><Globe className="h-6 w-6 text-teal-600" /></div>
                </div>
            </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
                onClick={() => setActiveTab('overview')}
                className={`${
                    activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
                Overview
            </button>
            <button
                onClick={() => setActiveTab('info')}
                className={`${
                    activeTab === 'info'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
                Contact Info
            </button>
            <button
                onClick={() => setActiveTab('forms')}
                className={`${
                    activeTab === 'forms'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
                Forms
            </button>
            <button
                onClick={() => setActiveTab('location')}
                className={`${
                    activeTab === 'location'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:border-border'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
                Location & Map
            </button>
          </nav>
        </div>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-surface rounded-lg shadow-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-primary/10 transition-colors">
                        <Phone className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-semibold text-foreground">Add Phone Number</p>
                            <p className="text-xs text-text-muted">Add a new contact number</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-primary/10 transition-colors">
                        <Mail className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-semibold text-foreground">Add Email Address</p>
                            <p className="text-xs text-text-muted">Add a new email for inquiries</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-primary/10 transition-colors">
                        <FileText className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-semibold text-foreground">Create a Form</p>
                            <p className="text-xs text-text-muted">Build a new contact form</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-background rounded-lg hover:bg-primary/10 transition-colors">
                        <ExternalLink className="h-6 w-6 text-primary"/>
                        <div>
                            <p className="font-semibold text-foreground">Add Social Link</p>
                            <p className="text-xs text-text-muted">Link to a social media profile</p>
                        </div>
                    </button>
                </div>
            </div>
            <div className="bg-surface rounded-lg shadow-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Recently Added</h3>
                <ul className="space-y-3">
                    {contactInfo.slice(0, 5).map(item => (
                        <li key={item.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${getContactColor(item.type)}`}>
                                    {getContactIcon(item.type)}
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{item.label}</p>
                                    <p className="text-xs text-text-muted">{item.value}</p>
                                </div>
                            </div>
                            <span className="text-xs text-text-muted">{formatDate(item.lastModified)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="bg-surface rounded-lg shadow-card">
          <table className="w-full text-left">
            <thead className="bg-background">
              <tr>
                <th className="p-4 font-semibold text-sm text-text-secondary">Type</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Label</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Value</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Public</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Last Modified</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactInfo.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-background">
                    <td className="p-4">
                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getContactColor(item.type)}`}>
                            {getContactIcon(item.type)}
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                    </td>
                    <td className="p-4 font-medium text-foreground">{item.label}</td>
                    <td className="p-4 text-text-secondary">{item.value}</td>
                    <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.isPublic ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'}`}>
                            {item.isPublic ? 'Yes' : 'No'}
                        </span>
                    </td>
                    <td className="p-4 text-sm text-text-muted">{formatDate(item.lastModified)}</td>
                    <td className="p-4">
                        <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                            <Edit className="h-4 w-4" />
                        </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'forms' && (
        <div className="bg-surface rounded-lg shadow-card">
          <table className="w-full text-left">
            <thead className="bg-background">
              <tr>
                <th className="p-4 font-semibold text-sm text-text-secondary">Form Name</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Submissions</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Last Modified</th>
                <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id} className="border-b border-border last:border-b-0 hover:bg-background">
                    <td className="p-4">
                        <p className="font-semibold text-foreground">{form.name}</p>
                        <p className="text-xs text-text-muted">{form.description}</p>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${form.isActive ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'}`}>
                            {form.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </td>
                    <td className="p-4 text-text-secondary">{form.submissions}</td>
                    <td className="p-4 text-sm text-text-muted">{formatDate(form.lastModified)}</td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                                <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                                <Edit className="h-4 w-4" />
                            </button>
                        </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'location' && (
        <div className="text-center py-12 bg-surface rounded-lg shadow-card">
            <h3 className="text-lg font-medium text-foreground">Location & Map Settings</h3>
            <p className="mt-2 text-sm text-text-muted">Map configuration and location details will be managed here.</p>
        </div>
      )}
    </div>
  );
}
