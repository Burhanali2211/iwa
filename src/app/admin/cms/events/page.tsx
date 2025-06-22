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
                        <span>Events</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Events Management</h1>
                    <p className="text-text-secondary mt-1">Manage all community events, registrations, and schedules.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button onClick={() => router.push('/admin/cms/events/create')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4" />
                        New Event
                    </button>
                </div>
            </div>
        </header>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Events</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalEvents}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Upcoming Events</p>
                <p className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Attendees</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalAttendees}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">Featured Events</p>
                <p className="text-2xl font-bold text-foreground">{stats.featuredEvents}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-surface rounded-lg shadow-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-text-secondary mb-2">Search Events</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by title, organizer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Event Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="religious">Religious</option>
              <option value="educational">Educational</option>
              <option value="community">Community</option>
              <option value="fundraising">Fundraising</option>
              <option value="youth">Youth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-surface rounded-lg shadow-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background">
            <tr>
              <th className="p-4 font-semibold text-sm text-text-secondary">Event</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Date & Time</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Location</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Attendees</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Status</th>
              <th className="p-4 font-semibold text-sm text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => {
              const status = getEventStatus(event);
              return (
                <tr key={event.id} className="border-b border-border hover:bg-background">
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={event.imageUrl || '/event_placeholder.png'}
                        alt={event.title}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{event.title}</p>
                        <p className={`text-xs px-2 py-0.5 mt-1 rounded-full inline-block ${getEventTypeColor(event.eventType)}`}>{event.eventType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">
                    <div>{formatDate(event.startDate)}</div>
                    <div className="text-xs text-text-muted">{formatTime(event.startTime)}</div>
                  </td>
                  <td className="p-4 text-sm text-text-secondary">{event.location}</td>
                  <td className="p-4 text-sm text-text-secondary">{event.currentAttendees} / {event.maxAttendees || '∞'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => router.push(`/admin/cms/events/${event.id}/edit`)} className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-md">
                            <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => router.push(`/events/${event.id}`)} className="p-2 text-text-secondary hover:text-info hover:bg-info/10 rounded-md">
                            <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(event.id, event.title)} className="p-2 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-md">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
