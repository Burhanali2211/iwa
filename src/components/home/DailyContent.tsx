'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Clock as ClockIcon, Star, RefreshCw } from 'lucide-react';
import Clock from '../ui/Clock';

const DailyContent = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentDate(new Date());

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Loading...';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Sample daily content - in real app, this would come from API
  const dailyHadith = {
    arabic: "قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    english: "The Messenger of Allah (peace be upon him) said: 'Actions are but by intention.'",
    reference: "Sahih al-Bukhari 1",
    lesson: "This hadith teaches us that the value of our actions depends on our intentions. Pure intentions lead to blessed actions."
  };

  const dailyDua = {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    english: "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire.",
    reference: "Quran 2:201",
    occasion: "A comprehensive dua for worldly and spiritual success"
  };

  const prayerTimes = [
    { name: 'Fajr', time: '5:30 AM', status: 'completed' },
    { name: 'Dhuhr', time: '12:45 PM', status: 'current' },
    { name: 'Asr', time: '4:15 PM', status: 'upcoming' },
    { name: 'Maghrib', time: '6:30 PM', status: 'upcoming' },
    { name: 'Isha', time: '8:00 PM', status: 'upcoming' },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
              <ClockIcon className="h-8 w-8 text-white" />
            </div>
            <div className="bg-white shadow-lg rounded-lg px-4 py-2 border-l-4 border-green-500">
              <span className="text-xl font-bold text-gray-800">Live</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-gradient">
            Daily Islamic Content
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            {mounted ? formatDate(currentDate) : 'Loading...'}
          </p>
        </div>

        {/* Improved Layout - Not all cards */}
        <div className="space-y-12">
          {/* Featured Hadith - Hero Style */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 islamic-pattern-1 opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Hadith of the Day</h3>
                </div>
                <button className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <p className="text-right text-xl font-arabic leading-relaxed text-white mb-4">
                    {dailyHadith.arabic}
                  </p>
                  <p className="text-white/95 italic text-lg leading-relaxed">
                    "{dailyHadith.english}"
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-white/90">Reference: {dailyHadith.reference}</p>
                  <p className="leading-relaxed text-white/80">{dailyHadith.lesson}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Dua & Prayer Times - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Daily Dua */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Star className="h-6 w-6 mr-3 text-blue-600" />
                  Dua of the Day
                </h3>
                <button className="text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 p-2 rounded-full">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                  <p className="text-right text-lg font-arabic leading-relaxed text-gray-800 mb-3">
                    {dailyDua.arabic}
                  </p>
                  <p className="text-gray-700 italic leading-relaxed">
                    "{dailyDua.english}"
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2 text-gray-900">Reference: {dailyDua.reference}</p>
                  <p className="leading-relaxed text-gray-700">{dailyDua.occasion}</p>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <ClockIcon className="h-6 w-6 mr-3 text-purple-600" />
                Today's Prayer Times
              </h3>

              <div className="space-y-3">
                {prayerTimes.map((prayer, index) => (
                  <div
                    key={prayer.name}
                    className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${
                      prayer.status === 'current'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                        : prayer.status === 'completed'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-bold text-lg">{prayer.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-lg">{prayer.time}</span>
                      {prayer.status === 'current' && (
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      )}
                      {prayer.status === 'completed' && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <p className="text-sm text-center text-gray-700">
                <span className="font-semibold">Next Prayer:</span> Asr in 2h 30m
              </p>
            </div>
          </div>
        </div>

          {/* Islamic Calendar Info - Enhanced Design */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Islamic Calendar</h3>
              <p className="text-gray-600">Stay connected with Islamic dates and events</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📅</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Islamic Date</h4>
                <p className="text-xl font-bold text-green-600">15 Rajab 1445 AH</p>
                <p className="text-sm text-gray-500 mt-1">Hijri Calendar</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Upcoming Event</h4>
                <p className="text-xl font-bold text-blue-600">Laylat al-Miraj</p>
                <p className="text-sm text-gray-500 mt-1">in 12 days</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌙</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Moon Phase</h4>
                <p className="text-xl font-bold text-purple-600">Waxing Crescent</p>
                <p className="text-sm text-gray-500 mt-1">Current phase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyContent;
