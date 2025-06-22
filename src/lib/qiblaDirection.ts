export interface QiblaDirection {
  direction: number; // in degrees from North
  distance: number; // in kilometers
  bearing: number; // in degrees
}

export interface Location {
  latitude: number;
  longitude: number;
  name?: string;
}

// Mecca coordinates
export const MECCA_COORDINATES: Location = {
  latitude: 21.4225,
  longitude: 39.8262,
  name: 'Mecca',
};

/**
 * Calculate Qibla direction from current location to Mecca
 */
export function calculateQiblaDirection(
  currentLocation: Location,
  meccaLocation: Location = MECCA_COORDINATES
): QiblaDirection {
  const lat1 = currentLocation.latitude * (Math.PI / 180);
  const lon1 = currentLocation.longitude * (Math.PI / 180);
  const lat2 = meccaLocation.latitude * (Math.PI / 180);
  const lon2 = meccaLocation.longitude * (Math.PI / 180);

  // Calculate bearing
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  const bearing = Math.atan2(y, x) * (180 / Math.PI);

  // Normalize bearing to 0-360 degrees
  const normalizedBearing = (bearing + 360) % 360;

  // Calculate distance using Haversine formula
  const R = 6371; // Earth's radius in kilometers
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return {
    direction: normalizedBearing,
    distance: Math.round(distance),
    bearing: normalizedBearing,
  };
}

/**
 * Get Qibla direction name (N, NE, E, SE, S, SW, W, NW)
 */
export function getQiblaDirectionName(direction: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(direction / 45) % 8;
  return directions[index];
}

/**
 * Get Qibla direction description
 */
export function getQiblaDirectionDescription(direction: number): string {
  if (direction >= 337.5 || direction < 22.5) return 'North';
  if (direction >= 22.5 && direction < 67.5) return 'Northeast';
  if (direction >= 67.5 && direction < 112.5) return 'East';
  if (direction >= 112.5 && direction < 157.5) return 'Southeast';
  if (direction >= 157.5 && direction < 202.5) return 'South';
  if (direction >= 202.5 && direction < 247.5) return 'Southwest';
  if (direction >= 247.5 && direction < 292.5) return 'West';
  if (direction >= 292.5 && direction < 337.5) return 'Northwest';
  return 'North';
}

/**
 * Get user's current location and calculate Qibla direction
 */
