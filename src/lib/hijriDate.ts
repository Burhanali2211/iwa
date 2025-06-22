export interface HijriDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayName?: string;
}

export interface GregorianDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
  dayName?: string;
}

// Hijri month names
export const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  'Rabi al-Awwal',
  'Rabi al-Thani',
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  'Shaban',
  'Ramadan',
  'Shawwal',
  'Dhu al-Qadah',
  'Dhu al-Hijjah',
];

// Gregorian month names
export const GREGORIAN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Day names
export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/**
 * Convert Gregorian date to Hijri date
 * Using a simplified algorithm for Islamic calendar conversion
 */
export function gregorianToHijri(date: Date): HijriDate {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian Day Number calculation
  const jd = Math.floor((year + 4800 + (month - 14) / 12) / 4) +
             Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
             Math.floor((3 * Math.floor((year + 4900 + (month - 14) / 12) / 100)) / 4) +
             day - 32075;

  // Hijri date calculation
  const l = jd + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l1 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l1 + 1)) / 1461001);
  const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l2) / 2447);
  const l3 = l2 - Math.floor((2447 * j) / 80);
  const k = Math.floor((j / 11));
  const j1 = j + 2 - 12 * k;
  const i1 = 100 * (n - 49) + i + k;

  const hijriYear = i1;
  const hijriMonth = j1;
  const hijriDay = l3;

  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
    monthName: HIJRI_MONTHS[hijriMonth - 1],
    dayName: DAY_NAMES[date.getDay()],
  };
}

/**
 * Convert Hijri date to Gregorian date
 * Using a simplified algorithm for Islamic calendar conversion
 */
export function hijriToGregorian(hijriDate: HijriDate): Date {
  const day = hijriDate.day;
  const month = hijriDate.month;
  const year = hijriDate.year;

  // Julian Day Number calculation for Hijri date
  const jd = day + Math.floor((29.5 * (month - 1)) + 0.5) +
             (year - 1) * 354.367 + 1948086.5;

  // Convert Julian Day Number to Gregorian date
  const l = jd + 68569;
  const n = Math.floor((4 * l) / 146097);
  const l1 = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l1 + 1)) / 1461001);
  const l2 = l1 - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l2) / 2447);
  const l3 = l2 - Math.floor((2447 * j) / 80);
  const k = Math.floor((j / 11));
  const j1 = j + 2 - 12 * k;
  const i1 = 100 * (n - 49) + i + k;

  const gregorianYear = i1;
  const gregorianMonth = j1;
  const gregorianDay = l3;

  return new Date(gregorianYear, gregorianMonth - 1, gregorianDay);
}

/**
 * Get current Hijri date
 */
export function getCurrentHijriDate(): HijriDate {
  return gregorianToHijri(new Date());
}

/**
 * Format Hijri date for display
 */
export function formatHijriDate(hijriDate: HijriDate, format: 'short' | 'long' | 'numeric' = 'long'): string {
  switch (format) {
    case 'short':
      return `${hijriDate.day} ${hijriDate.monthName}`;
    case 'long':
      return `${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} AH`;
    case 'numeric':
      return `${hijriDate.year}-${hijriDate.month.toString().padStart(2, '0')}-${hijriDate.day.toString().padStart(2, '0')}`;
    default:
      return `${hijriDate.day} ${hijriDate.monthName} ${hijriDate.year} AH`;
  }
}

/**
 * Get Hijri month info
 */
export function getHijriMonthInfo(year: number, month: number): {
  monthName: string;
  daysInMonth: number;
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
} {
  const monthName = HIJRI_MONTHS[month - 1];
  
  // Calculate days in Hijri month (approximate)
  const daysInMonth = month % 2 === 1 ? 30 : 29;
  
  // Get first day of month
  const firstDay = new Date(year, month - 1, 1);
  const firstDayOfMonth = hijriToGregorian({ day: 1, month, year, monthName });
  
  // Get last day of month
  const lastDayOfMonth = hijriToGregorian({ day: daysInMonth, month, year, monthName });

  return {
    monthName,
    daysInMonth,
    firstDayOfMonth,
    lastDayOfMonth,
  };
}

/**
 * Check if a date is in Ramadan
 */
export function isRamadan(date: Date): boolean {
  const hijriDate = gregorianToHijri(date);
  return hijriDate.month === 9; // Ramadan is the 9th month
}

/**
 * Check if a date is Eid al-Fitr
 */
export function isEidAlFitr(date: Date): boolean {
  const hijriDate = gregorianToHijri(date);
  return hijriDate.month === 10 && hijriDate.day <= 3; // First 3 days of Shawwal
}

/**
 * Check if a date is Eid al-Adha
 */
export function isEidAlAdha(date: Date): boolean {
  const hijriDate = gregorianToHijri(date);
  return hijriDate.month === 12 && hijriDate.day >= 10 && hijriDate.day <= 13; // 10th-13th of Dhu al-Hijjah
}

/**
 * Check if a date is Laylatul Qadr
 */
export function isLaylatulQadr(date: Date): boolean {
  const hijriDate = gregorianToHijri(date);
  return hijriDate.month === 9 && hijriDate.day >= 21 && hijriDate.day <= 29; // Last 10 days of Ramadan
}

/**
 * Get Islamic events for a specific date
 */
export function getIslamicEvents(date: Date): string[] {
  const events: string[] = [];
  
  if (isRamadan(date)) {
    events.push('Ramadan');
  }
  
  if (isEidAlFitr(date)) {
    events.push('Eid al-Fitr');
  }
  
  if (isEidAlAdha(date)) {
    events.push('Eid al-Adha');
  }
  
  if (isLaylatulQadr(date)) {
    events.push('Laylatul Qadr');
  }
  
  return events;
}

/**
 * Get Hijri calendar for a specific month
 */
export function getHijriCalendar(year: number, month: number): Array<{
  hijriDay: number;
  gregorianDate: Date;
  isToday: boolean;
  events: string[];
}> {
  const monthInfo = getHijriMonthInfo(year, month);
  const calendar: Array<{
    hijriDay: number;
    gregorianDate: Date;
    isToday: boolean;
    events: string[];
  }> = [];
  
  const today = new Date();
  
  for (let day = 1; day <= monthInfo.daysInMonth; day++) {
    const gregorianDate = hijriToGregorian({ day, month, year, monthName: monthInfo.monthName });
    const isToday = gregorianDate.toDateString() === today.toDateString();
    const events = getIslamicEvents(gregorianDate);
    
    calendar.push({
      hijriDay: day,
      gregorianDate,
      isToday,
      events,
    });
  }
  
  return calendar;
}

/**
 * Get next Islamic event
 */
export function getNextIslamicEvent(): { event: string; date: Date; daysUntil: number } | null {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Check for events in current year
  for (let month = 1; month <= 12; month++) {
    const calendar = getHijriCalendar(currentYear, month);
    
    for (const day of calendar) {
      if (day.events.length > 0 && day.gregorianDate > today) {
        const daysUntil = Math.ceil((day.gregorianDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return {
          event: day.events[0],
          date: day.gregorianDate,
          daysUntil,
        };
      }
    }
  }
  
  // Check for events in next year
  const nextYear = currentYear + 1;
  for (let month = 1; month <= 12; month++) {
    const calendar = getHijriCalendar(nextYear, month);
    
    for (const day of calendar) {
      if (day.events.length > 0) {
        const daysUntil = Math.ceil((day.gregorianDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return {
          event: day.events[0],
          date: day.gregorianDate,
          daysUntil,
        };
      }
    }
  }
  
  return null;
} 