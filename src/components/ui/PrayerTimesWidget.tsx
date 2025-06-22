'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, RefreshCw, Settings, Bell, BellOff } from 'lucide-react';
import { getPrayerTimes, getPrayerTimesWithStatus, getCurrentLocation, PrayerTimeWithStatus } from '@/lib/prayerTimes';
import { getCurrentQiblaDirection, formatDistance, getQiblaDirectionName } from '@/lib/qiblaDirection';
import { getCurrentHijriDate, formatHijriDate } from '@/lib/hijriDate';
import toast from 'react-hot-toast';

interface PrayerTimesWidgetProps {
  className?: string;
  showQibla?: boolean;
  showHijriDate?: boolean;
  showNotifications?: boolean;
}

export default function PrayerTimesWidget({
  className = '',
  showQibla = true,
  showHijriDate = true,
  showNotifications = true,
}: PrayerTimesWidgetProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeWithStatus[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<{ direction: number; distance: number } | null>(null);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  // Load prayer times on component mount
  useEffect(() => {
    loadPrayerTimes();
    loadHijriDate();
    
    if (showQibla) {
      loadQiblaDirection();
    }

    // Set up interval to update prayer times every minute
    const interval = setInterval(() => {
      updatePrayerTimes();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Update prayer times and next prayer info
  useEffect(() => {
    if (prayerTimes.length > 0) {
      const next = prayerTimes.find(prayer => prayer.status === 'upcoming');
      if (next) {
        setNextPrayer(next.name);
        setTimeUntilNext(next.timeUntilNext || '');
      }
    }
  }, [prayerTimes]);

  const loadPrayerTimes = async () => {
    try {
      setIsLoading(true);
      
      // Get current location
      const location = await getCurrentLocation();
      if (!location) {
        // Use default location (Mecca) if geolocation fails
        const defaultLocation = { latitude: 21.4225, longitude: 39.8262 };
        const times = await getPrayerTimes(defaultLocation.latitude, defaultLocation.longitude);
        const timesWithStatus = getPrayerTimesWithStatus(times);
        setPrayerTimes(timesWithStatus);
        setCurrentLocation(defaultLocation);
        return;
      }

      setCurrentLocation(location);
      
      // Get prayer times for current location
      const times = await getPrayerTimes(location.latitude, location.longitude);
      const timesWithStatus = getPrayerTimesWithStatus(times);
      setPrayerTimes(timesWithStatus);
      
    } catch (error) {
      console.error('Error loading prayer times:', error);
      toast.error('Failed to load prayer times');
    } finally {
      setIsLoading(false);
    }
  };

  const loadQiblaDirection = async () => {
    try {
      const qibla = await getCurrentQiblaDirection();
      if (qibla) {
        setQiblaDirection(qibla);
      }
    } catch (error) {
      console.error('Error loading Qibla direction:', error);
    }
  };

  const loadHijriDate = () => {
    const currentHijri = getCurrentHijriDate();
    setHijriDate(formatHijriDate(currentHijri, 'long'));
  };

  const updatePrayerTimes = () => {
    if (currentLocation) {
      loadPrayerTimes();
    }
  };

  const toggleNotifications = () => {
    if (!notificationsEnabled) {
      // Request notification permission
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            setNotificationsEnabled(true);
            toast.success('Prayer time notifications enabled');
            schedulePrayerNotifications();
          } else {
            toast.error('Notification permission denied');
          }
        });
      }
    } else {
      setNotificationsEnabled(false);
      toast.success('Prayer time notifications disabled');
    }
  };

  const schedulePrayerNotifications = () => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    prayerTimes.forEach((prayer) => {
      if (prayer.status === 'upcoming') {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0, 0);
        
        // Schedule notification 5 minutes before prayer
        const notificationTime = new Date(prayerTime.getTime() - 5 * 60 * 1000);
        const now = new Date();
        
        if (notificationTime > now) {
          setTimeout(() => {
            new Notification(`Prayer Time Reminder`, {
              body: `${prayer.name} prayer is in 5 minutes`,
              icon: '/favicon.ico',
            });
          }, notificationTime.getTime() - now.getTime());
        }
      }
    });
  };

  const getPrayerStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-500 text-white';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const getPrayerStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <div className="w-2 h-2 bg-white rounded-full animate-pulse" />;
      case 'completed':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Prayer Times</h3>
            {currentLocation && (
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Current Location
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {showNotifications && (
            <button
              onClick={toggleNotifications}
              className={`p-2 rounded-lg transition-colors ${
                notificationsEnabled 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
            >
              {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </button>
          )}
          
          <button
            onClick={updatePrayerTimes}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Refresh prayer times"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hijri Date */}
      {showHijriDate && hijriDate && (
        <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
          <p className="text-sm text-gray-600">Today's Hijri Date</p>
          <p className="text-lg font-semibold text-gray-900">{hijriDate}</p>
        </div>
      )}

      {/* Next Prayer Info */}
      {nextPrayer && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white">
          <p className="text-sm opacity-90">Next Prayer</p>
          <p className="text-2xl font-bold">{nextPrayer}</p>
          {timeUntilNext && (
            <p className="text-sm opacity-90">in {timeUntilNext}</p>
          )}
        </div>
      )}

      {/* Prayer Times List */}
      <div className="space-y-3">
        {prayerTimes.map((prayer) => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
              getPrayerStatusColor(prayer.status)
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="font-semibold">{prayer.name}</span>
              {getPrayerStatusIcon(prayer.status)}
            </div>
            <span className="font-mono text-lg">{prayer.time}</span>
          </div>
        ))}
      </div>

      {/* Qibla Direction */}
      {showQibla && qiblaDirection && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Qibla Direction</p>
              <p className="text-lg font-semibold text-gray-900">
                {Math.round(qiblaDirection.direction)}° {getQiblaDirectionName(qiblaDirection.direction)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Distance to Mecca</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDistance(qiblaDirection.distance)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Link */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="flex items-center justify-center w-full text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <Settings className="h-4 w-4 mr-2" />
          Prayer Settings
        </button>
      </div>
    </div>
  );
} 