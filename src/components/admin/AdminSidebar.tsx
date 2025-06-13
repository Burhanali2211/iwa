'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Home,
  Users,
  BookOpen,
  School,
  Library,
  Heart,
  CalendarDays,
  Phone,
  Settings,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User,
  Layers,
  Globe
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: string;
  children?: SidebarItem[];
}

interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: BarChart3,
        href: '/admin'
      },
      {
        id: 'users',
        label: 'User Management',
        icon: Users,
        href: '/admin/users'
      }
    ]
  },
  {
    id: 'content-management',
    title: 'Content Management',
    items: [
      {
        id: 'home-cms',
        label: 'Home Page',
        icon: Home,
        href: '/admin/cms/home'
      },
      {
        id: 'religious-cms',
        label: 'Religious Content',
        icon: BookOpen,
        href: '/admin/cms/religious'
      },
      {
        id: 'school-cms',
        label: 'School',
        icon: School,
        href: '/admin/cms/school'
      },
      {
        id: 'library-cms',
        label: 'Library',
        icon: Library,
        href: '/admin/cms/library'
      }
    ]
  },
  {
    id: 'community',
    title: 'Community',
    items: [
      {
        id: 'donations-cms',
        label: 'Donations',
        icon: Heart,
        href: '/admin/cms/donations'
      },
      {
        id: 'events-cms',
        label: 'Events',
        icon: CalendarDays,
        href: '/admin/cms/events'
      },
      {
        id: 'contact-cms',
        label: 'Contact',
        icon: Phone,
        href: '/admin/cms/contact'
      }
    ]
  },
  {
    id: 'system',
    title: 'System',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/admin/settings'
      }
    ]
  }
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview', 'content-management']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const active = isActive(item.href);

    return (
      <button
        key={item.id}
        onClick={() => router.push(item.href)}
        className={`
          w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 group
          ${active
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-900 border-r-4 border-green-600 font-semibold shadow-sm'
            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50 hover:text-gray-900'
          }
        `}
        title={!isOpen ? item.label : undefined}
      >
        <item.icon className={`h-5 w-5 transition-colors ${
          active ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'
        }`} />
        {isOpen && (
          <div className="flex items-center justify-between w-full">
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </div>
        )}
      </button>
    );
  };

  const renderSection = (section: SidebarSection) => {
    const isExpanded = expandedSections.includes(section.id);

    return (
      <div key={section.id} className="mb-2">
        {isOpen && (
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
          >
            <span>{section.title}</span>
            <ChevronRight
              className={`h-3 w-3 transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        )}

        {(isExpanded || !isOpen) && (
          <div className={`space-y-1 ${isOpen ? 'mb-4' : 'mb-2'}`}>
            {section.items.map(item => renderSidebarItem(item))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen bg-white shadow-xl z-50 transition-all duration-300 ease-in-out border-r border-gray-200 flex flex-col
        ${isOpen
          ? 'w-80 translate-x-0'
          : 'w-16 -translate-x-full lg:translate-x-0'
        }
        ${isOpen ? 'lg:w-80' : 'lg:w-16'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 to-emerald-600 flex-shrink-0">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-green-600 font-bold text-lg">☪</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Islamic CMS</h2>
                <p className="text-xs text-green-100">Admin Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-xl hover:bg-green-700 transition-all duration-200 hover:scale-105"
            title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2 bg-gradient-to-b from-gray-50 to-white min-h-0">
          <div className="space-y-2">
            {sidebarSections.map(section => renderSection(section))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-green-50 flex-shrink-0">
          {isOpen ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@islamiccenter.org</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/auth/login';
                }}
                className="w-full flex items-center justify-center space-x-2 p-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 hover:shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Logout</span>
              </button>

              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Islamic CMS v1.0</div>
                <div className="text-xs text-green-600 font-medium">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-md mx-auto">
                <User className="h-5 w-5 text-white" />
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/auth/login';
                }}
                className="w-full p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm"
                title="Logout"
              >
                <LogOut className="h-4 w-4 mx-auto" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
