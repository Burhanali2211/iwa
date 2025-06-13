'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Play, Calendar, Heart, BookOpen } from 'lucide-react';


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "IDARAH WALI UL ASER",
      subtitle: "Religious Organisation in Chattergam Kashmir",
      description: "Founded by Aga Syed Mustafa Al Hussaini Al Hamadani in 2005 as a Library with the intention to bring light of knowledge to people. Our aim is to enlighten people with true knowledge of Imam Hussain A.S and his true aim of sacrifices on the Holy Land of Karbala.",
      image: "/school.jpg", // fixed path
      cta: {
        primary: { text: "Explore Library", href: "/library" },
        secondary: { text: "About Us", href: "/about" }
      }
    },
    {
      id: 2,
      title: "MAKTAB WALI UL ASER",
      subtitle: "First Step Towards Building Taqwa",
      description: "Our Institute is working on bringing innovative and authentic Islamic knowledge and holding new competitions to boost interests of Gen-Z and Gen-X students. Located in Banpora Chattergam 191113.",
      image: "/ramazan.jpg", // fixed path
      cta: {
        primary: { text: "View Institute", href: "/school" },
        secondary: { text: "Gallery", href: "/events" }
      }
    },
    {
      id: 3,
      title: "Mission of Sayyed Mustafa Hamadani",
      subtitle: "Bringing Light of Knowledge",
      description: "Currently managed by a group of dedicated people, we continue the mission of our founder to spread authentic Islamic knowledge and the true teachings of Imam Hussain A.S.",
      image: "/support.jpg", // fixed path
      cta: {
        primary: { text: "Our Team", href: "/about" },
        secondary: { text: "Support Us", href: "/donations/donate" }
      }
    },
    {
      id: 4,
      title: "Digital Library & E-Books",
      subtitle: "Access Islamic Knowledge",
      description: "Explore our comprehensive collection of Islamic books, research materials, and digital resources. Access thousands of authentic Islamic texts and scholarly works.",
      image: "/library.jpg", // fixed path
      cta: {
        primary: { text: "Browse Library", href: "/library" },
        secondary: { text: "E-Books", href: "/library/ebooks" }
      }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[calc(100vh-6rem)] pt-32 flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-gray-800"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-green-300">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            {slides[currentSlide].description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={slides[currentSlide].cta.primary.href}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {slides[currentSlide].cta.primary.text}
            </Link>
            <Link
              href={slides[currentSlide].cta.secondary.href}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {slides[currentSlide].cta.secondary.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-green-500' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent py-6 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/religious/live"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 flex items-center gap-3 border border-white/10 hover:border-white/20 group"
            >
              <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30">
                <Play className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Live Stream</h3>
                <p className="text-sm text-gray-200">Watch Now</p>
              </div>
            </Link>
            <Link
              href="/religious/events"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 flex items-center gap-3 border border-white/10 hover:border-white/20 group"
            >
              <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Events</h3>
                <p className="text-sm text-gray-200">View Schedule</p>
              </div>
            </Link>
            <Link
              href="/donations/donate"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 flex items-center gap-3 border border-white/10 hover:border-white/20 group"
            >
              <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30">
                <Heart className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Donate</h3>
                <p className="text-sm text-gray-200">Support Us</p>
              </div>
            </Link>
            <Link
              href="/school/student"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-xl transition-all duration-300 flex items-center gap-3 border border-white/10 hover:border-white/20 group"
            >
              <div className="p-2 rounded-lg bg-yellow-500/20 group-hover:bg-yellow-500/30">
                <BookOpen className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Student Portal</h3>
                <p className="text-sm text-gray-200">Login</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
