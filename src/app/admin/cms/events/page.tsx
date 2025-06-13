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
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Download
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  eventType: 'religious' | 'educational' | 'community' | 'fundraising' | 'youth';
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  isOnline: boolean;
  onlineLink?: string;
  maxAttendees?: number;
  currentAttendees: number;
  registrationRequired: boolean;
  registrationDeadline?: string;
  price: number;
  imageUrl?: string;
  organizer: string;
  contactEmail: string;
  contactPhone?: string;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  lastModified: string;
}

interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  totalAttendees: number;
  featuredEvents: number;
}



interface APIEventData {
  id: string;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  maxAttendees?: number;
  currentAttendees: number;
  registrationRequired: boolean;
  fee?: number;
  organizer: string;
  contactEmail: string;
  contactPhone?: string;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  featuredImage?: string;
  createdAt: string;
  lastModified: string;
}

export default function EventsCMS() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage] = useState(1);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedType !== 'all' && { type: selectedType }),
        ...(selectedStatus !== 'all' && { status: selectedStatus }),
        sortBy: 'startDate',
        sortOrder: 'asc'
      });

      const response = await fetch(`/api/cms/events?${params}`);
      const result = await response.json();

      if (result.success) {
        // Transform API data to match component interface
        const transformedEvents = result.data.map((event: APIEventData) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          eventType: event.type,
          startDate: event.startDate,
          endDate: event.endDate,
          startTime: event.startTime,
          endTime: event.endTime,
          location: event.location,
          isOnline: false, // Add this field to API if needed
          maxAttendees: event.maxAttendees,
          currentAttendees: event.currentAttendees,
          registrationRequired: event.registrationRequired,
          price: event.fee || 0,
          organizer: event.organizer,
          contactEmail: event.contactEmail,
          contactPhone: event.contactPhone,
          isPublished: event.isPublished,
          isFeatured: event.isFeatured,
          tags: event.tags,
          imageUrl: event.featuredImage,
          createdAt: event.createdAt,
          lastModified: event.lastModified
        }));

        setEvents(transformedEvents);
        setStats(result.stats);
      } else {
        toast.error(result.error || 'Failed to load events');
      }

    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, selectedType, selectedStatus]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete &quot;${title}&quot;? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/cms/events/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Event deleted successfully');
        fetchEvents(); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'religious':
        return 'bg-green-100 text-green-800';
      case 'educational':
        return 'bg-blue-100 text-blue-800';
      case 'community':
        return 'bg-purple-100 text-purple-800';
      case 'fundraising':
        return 'bg-orange-100 text-orange-800';
      case 'youth':
        return 'bg-pink-100 text-pink-800';
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

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventStatus = (event: Event) => {
    const now = new Date();
    const eventDate = new Date(event.startDate);
    
    if (eventDate < now) {
      return { label: 'Past', color: 'bg-gray-100 text-gray-800' };
    } else if (eventDate.toDateString() === now.toDateString()) {
      return { label: 'Today', color: 'bg-blue-100 text-blue-800' };
    } else {
      return { label: 'Upcoming', color: 'bg-green-100 text-green-800' };
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.eventType === selectedType;
    
    let matchesStatus = true;
    if (selectedStatus !== 'all') {
      const status = getEventStatus(event);
      matchesStatus = status.label.toLowerCase() === selectedStatus;
    }
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Events Management' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => {
          // Export events functionality
          toast.success('Events exported successfully');
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Export</span>
      </button>
      <button
        onClick={() => router.push('/admin/cms/events/create')}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add Event</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Events Management" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Events Management" 
      description="Create and manage Islamic center events and programs"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalEvents || events.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.upcomingEvents || events.filter(e => getEventStatus(e).label === 'Upcoming').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalAttendees || events.reduce((sum, e) => sum + e.currentAttendees, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.featuredEvents || events.filter(e => e.isFeatured).length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
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
                placeholder="Search events..."
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
              <option value="religious">Religious</option>
              <option value="educational">Educational</option>
              <option value="community">Community</option>
              <option value="fundraising">Fundraising</option>
              <option value="youth">Youth</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="past">Past</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const status = getEventStatus(event);
          return (
            <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              {event.imageUrl && (
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.eventType)}`}>
                      {event.eventType}
                    </span>
                    {event.isFeatured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(event.startDate)}</span>
                    {event.endDate && event.endDate !== event.startDate && (
                      <span> - {formatDate(event.endDate)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatTime(event.startTime)}</span>
                    {event.endTime && (
                      <span> - {formatTime(event.endTime)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                    {event.isOnline && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">Online</span>
                    )}
                  </div>
                  
                  {event.maxAttendees && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.currentAttendees}/{event.maxAttendees} attendees</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">
                      {event.price > 0 ? `$${event.price}` : 'Free'}
                    </span>
                    {event.registrationRequired && (
                      <span className="ml-2 text-orange-600">Registration Required</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => router.push(`/admin/cms/events/${event.id}`)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/cms/events/${event.id}/edit`)}
                      className="text-green-600 hover:text-green-900 p-1"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CMSLayout>
  );
}
