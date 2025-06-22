import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import EventsSection from '@/components/home/EventsSection';
import DailyContent from '@/components/home/DailyContent';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Building2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none islamic-pattern-1"></div>

      {/* Additional decorative patterns */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full islamic-pattern-2"></div>
      </div>

      <Header />

      <main className="relative z-10">
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-[20%] right-0 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-8 blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-[50%] left-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-8 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-6 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '4s' }}></div>

        <HeroSection />

        {/* Enhanced Section Divider */}
        <div className="relative section-padding overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl rounded-full z-10 animate-bounce-in">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <div className="absolute left-1/2 top-8 bottom-0 w-px bg-gradient-to-b from-green-500/60 via-emerald-500/40 to-transparent -z-10"></div>
          <div className="pt-8">
            <DailyContent />
          </div>
        </div>

        <FeaturesSection />

        {/* Enhanced Section Divider */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
          <div className="section-padding-lg">
            <StatsSection />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60"></div>
        </div>

        <EventsSection />

        {/* Enhanced Section Divider */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60"></div>
          <TestimonialsSection />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
