'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
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
  Building,
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

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Contact Management' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => window.open('/contact', '_blank')}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Eye className="h-4 w-4" />
        <span>Preview Contact</span>
      </button>
      <button
        onClick={() => router.push('/admin/cms/contact/create')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add Contact Info</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Contact Management CMS" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Contact Management CMS" 
      description="Manage contact information, forms, and location details"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContacts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeForms}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.monthlySubmissions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageResponseTime}h</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Public Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.publicContacts}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Phone },
              { id: 'info', label: 'Contact Info', icon: Building },
              { id: 'forms', label: 'Forms', icon: FileText },
              { id: 'location', label: 'Location', icon: MapPin }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'info' | 'forms' | 'location')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.slice(0, 5).map((contact) => (
                    <div key={contact.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`p-2 rounded-lg ${getContactColor(contact.type)}`}>
                        {getContactIcon(contact.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{contact.label}</p>
                        <p className="text-sm text-gray-600">{contact.value}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            contact.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.isPublic ? 'Public' : 'Private'}
                          </span>
                          <span className="text-xs text-gray-400">Updated {formatDate(contact.lastModified)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push(`/admin/cms/contact/info/${contact.id}`)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => router.push('/admin/cms/contact/info/create')}
                    className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                  >
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Add Contact Info</p>
                      <p className="text-sm text-gray-600">Add new contact information</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/contact/forms/create')}
                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                  >
                    <FileText className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Create Contact Form</p>
                      <p className="text-sm text-gray-600">Design new contact forms</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/contact/location')}
                    className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
                  >
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Update Location</p>
                      <p className="text-sm text-gray-600">Manage address and map details</p>
                    </div>
                  </button>

                  <button
                    onClick={() => router.push('/admin/cms/contact/submissions')}
                    className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left"
                  >
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">View Submissions</p>
                      <p className="text-sm text-gray-600">Review form submissions</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information Management</h3>
                <button
                  onClick={() => router.push('/admin/cms/contact/info/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Contact Info</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((contact) => (
                  <div key={contact.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${getContactColor(contact.type)}`}>
                        {getContactIcon(contact.type)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          contact.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {contact.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{contact.label}</h4>
                    <p className="text-gray-600 mb-4">{contact.value}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Order: {contact.order}</span>
                      <span>Updated {formatDate(contact.lastModified)}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/admin/cms/contact/info/${contact.id}`)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Forms Management</h3>
                <button
                  onClick={() => router.push('/admin/cms/contact/forms/create')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Form</span>
                </button>
              </div>

              <div className="space-y-6">
                {forms.map((form) => (
                  <div key={form.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{form.name}</h4>
                        <p className="text-gray-600 mb-3">{form.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{form.fields.length} fields</span>
                          <span>{form.submissions} submissions</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            form.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {form.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last modified</p>
                        <p className="text-xs text-gray-400">{formatDate(form.lastModified)}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Form Fields:</p>
                      <div className="flex flex-wrap gap-2">
                        {form.fields.map((field, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {field.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => router.push(`/admin/cms/contact/forms/${form.id}`)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        Edit Form
                      </button>
                      <button
                        onClick={() => router.push(`/admin/cms/contact/forms/${form.id}/submissions`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                      >
                        View Submissions ({form.submissions})
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Location Management</h3>

              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Location and map management interface will be implemented here.</p>
                <p className="text-sm text-gray-500 mt-2">This will include address management, map integration, and directions.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </CMSLayout>
  );
}