export async function getCurrentQiblaDirection(): Promise<QiblaDirection | null> {
  try {
    const position = await getCurrentPosition();
    return calculateQiblaDirection({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  } catch (error) {
    console.error('Error getting current location for Qibla calculation:', error);
    return null;
  }
}

/**
 * Get current position using Geolocation API
 */
function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}

/**
 * Calculate Qibla direction for a specific location
 */
export function getQiblaDirectionForLocation(location: Location): QiblaDirection {
  return calculateQiblaDirection(location);
}

/**
 * Get Qibla direction with compass heading
 */
export function getQiblaWithCompass(
  currentLocation: Location,
  compassHeading: number
): { qiblaDirection: QiblaDirection; relativeDirection: number } {
  const qiblaDirection = calculateQiblaDirection(currentLocation);
  
  // Calculate relative direction from compass heading
  let relativeDirection = qiblaDirection.direction - compassHeading;
  if (relativeDirection < 0) {
    relativeDirection += 360;
  }
  
  return {
    qiblaDirection,
    relativeDirection,
  };
}

/**
 * Format distance for display
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else if (distance < 1000) {
    return `${Math.round(distance)}km`;
  } else {
    return `${(distance / 1000).toFixed(1)}k km`;
  }
}

/**
 * Get Qibla direction for major cities
 */
export const MAJOR_CITIES_QIBLA: Record<string, Location> = {
  'New York': { latitude: 40.7128, longitude: -74.0060 },
  'London': { latitude: 51.5074, longitude: -0.1278 },
  'Paris': { latitude: 48.8566, longitude: 2.3522 },
  'Tokyo': { latitude: 35.6762, longitude: 139.6503 },
  'Sydney': { latitude: -33.8688, longitude: 151.2093 },
  'Dubai': { latitude: 25.2048, longitude: 55.2708 },
  'Istanbul': { latitude: 41.0082, longitude: 28.9784 },
  'Cairo': { latitude: 30.0444, longitude: 31.2357 },
  'Jakarta': { latitude: -6.2088, longitude: 106.8456 },
  'Kuala Lumpur': { latitude: 3.1390, longitude: 101.6869 },
  'Singapore': { latitude: 1.3521, longitude: 103.8198 },
  'Mumbai': { latitude: 19.0760, longitude: 72.8777 },
  'Delhi': { latitude: 28.7041, longitude: 77.1025 },
  'Karachi': { latitude: 24.8607, longitude: 67.0011 },
  'Lahore': { latitude: 31.5204, longitude: 74.3587 },
  'Dhaka': { latitude: 23.8103, longitude: 90.4125 },
  'Tehran': { latitude: 35.6892, longitude: 51.3890 },
  'Baghdad': { latitude: 33.3152, longitude: 44.3661 },
  'Riyadh': { latitude: 24.7136, longitude: 46.6753 },
  'Jeddah': { latitude: 21.5433, longitude: 39.1679 },
  'Medina': { latitude: 24.5247, longitude: 39.5692 },
  'Amman': { latitude: 31.9454, longitude: 35.9284 },
  'Beirut': { latitude: 33.8935, longitude: 35.5016 },
  'Damascus': { latitude: 33.5138, longitude: 36.2765 },
  'Kuwait City': { latitude: 29.3759, longitude: 47.9774 },
  'Doha': { latitude: 25.2854, longitude: 51.5310 },
  'Abu Dhabi': { latitude: 24.4539, longitude: 54.3773 },
  'Muscat': { latitude: 23.5880, longitude: 58.3829 },
  'Sanaa': { latitude: 15.3694, longitude: 44.1910 },
  'Aden': { latitude: 12.7797, longitude: 45.0095 },
  'Mogadishu': { latitude: 2.0469, longitude: 45.3182 },
  'Nairobi': { latitude: -1.2921, longitude: 36.8219 },
  'Dar es Salaam': { latitude: -6.8235, longitude: 39.2695 },
  'Johannesburg': { latitude: -26.2041, longitude: 28.0473 },
  'Cape Town': { latitude: -33.9249, longitude: 18.4241 },
  'Lagos': { latitude: 6.5244, longitude: 3.3792 },
  'Kano': { latitude: 11.9914, longitude: 8.5317 },
  'Khartoum': { latitude: 15.5007, longitude: 32.5599 },
  'Addis Ababa': { latitude: 9.0320, longitude: 38.7488 },
  'Algiers': { latitude: 36.7538, longitude: 3.0588 },
  'Casablanca': { latitude: 33.5731, longitude: -7.5898 },
  'Rabat': { latitude: 34.0209, longitude: -6.8416 },
  'Tunis': { latitude: 36.8065, longitude: 10.1815 },
  'Tripoli': { latitude: 32.8872, longitude: 13.1913 },
  'Alexandria': { latitude: 31.2001, longitude: 29.9187 },
  'Giza': { latitude: 30.0131, longitude: 31.2089 },
  'Port Said': { latitude: 31.2667, longitude: 32.3000 },
  'Suez': { latitude: 29.9668, longitude: 32.5498 },
  'Aswan': { latitude: 24.0889, longitude: 32.8998 },
  'Luxor': { latitude: 25.6872, longitude: 32.6396 },
  'Hurghada': { latitude: 27.2579, longitude: 33.8116 },
  'Sharm El Sheikh': { latitude: 27.9158, longitude: 34.3300 },
};

/**
 * Get Qibla direction for a major city
 */
export function getQiblaForCity(cityName: string): QiblaDirection | null {
  const cityLocation = MAJOR_CITIES_QIBLA[cityName];
  if (!cityLocation) {
    return null;
  }
  
  return calculateQiblaDirection(cityLocation);
}

/**
 * Get all major cities with their Qibla directions
 */
export function getAllCitiesQiblaDirections(): Record<string, QiblaDirection> {
  const directions: Record<string, QiblaDirection> = {};
  
  for (const [cityName, location] of Object.entries(MAJOR_CITIES_QIBLA)) {
    directions[cityName] = calculateQiblaDirection(location);
  }
  
  return directions;
} 