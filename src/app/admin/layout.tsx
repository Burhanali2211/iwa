'use client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { ReactNode, useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <main className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {children}
      </main>
    </div>
  );
} 