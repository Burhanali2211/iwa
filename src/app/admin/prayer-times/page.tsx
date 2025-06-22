'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Clock,
  MapPin,
  Settings,
  Save,
  RefreshCw,
  Globe,
  Sun,
  Moon,
  Calendar,
  Bell,
  Edit,
  Trash2,
  Plus,
  Search
} from 'lucide-react';

interface PrayerTime {
  id: string;
  name: string;
  time: string;
  date: string;
  isAdjusted: boolean;
  adjustment: number;
}

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  city: string;
}

interface PrayerSettings {
  calculationMethod: string;
  asrJuristic: string;
  highLats: string;
  adjustments: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

export default function PrayerTimesPage() {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState<Location>({
    id: '1',
    name: 'Main Mosque',
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: 'America/New_York',
    country: 'USA',
    city: 'New York'
  });

  const [prayerSettings, setPrayerSettings] = useState<PrayerSettings>({
    calculationMethod: 'Muslim World League',
    asrJuristic: 'Standard',
    highLats: 'AngleBased',
    adjustments: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { id: '1', name: 'Fajr', time: '05:30', date: '2024-01-18', isAdjusted: false, adjustment: 0 },
    { id: '2', name: 'Sunrise', time: '07:15', date: '2024-01-18', isAdjusted: false, adjustment: 0 },
    { id: '3', name: 'Dhuhr', time: '12:00', date: '2024-01-18', isAdjusted: false, adjustment: 0 },
    { id: '4', name: 'Asr', time: '14:45', date: '2024-01-18', isAdjusted: false, adjustment: 0 },
    { id: '5', name: 'Maghrib', time: '17:30', date: '2024-01-18', isAdjusted: false, adjustment: 0 },
    { id: '6', name: 'Isha', time: '19:00', date: '2024-01-18', isAdjusted: false, adjustment: 0 }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const calculationMethods = [
    'Muslim World League',
    'Islamic Society of North America',
    'Egyptian General Authority of Survey',
    'Umm Al-Qura University, Makkah',
    'University Of Islamic Sciences, Karachi',
    'Institute of Geophysics, Tehran',
    'Shia Ithna Ashari, Leva Research Institute, Qum'
  ];

  const handleFetchPrayerTimes = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to fetch prayer times
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock updated prayer times
      const updatedTimes = prayerTimes.map(prayer => ({
        ...prayer,
        time: getRandomTime(),
        date: selectedDate
      }));
      
      setPrayerTimes(updatedTimes);
      toast.success('Prayer times updated successfully!');
    } catch (error) {
      toast.error('Failed to fetch prayer times');
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 5;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleSaveSettings = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
      setShowSettings(false);
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const handleAdjustTime = (prayerId: string, adjustment: number) => {
    setPrayerTimes(prev => prev.map(prayer => 
      prayer.id === prayerId 
        ? { ...prayer, adjustment, isAdjusted: adjustment !== 0 }
        : prayer
    ));
  };

  const getNextPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return prayerTimes.find(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      return prayerTime > currentTime;
    }) || prayerTimes[0];
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Prayer Times Management</h1>
          <p className="text-text-secondary">Manage prayer times and calculation settings</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={handleFetchPrayerTimes}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>{isLoading ? 'Fetching...' : 'Fetch Times'}</span>
          </button>
        </div>
      </div>

      {/* Current Location */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Current Location</h2>
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="h-4 w-4" />
              <span>{currentLocation.city}, {currentLocation.country}</span>
            </div>
            <p className="text-sm opacity-90">
              {currentLocation.latitude.toFixed(4)}°, {currentLocation.longitude.toFixed(4)}°
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Next Prayer</p>
            <p className="text-2xl font-bold">{nextPrayer?.name}</p>
            <p className="text-lg">{nextPrayer?.time}</p>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prayerTimes.map((prayer) => (
          <div key={prayer.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{prayer.name}</h3>
              <div className="flex items-center space-x-2">
                {prayer.isAdjusted && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Adjusted
                  </span>
                )}
                <button
                  onClick={() => handleAdjustTime(prayer.id, prayer.adjustment + 5)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit className="h-3 w-3 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="text-center mb-3">
              <p className="text-2xl font-bold text-gray-900">{prayer.time}</p>
              {prayer.isAdjusted && (
                <p className="text-sm text-gray-500">
                  Adjustment: {prayer.adjustment > 0 ? '+' : ''}{prayer.adjustment} min
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleAdjustTime(prayer.id, prayer.adjustment - 5)}
                className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                -5 min
              </button>
              <button
                onClick={() => handleAdjustTime(prayer.id, 0)}
                className="px-2 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => handleAdjustTime(prayer.id, prayer.adjustment + 5)}
                className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                +5 min
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Prayer Times Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Calculation Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calculation Method
                  </label>
                  <select
                    value={prayerSettings.calculationMethod}
                    onChange={(e) => setPrayerSettings({
                      ...prayerSettings,
                      calculationMethod: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {calculationMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                {/* Asr Juristic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asr Juristic Method
                  </label>
                  <select
                    value={prayerSettings.asrJuristic}
                    onChange={(e) => setPrayerSettings({
                      ...prayerSettings,
                      asrJuristic: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Standard">Standard (Shafi, Maliki, Hanbali)</option>
                    <option value="Hanafi">Hanafi</option>
                  </select>
                </div>

                {/* High Latitude Rule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    High Latitude Rule
                  </label>
                  <select
                    value={prayerSettings.highLats}
                    onChange={(e) => setPrayerSettings({
                      ...prayerSettings,
                      highLats: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="AngleBased">Angle Based</option>
                    <option value="MidNight">Midnight</option>
                    <option value="OneSeventh">One Seventh</option>
                  </select>
                </div>

                {/* Default Adjustments */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Default Adjustments (minutes)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(prayerSettings.adjustments).map(([prayer, adjustment]) => (
                      <div key={prayer}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {prayer}
                        </label>
                        <input
                          type="number"
                          value={adjustment}
                          onChange={(e) => setPrayerSettings({
                            ...prayerSettings,
                            adjustments: {
                              ...prayerSettings.adjustments,
                              [prayer]: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 