import { supabase } from './supabase';

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface PrayerTimeConfig {
  location: string;
  latitude: number;
  longitude: number;
  timezone: string;
  calculationMethod: number; // 1-15 for different methods
  adjustments: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
}

export interface PrayerTimeWithStatus {
  name: string;
  time: string;
  status: 'completed' | 'current' | 'upcoming';
  nextPrayer?: string;
  timeUntilNext?: string;
}

// Prayer calculation methods
export const PRAYER_METHODS = {
  MUSLIM_WORLD_LEAGUE: 3,
  ISLAMIC_SOCIETY_OF_NORTH_AMERICA: 2,
  EGYPTIAN_GENERAL_AUTHORITY: 5,
  UMM_AL_QURA_UNIVERSITY: 4,
  UNIVERSITY_OF_ISLAMIC_SCIENCES: 1,
  INSTITUTE_OF_GEOPHYSICS: 7,
  SHIA_ITHNA_ASHARI: 0,
  GULF_REGION: 8,
  KUWAIT: 9,
  QATAR: 10,
  SINGAPORE: 11,
  TEHRAN: 12,
  TURKEY: 13,
  AFRICAN_REGION: 14,
  MOROCCO: 15,
};

/**
 * Get prayer times from external API
 */
export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  date: string = new Date().toISOString().split('T')[0],
  method: number = PRAYER_METHODS.MUSLIM_WORLD_LEAGUE
): Promise<PrayerTimes> {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }

    const data = await response.json();
    return data.data.timings;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
}

/**
 * Get prayer times with status (completed, current, upcoming)
 */
export function getPrayerTimesWithStatus(prayerTimes: PrayerTimes): PrayerTimeWithStatus[] {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayers = [
    { name: 'Fajr', time: prayerTimes.Fajr },
    { name: 'Sunrise', time: prayerTimes.Sunrise },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr },
    { name: 'Asr', time: prayerTimes.Asr },
    { name: 'Maghrib', time: prayerTimes.Maghrib },
    { name: 'Isha', time: prayerTimes.Isha },
  ];

  let currentPrayer: string | undefined;
  let nextPrayer: string | undefined;

  const prayersWithStatus = prayers.map((prayer, index) => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    
    let status: 'completed' | 'current' | 'upcoming' = 'upcoming';
    
    if (prayerTime < currentTime) {
      status = 'completed';
    } else if (prayerTime === currentTime || (index > 0 && prayers[index - 1].time < prayer.time && prayerTime > currentTime)) {
      status = 'current';
      currentPrayer = prayer.name;
    }
    
    if (status === 'upcoming' && !nextPrayer) {
      nextPrayer = prayer.name;
    }
    
    return {
      ...prayer,
      status,
    };
  });

  // Calculate time until next prayer
  if (nextPrayer) {
    const nextPrayerData = prayers.find(p => p.name === nextPrayer);
    if (nextPrayerData) {
      const [hours, minutes] = nextPrayerData.time.split(':').map(Number);
      const nextPrayerTime = hours * 60 + minutes;
      const timeUntilNext = nextPrayerTime - currentTime;
      
      prayersWithStatus.forEach(prayer => {
        if (prayer.name === nextPrayer) {
          prayer.nextPrayer = nextPrayer;
          prayer.timeUntilNext = formatTimeUntil(timeUntilNext);
        }
      });
    }
  }

  return prayersWithStatus;
}

/**
 * Format time until next prayer
 */
function formatTimeUntil(minutes: number): string {
  if (minutes <= 0) return 'Now';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

/**
 * Get prayer times configuration from database
 */
export async function getPrayerTimesConfig(): Promise<PrayerTimeConfig | null> {
  try {
    const { data, error } = await supabase
      .from('prayer_times')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching prayer times config:', error);
      return null;
    }

    return {
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      calculationMethod: parseInt(data.calculation_method) || PRAYER_METHODS.MUSLIM_WORLD_LEAGUE,
      adjustments: JSON.parse(data.adjustments),
    };
  } catch (error) {
    console.error('Error fetching prayer times config:', error);
    return null;
  }
}

/**
 * Save prayer times configuration to database
 */
export async function savePrayerTimesConfig(config: Omit<PrayerTimeConfig, 'id'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('prayer_times')
      .insert({
        location: config.location,
        latitude: config.latitude,
        longitude: config.longitude,
        timezone: config.timezone,
        calculation_method: config.calculationMethod.toString(),
        adjustments: JSON.stringify(config.adjustments),
      });

    if (error) {
      console.error('Error saving prayer times config:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving prayer times config:', error);
    return false;
  }
}

/**
 * Get user's current location
 */
export async function getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

/**
 * Calculate prayer times for a specific date range
 */
export async function getPrayerTimesForRange(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
  method: number = PRAYER_METHODS.MUSLIM_WORLD_LEAGUE
): Promise<Record<string, PrayerTimes>> {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const prayerTimes: Record<string, PrayerTimes> = {};

  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dateString = date.toISOString().split('T')[0];
    try {
      const times = await getPrayerTimes(latitude, longitude, dateString, method);
      prayerTimes[dateString] = times;
    } catch (error) {
      console.error(`Error fetching prayer times for ${dateString}:`, error);
    }
  }

  return prayerTimes;
}

/**
 * Get prayer time adjustments for a specific location
 */
export function getPrayerTimeAdjustments(location: string): PrayerTimeConfig['adjustments'] {
  // Default adjustments for common locations
  const defaultAdjustments = {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
  };

  // You can add location-specific adjustments here
  const locationAdjustments: Record<string, PrayerTimeConfig['adjustments']> = {
    'Mecca': { fajr: 2, dhuhr: 0, asr: 2, maghrib: 0, isha: 2 },
    'Medina': { fajr: 1, dhuhr: 0, asr: 1, maghrib: 0, isha: 1 },
    'Istanbul': { fajr: -2, dhuhr: 0, asr: -2, maghrib: 0, isha: -2 },
  };

  return locationAdjustments[location] || defaultAdjustments;
} 