'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, BookOpen, GraduationCap, Heart, Award, Calendar, Video, Library } from 'lucide-react';

// Enhanced StatCard component with varied layouts
interface EnhancedStatCardProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  color: string;
  bgColor: string;
  variant: string;
  layout: string;
  description: string;
  index: number;
}

const EnhancedStatCard = ({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
  variant,
  layout,
  description,
  index
}: EnhancedStatCardProps) => {
  const baseCardClass = "transition-all duration-300 hover:scale-105";

  if (layout === 'featured') {
    return (
      <div className={`${baseCardClass} bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-50 -mr-10 -mt-10"></div>
        <div className="relative z-10">
          <div className={`inline-flex p-4 rounded-xl mb-4 ${bgColor} shadow-lg`}>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
          <div className="text-lg font-semibold text-gray-800 mb-1">{label}</div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
    );
  }

  if (layout === 'highlight') {
    const gradientClass = color.includes('red') ? 'from-red-500 to-red-700' :
                         color.includes('orange') ? 'from-orange-500 to-orange-700' :
                         color.includes('pink') ? 'from-pink-500 to-pink-700' :
                         'from-purple-500 to-purple-700';

    return (
      <div className={`${baseCardClass} bg-gradient-to-br ${gradientClass} text-white rounded-2xl p-6 shadow-xl relative overflow-hidden`}>
        <div className="absolute inset-0 islamic-pattern-1 opacity-10"></div>
        <div className="relative z-10 text-center">
          <div className="bg-white/20 p-3 rounded-full inline-flex mb-4">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="text-4xl font-bold mb-2">{value}</div>
          <div className="text-lg font-semibold mb-1">{label}</div>
          <div className="text-sm opacity-90">{description}</div>
        </div>
      </div>
    );
  }

  if (layout === 'compact') {
    return (
      <div className={`${baseCardClass} bg-white rounded-xl p-4 shadow-lg border-l-4 ${color.replace('text-', 'border-')}`}>
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm font-medium text-gray-700">{label}</div>
            <div className="text-xs text-gray-500">{description}</div>
          </div>
        </div>
      </div>
    );
  }

  // Standard layout (default)
  return (
    <div className={`${baseCardClass} bg-white rounded-xl p-6 shadow-lg border border-gray-100`}>
      <div className="text-center">
        <div className={`inline-flex p-4 rounded-full mb-4 ${bgColor}`}>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
        <div className="text-lg font-semibold text-gray-800 mb-1">{label}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    donations: 0,
    events: 0,
    books: 0,
    graduates: 0,
    videos: 0
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  const finalStats = {
    students: 1250,
    teachers: 85,
    courses: 45,
    donations: 125000,
    events: 180,
    books: 5000,
    graduates: 850,
    videos: 320
  };

  const stats = [
    {
      icon: Users,
      label: 'Active Students',
      value: animatedStats.students,
      suffix: '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      variant: 'elevated' as const,
      layout: 'standard',
      description: 'Enrolled across all programs'
    },
    {
      icon: GraduationCap,
      label: 'Qualified Teachers',
      value: animatedStats.teachers,
      suffix: '+',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      variant: 'modern' as const,
      layout: 'featured',
      description: 'Expert Islamic scholars'
    },
    {
      icon: BookOpen,
      label: 'Courses Offered',
      value: animatedStats.courses,
      suffix: '+',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      variant: 'glass' as const,
      layout: 'compact',
      description: 'Comprehensive curriculum'
    },
    {
      icon: Heart,
      label: 'Donations Raised',
      value: animatedStats.donations,
      prefix: '$',
      suffix: '+',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      variant: 'bordered' as const,
      layout: 'highlight',
      description: 'Community support received'
    },
    {
      icon: Calendar,
      label: 'Events Organized',
      value: animatedStats.events,
      suffix: '+',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      variant: 'pattern' as const,
      layout: 'standard',
      description: 'Religious & educational events'
    },
    {
      icon: Library,
      label: 'Digital Books',
      value: animatedStats.books,
      suffix: '+',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      variant: 'gradient' as const,
      layout: 'featured',
      description: 'Islamic literature collection'
    },
    {
      icon: Award,
      label: 'Graduates',
      value: animatedStats.graduates,
      suffix: '+',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      variant: 'elevated' as const,
      layout: 'compact',
      description: 'Successful alumni worldwide'
    },
    {
      icon: Video,
      label: 'Video Lectures',
      value: animatedStats.videos,
      suffix: '+',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      variant: 'modern' as const,
      layout: 'highlight',
      description: 'Online learning resources'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        students: Math.floor(finalStats.students * easeOutQuart),
        teachers: Math.floor(finalStats.teachers * easeOutQuart),
        courses: Math.floor(finalStats.courses * easeOutQuart),
        donations: Math.floor(finalStats.donations * easeOutQuart),
        events: Math.floor(finalStats.events * easeOutQuart),
        books: Math.floor(finalStats.books * easeOutQuart),
        graduates: Math.floor(finalStats.graduates * easeOutQuart),
        videos: Math.floor(finalStats.videos * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatNumber = (num: number, prefix?: string, suffix?: string) => {
    let formattedNum = num.toLocaleString();
    
    if (num >= 1000000) {
      formattedNum = (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      formattedNum = (num / 1000).toFixed(1) + 'K';
    }

    return `${prefix || ''}${formattedNum}${suffix || ''}`;
  };

  return (
    <section ref={sectionRef} className="hero-padding bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full islamic-pattern-2 opacity-5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header with Better Contrast */}
        <div className="text-center mb-24 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-8 shadow-2xl ring-4 ring-white ring-opacity-50">
            <Award className="h-12 w-12 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 text-gradient drop-shadow-sm">
            Our Impact in Numbers
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            See how our Islamic school and religious center has been serving the community
            and making a positive difference in countless lives across generations.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Stats Grid with Varied Layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`animate-scale-in ${
                stat.layout === 'featured' ? 'md:col-span-2 lg:col-span-1' : ''
              } ${
                stat.layout === 'highlight' ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: isVisible ? `scaleIn 0.6s ease-out forwards` : 'none'
              }}
            >
              <EnhancedStatCard
                icon={stat.icon}
                label={stat.label}
                value={formatNumber(stat.value, stat.prefix, stat.suffix)}
                color={stat.color}
                bgColor={stat.bgColor}
                variant={stat.variant}
                layout={stat.layout}
                description={stat.description}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
