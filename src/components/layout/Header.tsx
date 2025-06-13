'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Building2, BookOpen, Heart, Calendar, Users, Phone, Search, User } from 'lucide-react';
import { type Icon as LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon?: React.ElementType;
  dropdown?: {
    name: string;
    href: string;
    icon?: React.ElementType;
  }[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const navigationItems: NavItem[] = [
    { name: 'Home', href: '/' },
    {
      name: 'Religious',
      href: '/religious',
      icon: Building2,
      dropdown: [
        { name: 'Events & Majlis', href: '/religious/events' },
        { name: 'Live Streaming', href: '/religious/live' },
        { name: 'Media Archive', href: '/religious/media' },
        { name: 'Articles & Blogs', href: '/religious/articles' },
        { name: 'Ask Aalim', href: '/religious/ask-aalim' },
        { name: 'Khutba Summaries', href: '/religious/khutba' },
      ]
    },
    {
      name: 'School',
      href: '/school',
      icon: BookOpen,
      dropdown: [
        { name: 'Student Portal', href: '/school/student' },
        { name: 'Teacher Dashboard', href: '/school/teacher' },
        { name: 'Assignments', href: '/school/student/assignments' },
        { name: 'Manage Assignments', href: '/school/teacher/assignments' },
        { name: 'Admissions', href: '/school/admissions' },
        { name: 'Fee Payment', href: '/school/fees' },
        { name: 'Timetables', href: '/school/timetables' },
        { name: 'Results', href: '/school/results' },
        { name: 'Staff Directory', href: '/school/staff' },
        { name: 'Notice Board', href: '/school/notices' },
      ]
    },
    {
      name: 'Library',
      href: '/library',
      icon: BookOpen,
      dropdown: [
        { name: 'Digital Catalog', href: '/library/catalog' },
        { name: 'E-Books', href: '/library/ebooks' },
        { name: 'Book Recommendations', href: '/library/recommendations' },
      ]
    },
    {
      name: 'Donations',
      href: '/donations',
      icon: Heart,
      dropdown: [
        { name: 'Make Donation', href: '/donations/donate' },
        { name: 'Sponsor Student', href: '/donations/sponsor' },
        { name: 'Donation History', href: '/donations/history' },
      ]
    },
    {
      name: 'Events',
      href: '/events',
      icon: Calendar,
    },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <header className="fixed w-full top-0 left-0 right-0 z-50 px-2 py-3">
      <div className="max-w-[1440px] mx-auto">
        <div className="backdrop-blur-lg bg-white/95 shadow-lg rounded-2xl border border-gray-100/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-[4.5rem]">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-3 group py-2 px-3 rounded-xl hover:bg-green-50/80 transition-all duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 blur-lg rounded-full"></div>
                    <Building2 className="h-8 w-8 text-green-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 leading-tight tracking-tight">IWA</span>
                    <span className="text-sm text-gray-600 font-medium tracking-wide">Chattergam</span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => {
                      if (item.dropdown) {
                        if (dropdownTimeout.current) {
                          clearTimeout(dropdownTimeout.current);
                        }
                        setActiveDropdown(item.name);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.dropdown) {
                        dropdownTimeout.current = setTimeout(() => {
                          setActiveDropdown(null);
                        }, 200);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 text-gray-700 hover:text-green-700 px-4 py-2.5 rounded-xl text-[0.95rem] font-medium transition-all duration-200 group-hover:bg-green-50/80"
                    >
                      {item.icon && <item.icon className="h-[1.2rem] w-[1.2rem] opacity-85" />}
                      <span>{item.name}</span>
                      {item.dropdown && (
                        <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:opacity-100 group-hover:rotate-180" />
                      )}
                    </Link>
                    
                    {item.dropdown && activeDropdown === item.name && (
                      <div className="absolute left-0 top-full pt-2 w-60"
                        onMouseEnter={() => {
                          if (dropdownTimeout.current) {
                            clearTimeout(dropdownTimeout.current);
                          }
                        }}
                        onMouseLeave={() => {
                          dropdownTimeout.current = setTimeout(() => {
                            setActiveDropdown(null);
                          }, 200);
                        }}
                      >
                        <div className="py-2 bg-white rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-lg bg-white/95">
                          <div className="px-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center gap-2 px-4 py-2.5 text-[0.925rem] text-gray-700 hover:text-green-700 rounded-lg hover:bg-green-50/80 transition-all duration-200"
                              >
                                {subItem.icon && (
                                  <subItem.icon className="h-[1.1rem] w-[1.1rem] opacity-80" />
                                )}
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Search and Auth buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 rounded-xl text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
                  aria-label="Search"
                >
                  <Search className="h-[1.15rem] w-[1.15rem]" />
                </button>
                <Link 
                  href="/auth/login"
                  className="p-2.5 rounded-xl text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
                  aria-label="Login"
                >
                  <User className="h-[1.15rem] w-[1.15rem]" />
                </Link>
                <Link
                  href="/donations/donate"
                  className="ml-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-5 py-2 rounded-xl text-[0.94rem] font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                >
                  Donate Now
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  aria-label="Toggle menu"
                >
                  <span className="sr-only">Toggle menu</span>
                  {isMenuOpen ? (
                    <X className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  ) : (
                    <Menu className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white/98 backdrop-blur-lg z-50 flex items-start justify-center p-4 animate-fade-in pt-32">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Search</h2>
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-2.5 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                aria-label="Close search"
              >
                <X className="h-[1.15rem] w-[1.15rem]" />
              </button>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for events, articles, resources..." 
                className="w-full px-5 py-3.5 pr-12 border-2 border-green-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/40 text-base placeholder:text-gray-400 transition-all duration-200"
                autoFocus
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                aria-label="Submit search"
              >
                <Search className="h-[1.15rem] w-[1.15rem]" />
              </button>
            </div>
            <div className="mt-5 text-sm text-gray-500">
              <p>Popular searches: Events, Prayer Times, School Registration, Donation</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="p-4 flex justify-between items-center border-b">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Building2 className="h-8 w-8 text-green-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">IWA</span>
                <span className="text-xs text-gray-600">Chattergam</span>
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 h-[calc(100vh-73px)] overflow-y-auto">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 pb-2">
                  <div
                    className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-150"
                    onClick={() => {
                      if (item.dropdown) {
                        setActiveDropdown(activeDropdown === item.name ? null : item.name);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    <Link 
                      href={item.href} 
                      className="flex items-center gap-2 w-full"
                      onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      <span>{item.name}</span>
                    </Link>
                    {item.dropdown && (
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </div>

                  {/* Mobile dropdown */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="pl-6 pr-2 py-2 space-y-1 bg-green-50 rounded-md mt-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-green-700 hover:bg-white transition-colors duration-150"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 opacity-70"></span>
                            <span>{subItem.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile auth buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/auth/login" 
                    className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Register</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
