'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Slight delay ensures the router and auth state are synchronized before making a redirection decision
    const check = setTimeout(() => {
      const savedUser = localStorage.getItem('alap_user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;
      
      const currentUser = user || parsedUser;

      if (!currentUser || currentUser.role.toLowerCase() !== 'instructor') {
        router.push('/login');
      }
    }, 100);

    return () => clearTimeout(check);
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#EBF4F6]/30">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#09637E]/20 border-t-[#09637E] rounded-full animate-spin"></div>
          <p className="text-[#09637E] font-semibold text-sm tracking-wide">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Secondary validation ensures unauthorized users don't see content before the redirect takes effect
  const savedUser = typeof window !== 'undefined' ? localStorage.getItem('alap_user') : null;
  const currentUser = user || (savedUser ? JSON.parse(savedUser) : null);
  
  if (!currentUser || currentUser.role.toLowerCase() !== 'instructor') {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-4 md:p-8 bg-[#EBF4F6]/30 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

