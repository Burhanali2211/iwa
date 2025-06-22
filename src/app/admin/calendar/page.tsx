'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Tag, Info, Edit, Trash2, X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  startDate: string;
  eventType: 'SCHOOL' | 'RELIGIOUS' | 'COMMUNITY';
}

const CreateEventForm = ({ onEventCreated }: { onEventCreated: (event: Event) => void }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState<'SCHOOL' | 'RELIGIOUS' | 'COMMUNITY'>('COMMUNITY');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, startDate: date, eventType: type }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorMsg = data.error || 'Failed to create event';
                throw new Error(errorMsg);
            }
            toast.success('Event created successfully');
            onEventCreated(data.event);
            setTitle('');
            setDate('');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
         <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Create New Event</h3>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Title</label>
                <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Date</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-text-secondary">Type</label>
                <select id="type" value={type} onChange={e => setType(e.target.value as any)} className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="COMMUNITY">Community</option>
                    <option value="SCHOOL">School</option>
                    <option value="RELIGIOUS">Religious</option>
                </select>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
                {isSubmitting ? 'Creating...' : 'Create Event'}
            </button>
        </form>
    );
};

const EventItem = ({ event, onEdit, onDelete }: { event: Event; onEdit?: (event: Event) => void; onDelete?: (eventId: string) => void }) => {
    const getEventTypeColor = (type: string) => {
        switch (type) {
            case 'SCHOOL': return 'bg-blue-100 text-blue-800';
            case 'RELIGIOUS': return 'bg-green-100 text-green-800';
            case 'COMMUNITY': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                    <p className="font-medium text-foreground">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-text-secondary">{formatDate(event.startDate)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.eventType)}`}>
                            {event.eventType}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                {onEdit && (
                    <button 
                        onClick={() => onEdit(event)}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <Edit className="h-3 w-3 text-text-muted" />
                    </button>
                )}
                {onDelete && (
                    <button 
                        onClick={() => onDelete(event.id)}
                        className="p-1 hover:bg-red-100 rounded"
                    >
                        <Trash2 className="h-3 w-3 text-red-500" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default function CalendarPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        toast.error('Failed to fetch events');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);
  
  const handleEventCreated = (newEvent: Event) => {
      setEvents(prev => [...prev, newEvent].sort((a,b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));
  }

  const handleViewAllEvents = () => {
    router.push('/events');
  };

  const handleViewAllMessages = () => {
    toast.success('Messages feature coming soon!');
  };

  const handleViewAllNotifications = () => {
    toast.success('Notifications feature coming soon!');
  };

  const handleEditEvent = (event: Event) => {
    toast.success(`Edit event: ${event.title}`);
    // Implement edit functionality
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully');
    }
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const leadingEmptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventColor = (type: Event['eventType']) => {
    switch(type) {
        case 'SCHOOL': return 'bg-blue-500';
        case 'RELIGIOUS': return 'bg-green-500';
        case 'COMMUNITY': return 'bg-purple-500';
        default: return 'bg-gray-500';
    }
  }

  const upcomingEvents = events.filter(e => new Date(e.startDate) >= new Date());

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 bg-surface p-6 rounded-2xl shadow-md h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-semibold text-foreground">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="p-2 hover:bg-gray-100 rounded-lg">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Plus className="h-4 w-4" />
                    Add Event
                </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-text-muted">
                {weekDays.map(day => <div key={day} className="py-2">{day}</div>)}
            </div>

            <div className="grid grid-cols-7 grid-rows-5 gap-1 flex-grow">
                {leadingEmptyDays.map(day => <div key={`empty-${day}`} className="border border-border bg-gray-50 rounded-md"></div>)}
                {monthDays.map(day => {
                    const dayEvents = events.filter(e => new Date(e.startDate).toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString());
                    return (
                        <div key={day} className="border border-border rounded-md p-2 relative">
                            <span>{day}</span>
                            <div className="mt-1 space-y-1">
                                {dayEvents.map(event => (
                                    <div key={event.id} className={`text-xs text-white p-1 rounded-md truncate ${getEventColor(event.eventType)}`}>
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-surface p-6 rounded-2xl shadow-md">
                <CreateEventForm onEventCreated={handleEventCreated} />
            </div>
            <div className="bg-surface p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
                    <button 
                        onClick={handleViewAllEvents}
                        className="text-sm text-primary hover:text-primary/80"
                    >
                        View All
                    </button>
                </div>
                <div className="space-y-3">
                    {upcomingEvents.slice(0, 5).map(event => (
                        <EventItem 
                            key={event.id} 
                            event={event}
                            onEdit={handleEditEvent}
                            onDelete={handleDeleteEvent}
                        />
                    ))}
                    {upcomingEvents.length === 0 && (
                        <p className="text-text-secondary text-center py-4">No upcoming events</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
} 