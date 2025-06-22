'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Calendar,
  Plus,
  Edit,
  Trash2,
  Bell,
  Globe,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Moon,
  Star,
  BookOpen
} from 'lucide-react';

interface IslamicEvent {
  id: string;
  title: string;
  description: string;
  hijriDate: string;
  gregorianDate: string;
  eventType: 'Ramadan' | 'Eid' | 'Hajj' | 'Ashura' | 'Mawlid' | 'Laylatul Qadr' | 'Other';
  isPublic: boolean;
  notifications: boolean;
  color: string;
}

interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
}

export default function IslamicCalendarPage() {
  const router = useRouter();
  const [events, setEvents] = useState<IslamicEvent[]>([
    {
      id: '1',
      title: 'Start of Ramadan',
      description: 'Beginning of the holy month of Ramadan',
      hijriDate: '1445-09-01',
      gregorianDate: '2024-03-11',
      eventType: 'Ramadan',
      isPublic: true,
      notifications: true,
      color: 'bg-green-500'
    },
    {
      id: '2',
      title: 'Laylatul Qadr',
      description: 'Night of Power - 27th night of Ramadan',
      hijriDate: '1445-09-27',
      gregorianDate: '2024-04-06',
      eventType: 'Laylatul Qadr',
      isPublic: true,
      notifications: true,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      title: 'Eid al-Fitr',
      description: 'Festival of Breaking the Fast',
      hijriDate: '1445-10-01',
      gregorianDate: '2024-04-10',
      eventType: 'Eid',
      isPublic: true,
      notifications: true,
      color: 'bg-blue-500'
    },
    {
      id: '4',
      title: 'Eid al-Adha',
      description: 'Festival of Sacrifice',
      hijriDate: '1445-12-10',
      gregorianDate: '2024-06-17',
      eventType: 'Eid',
      isPublic: true,
      notifications: true,
      color: 'bg-red-500'
    }
  ]);

  const [currentHijriDate, setCurrentHijriDate] = useState<HijriDate>({
    day: 7,
    month: 7,
    year: 1445,
    monthName: 'Rajab'
  });

  const [selectedEvent, setSelectedEvent] = useState<IslamicEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
  ];

  const eventTypes = [
    { value: 'ALL', label: 'All Events', color: 'bg-gray-500' },
    { value: 'Ramadan', label: 'Ramadan', color: 'bg-green-500' },
    { value: 'Eid', label: 'Eid', color: 'bg-blue-500' },
    { value: 'Hajj', label: 'Hajj', color: 'bg-yellow-500' },
    { value: 'Ashura', label: 'Ashura', color: 'bg-red-500' },
    { value: 'Mawlid', label: 'Mawlid', color: 'bg-purple-500' },
    { value: 'Laylatul Qadr', label: 'Laylatul Qadr', color: 'bg-indigo-500' },
    { value: 'Other', label: 'Other', color: 'bg-gray-500' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'ALL' || event.eventType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event: IslamicEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully');
    }
  };

  const handleSaveEvent = (eventData: Omit<IslamicEvent, 'id'>) => {
    if (selectedEvent) {
      // Edit existing event
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { ...eventData, id: selectedEvent.id }
          : event
      ));
      toast.success('Event updated successfully');
    } else {
      // Add new event
      const newEvent = { ...eventData, id: Date.now().toString() };
      setEvents(prev => [...prev, newEvent]);
      toast.success('Event added successfully');
    }
    setShowEventModal(false);
  };

  const convertGregorianToHijri = (gregorianDate: string): HijriDate => {
    // Simplified conversion - in real implementation, use a proper library
    const date = new Date(gregorianDate);
    const year = 1445; // Simplified
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return {
      day,
      month,
      year,
      monthName: hijriMonths[month - 1]
    };
  };

  const getEventTypeColor = (eventType: string) => {
    const type = eventTypes.find(t => t.value === eventType);
    return type?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Islamic Calendar</h1>
          <p className="text-text-secondary">Manage Islamic events and Hijri calendar</p>
        </div>
        <button
          onClick={handleAddEvent}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Current Hijri Date */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Hijri Date</h2>
            <p className="text-2xl font-bold">
              {currentHijriDate.day} {currentHijriDate.monthName} {currentHijriDate.year} AH
            </p>
            <p className="text-sm opacity-90">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <Moon className="h-12 w-12 opacity-80" />
            <p className="text-sm opacity-90 mt-2">Hijri Calendar</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-3 h-3 rounded-full ${event.color} mt-1`}></div>
              <div className="flex items-center space-x-2">
                {event.notifications && (
                  <Bell className="h-4 w-4 text-blue-500" />
                )}
                <button
                  onClick={() => handleEditEvent(event)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit className="h-3 w-3 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{event.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                  {new Date(event.gregorianDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{event.hijriDate} AH</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-block w-3 h-3 rounded-full ${event.color}`}></span>
                <span className="text-gray-600 capitalize">{event.eventType}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  event.isPublic 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {event.isPublic ? 'Public' : 'Private'}
                </span>
                <span className="text-gray-500">
                  {event.notifications ? 'Notifications ON' : 'Notifications OFF'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== 'ALL' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first Islamic event.'
            }
          </p>
          {!searchTerm && filterType === 'ALL' && (
            <button
              onClick={handleAddEvent}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add First Event
            </button>
          )}
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          onClose={() => setShowEventModal(false)}
          onSave={handleSaveEvent}
          eventTypes={eventTypes}
        />
      )}
    </div>
  );
}

// Event Modal Component
interface EventModalProps {
  event: IslamicEvent | null;
  onClose: () => void;
  onSave: (eventData: Omit<IslamicEvent, 'id'>) => void;
  eventTypes: Array<{ value: string; label: string; color: string }>;
}

function EventModal({ event, onClose, onSave, eventTypes }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    hijriDate: event?.hijriDate || '',
    gregorianDate: event?.gregorianDate || '',
    eventType: event?.eventType || 'Other',
    isPublic: event?.isPublic ?? true,
    notifications: event?.notifications ?? true,
    color: event?.color || 'bg-gray-500'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Event title is required');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {event ? 'Edit Event' : 'Add New Event'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <span className="text-2xl">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hijri Date
                </label>
                <input
                  type="text"
                  value={formData.hijriDate}
                  onChange={(e) => setFormData({...formData, hijriDate: e.target.value})}
                  placeholder="1445-09-01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gregorian Date
                </label>
                <input
                  type="date"
                  value={formData.gregorianDate}
                  onChange={(e) => setFormData({...formData, gregorianDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => {
                  const selectedType = eventTypes.find(t => t.value === e.target.value);
                  setFormData({
                    ...formData, 
                    eventType: e.target.value,
                    color: selectedType?.color || 'bg-gray-500'
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {eventTypes.filter(t => t.value !== 'ALL').map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Public Event</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Send Notifications</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {event ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 