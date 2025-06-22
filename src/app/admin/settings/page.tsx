'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Settings,
  Globe,
  Clock,
  Bell,
  Shield,
  Database,
  Mail,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail as MailIcon
} from 'lucide-react';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  prayerTimesEnabled: boolean;
  prayerTimesAPI: string;
  islamicCalendarEnabled: boolean;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  maintenanceMode: boolean;
  analyticsEnabled: boolean;
  backupEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Islamic Center',
    siteDescription: 'A comprehensive Islamic center website',
    contactEmail: 'info@islamiccenter.com',
    contactPhone: '+1-555-0123',
    address: '123 Islamic Center St, City, State 12345',
    prayerTimesEnabled: true,
    prayerTimesAPI: 'https://api.aladhan.com/v1/timingsByCity',
    islamicCalendarEnabled: true,
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    analyticsEnabled: true,
    backupEnabled: true,
    backupFrequency: 'daily'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      toast.success('Settings reset to default');
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'contact', name: 'Contact', icon: Phone },
    { id: 'prayer', name: 'Prayer Times', icon: Clock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'backup', name: 'Backup & Analytics', icon: Database }
  ];

  const TabContent = ({ tabId }: { tabId: string }) => {
    switch (tabId) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <input
                    type="text"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Enable maintenance mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'prayer':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prayer Times Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.prayerTimesEnabled}
                    onChange={(e) => setSettings({...settings, prayerTimesEnabled: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable prayer times feature</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prayer Times API</label>
                  <input
                    type="url"
                    value={settings.prayerTimesAPI}
                    onChange={(e) => setSettings({...settings, prayerTimesAPI: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.islamicCalendarEnabled}
                    onChange={(e) => setSettings({...settings, islamicCalendarEnabled: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable Islamic calendar</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => setSettings({...settings, notificationsEnabled: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable notifications</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Email notifications</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">SMS notifications</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Require password change every 90 days</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable two-factor authentication</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Analytics</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.backupEnabled}
                    onChange={(e) => setSettings({...settings, backupEnabled: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable automatic backups</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => setSettings({...settings, backupFrequency: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.analyticsEnabled}
                    onChange={(e) => setSettings({...settings, analyticsEnabled: e.target.checked})}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enable analytics tracking</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-text-secondary">Manage your Islamic center website settings</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-md">
        {/* Tab Navigation */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <TabContent tabId={activeTab} />
        </div>

        {/* Action Buttons */}
        <div className="border-t border-border p-6 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset to Default</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 