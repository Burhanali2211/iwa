'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Mail, Sun, Moon, LogOut, Settings, User, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
  name: string;
  email: string;
}

interface HeaderProps {
  user: User;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

interface Mail {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  isRead: boolean;
}

const Header = ({ user }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Student Registration',
      message: 'A new student has registered for the upcoming semester.',
      time: '2 minutes ago',
      isRead: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Monthly donation of ₹5000 has been received.',
      time: '1 hour ago',
      isRead: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2 AM.',
      time: '3 hours ago',
      isRead: true,
      type: 'warning'
    }
  ]);

  // Mock mail data
  const [mails] = useState<Mail[]>([
    {
      id: '1',
      from: 'admin@school.edu',
      subject: 'Monthly Report Available',
      preview: 'The monthly financial report is now available for review...',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: '2',
      from: 'teacher@school.edu',
      subject: 'Class Schedule Update',
      preview: 'There have been changes to the class schedule for next week...',
      time: '3 hours ago',
      isRead: true
    }
  ]);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMails = mails.filter(m => !m.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (mailRef.current && !mailRef.current.contains(event.target as Node)) {
        setShowMail(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
      // Implement actual search functionality here
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const handleViewAllMessages = () => {
    toast.success('Messages page coming soon!');
    // router.push('/admin/messages');
  };

  const handleViewAllNotifications = () => {
    toast.success('Notifications page coming soon!');
    // router.push('/admin/notifications');
  };

  const handleNotificationClick = (notification: Notification) => {
    toast.success(`Notification clicked: ${notification.title}`);
    // Mark as read or navigate to relevant page
  };

  const handleMailClick = (mail: Mail) => {
    toast.success(`Mail clicked: ${mail.subject}`);
    // Open mail detail or mark as read
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-text-secondary">Plan, prioritize, and accomplish your tasks with ease.</p>
      </div>
      <div className="flex items-center gap-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
          <input
            type="text"
            placeholder="Search task"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface border border-border rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">
            ⌘F
          </div>
        </form>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="relative text-text-secondary hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          
          {/* Mail Dropdown */}
          <div className="relative" ref={mailRef}>
            <button 
              onClick={() => setShowMail(!showMail)}
              className="relative text-text-secondary hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
              {unreadMails > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {showMail && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Messages ({unreadMails} unread)</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {mails.map((mail) => (
                    <div key={mail.id} className={`p-4 border-b border-border hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${!mail.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`} onClick={() => handleMailClick(mail)}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{mail.from}</p>
                          <p className="text-sm font-semibold text-foreground">{mail.subject}</p>
                          <p className="text-sm text-text-secondary truncate">{mail.preview}</p>
                        </div>
                        <span className="text-xs text-text-muted">{mail.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="w-full text-center text-sm text-primary hover:text-primary/80" onClick={handleViewAllMessages}>
                    View All Messages
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-text-secondary hover:text-foreground transition-colors"
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications ({unreadNotifications} unread)</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b border-border hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`} onClick={() => handleNotificationClick(notification)}>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{notification.title}</p>
                          <p className="text-sm text-text-secondary">{notification.message}</p>
                          <p className="text-xs text-text-muted mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <button className="w-full text-center text-sm text-primary hover:text-primary/80" onClick={handleViewAllNotifications}>
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`}
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="text-left">
                <p className="font-semibold text-foreground">{user.name}</p>
                <p className="text-sm text-text-secondary">{user.email}</p>
              </div>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <hr className="my-1 border-border" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 