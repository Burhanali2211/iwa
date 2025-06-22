'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Video,
  FileText,
  Users,
  Settings,
  Calendar,
  BarChart3
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
}

export default function HelpPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I add a new user to the system?',
      answer: 'Go to User Management > Create User, fill in the required information, and click "Create User". The new user will receive an email with login credentials.',
      category: 'User Management'
    },
    {
      id: '2',
      question: 'How can I manage prayer times?',
      answer: 'Navigate to Islamic Features > Prayer Times. You can configure the API settings and customize prayer time calculations for your location.',
      category: 'Islamic Features'
    },
    {
      id: '3',
      question: 'How do I create a new event?',
      answer: 'Go to CMS > Events Management, click "Add Event", fill in the event details, and publish. You can also set event visibility and registration requirements.',
      category: 'Content Management'
    },
    {
      id: '4',
      question: 'How can I manage donations?',
      answer: 'Access CMS > Donation Management to create campaigns, set goals, and track donations. You can also configure payment methods and generate reports.',
      category: 'Content Management'
    },
    {
      id: '5',
      question: 'How do I update the homepage content?',
      answer: 'Go to CMS > Home Page to edit hero sections, features, testimonials, and other homepage content. Changes are saved automatically.',
      category: 'Content Management'
    },
    {
      id: '6',
      question: 'How can I view analytics and reports?',
      answer: 'Navigate to Analytics to view user statistics, revenue reports, content performance, and other key metrics. Data is updated in real-time.',
      category: 'Analytics'
    },
    {
      id: '7',
      question: 'How do I manage school content?',
      answer: 'Access CMS > School Management to add courses, announcements, manage faculty, and handle student-related content.',
      category: 'Content Management'
    },
    {
      id: '8',
      question: 'How can I configure system settings?',
      answer: 'Go to Settings to configure site information, contact details, prayer times, notifications, security, and backup settings.',
      category: 'Settings'
    }
  ];

  const helpSections: HelpSection[] = [
    {
      id: 'dashboard',
      title: 'Dashboard Guide',
      description: 'Learn how to navigate and use the main dashboard effectively',
      icon: BarChart3,
      href: '/help/dashboard',
      color: 'text-blue-600'
    },
    {
      id: 'cms',
      title: 'Content Management',
      description: 'Complete guide to managing website content and sections',
      icon: FileText,
      href: '/help/cms',
      color: 'text-green-600'
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'How to manage users, roles, and permissions',
      icon: Users,
      href: '/help/users',
      color: 'text-purple-600'
    },
    {
      id: 'islamic',
      title: 'Islamic Features',
      description: 'Guide to prayer times, Islamic calendar, and religious content',
      icon: Calendar,
      href: '/help/islamic',
      color: 'text-orange-600'
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configuration and customization options',
      icon: Settings,
      href: '/help/settings',
      color: 'text-red-600'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSupport = () => {
    window.open('mailto:support@islamiccenter.com', '_blank');
  };

  const handleLiveChat = () => {
    toast.success('Live chat feature coming soon!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-text-secondary">Find answers to common questions and get support</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search help articles and FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleContactSupport}
          className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Mail className="h-6 w-6 text-blue-600" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Email Support</h3>
            <p className="text-sm text-gray-600">Get help via email</p>
          </div>
        </button>

        <button
          onClick={handleLiveChat}
          className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <MessageCircle className="h-6 w-6 text-green-600" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with support team</p>
          </div>
        </button>

        <button
          onClick={() => window.open('tel:+1-555-0123', '_blank')}
          className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          <Phone className="h-6 w-6 text-purple-600" />
          <div className="text-left">
            <h3 className="font-semibold text-gray-900">Call Support</h3>
            <p className="text-sm text-gray-600">Speak with our team</p>
          </div>
        </button>
      </div>

      {/* Help Sections */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(section.href)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className={`h-6 w-6 ${section.color}`} />
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                <div className="flex items-center text-sm text-primary">
                  <span>Learn more</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
          {searchTerm && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredFAQs.length} results)
            </span>
          )}
        </h2>
        
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <p className="text-sm text-gray-500 mt-1">{faq.category}</p>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try searching with different keywords or browse our documentation.</p>
          </div>
        )}
      </div>

      {/* Video Tutorials */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Getting Started', duration: '5 min', thumbnail: '🎥' },
            { title: 'Content Management', duration: '8 min', thumbnail: '📝' },
            { title: 'User Management', duration: '6 min', thumbnail: '👥' },
            { title: 'Analytics Dashboard', duration: '4 min', thumbnail: '📊' },
            { title: 'Islamic Features', duration: '7 min', thumbnail: '🕌' },
            { title: 'System Settings', duration: '5 min', thumbnail: '⚙️' }
          ].map((tutorial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-4xl mb-3">{tutorial.thumbnail}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
              <p className="text-sm text-gray-600">{tutorial.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 Email: support@islamiccenter.com</p>
              <p>📞 Phone: +1-555-0123</p>
              <p>🕒 Hours: Monday - Friday, 9 AM - 6 PM</p>
              <p>📍 Address: 123 Islamic Center St, City, State 12345</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Response Times</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>✅ Email: Within 24 hours</p>
              <p>✅ Phone: Immediate during business hours</p>
              <p>✅ Live Chat: Within 5 minutes</p>
              <p>✅ Emergency: 24/7 support available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 