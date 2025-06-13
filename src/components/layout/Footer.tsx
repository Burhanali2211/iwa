'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Calendar,
  Clock,
  ArrowRight,
  Heart,
  Send,
  ChevronRight,
  Compass,
  BookOpen,
  GraduationCap,
  Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-green-500 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-emerald-600 rounded-full opacity-5 blur-3xl"></div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12 border-b border-gray-800">
          {/* Logo and Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 blur-sm rounded-full opacity-30"></div>
                <Building2 className="relative h-10 w-10 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Idarah Wali Ul Aser</h2>
                <p className="text-sm text-gray-400">Chattergam Kashmir</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Founded by Aga Syed Mustafa Al Hussaini Al Hamadani in 2005 to bring light of knowledge
              to people. Our aim is to enlighten people with true knowledge of Imam Hussain A.S and
              his true aim of sacrifices on the Holy Land of Karbala.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Send className="h-4 w-4 mr-2" /> Subscribe to Our Newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="flex">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-r-md text-white font-medium text-sm hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center"
                >
                  Subscribe <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </form>
              <p className="text-gray-500 text-xs mt-2">Join our community and stay updated with our latest events and announcements.</p>
            </div>
            
            {/* Social Media Links */}
            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Prayer Times Widget */}
          <div className="lg:pl-10">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-400" /> Today's Prayer Times
                </h3>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full font-medium">Local Time</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { name: 'Fajr', time: '5:30 AM', active: false },
                  { name: 'Dhuhr', time: '12:45 PM', active: false },
                  { name: 'Asr', time: '4:15 PM', active: true },
                  { name: 'Maghrib', time: '6:30 PM', active: false },
                  { name: 'Isha', time: '8:00 PM', active: false }
                ].map((prayer, index) => (
                  <div key={index} className={`relative overflow-hidden rounded-lg ${prayer.active ? 'bg-green-500/20' : 'bg-gray-800/50'} p-3 transition-all duration-300 hover:bg-gray-700/50`}>
                    {prayer.active && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                    )}
                    <p className={`${prayer.active ? 'text-green-400' : 'text-gray-400'} text-sm font-medium`}>{prayer.name}</p>
                    <p className="text-white font-bold text-lg">{prayer.time}</p>
                    {prayer.active && (
                      <span className="absolute bottom-1 right-2 text-[10px] text-green-400 font-medium">Current</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <span className="text-green-400 font-medium">Next Prayer:</span> Maghrib in 2h 15m
                </div>
                <Link href="/prayer-times" className="text-green-400 text-sm hover:text-green-300 transition-colors flex items-center">
                  Full Schedule <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Compass className="h-5 w-5 mr-2 text-green-400" /> Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Religious Events', href: '/religious/events' },
                { name: 'Admissions', href: '/school/admissions' },
                { name: 'Digital Library', href: '/library' },
                { name: 'Donations', href: '/donations' },
                { name: 'Contact Us', href: '/contact' }
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.href} className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-green-400 mr-2 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Religious Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-green-400" /> Religious Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Live Streaming', href: '/religious/live' },
                { name: 'Ask Aalim', href: '/religious/ask-aalim' },
                { name: 'Islamic Courses', href: '/religious/courses' },
                { name: 'Quran Classes', href: '/religious/quran' },
                { name: 'Community Events', href: '/religious/community' },
                { name: 'Ramadan Programs', href: '/religious/ramadan' }
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.href} className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-green-400 mr-2 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-green-400" /> Academic Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Student Portal', href: '/school/student' },
                { name: 'Teacher Dashboard', href: '/school/teacher' },
                { name: 'Online Fee Payment', href: '/school/fees' },
                { name: 'E-Book Access', href: '/library/ebooks' },
                { name: 'Academic Calendar', href: '/school/calendar' },
                { name: 'Parent Resources', href: '/school/parents' }
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link href={link.href} className="text-gray-300 hover:text-green-400 transition-colors text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-green-400 mr-2 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-400" /> Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 p-1.5 rounded-full bg-gray-800 group-hover:bg-green-500/20 transition-colors">
                  <MapPin className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">
                    Banpora Chattergam<br />
                    191113 Kashmir<br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 p-1.5 rounded-full bg-gray-800 group-hover:bg-green-500/20 transition-colors">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Contact us for more info</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 p-1.5 rounded-full bg-gray-800 group-hover:bg-green-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">info@idarahwaliulaser.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Heart className="h-4 w-4 text-green-500 mr-2" />
            <p className="text-gray-400 text-sm">
              © {currentYear} Idarah Wali Ul Aser Chattergam. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
