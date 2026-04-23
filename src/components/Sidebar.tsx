'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  BarChart2, 
  LogOut,
  User,
  Settings,
  GraduationCap
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = user?.role.toLowerCase() === 'instructor' ? [
    { name: 'Dashboard', href: '/instructor/dashboard', icon: LayoutDashboard },
    { name: 'Create Assignment', href: '/instructor/create', icon: PlusCircle },
    { name: 'Submissions', href: '/instructor/submissions', icon: FileText },
    { name: 'Analytics', href: '/instructor/analytics', icon: BarChart2 },
  ] : [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Submissions', href: '/student/submissions', icon: FileText },
  ];

  return (
    <>
      {/* Clickable backdrop for mobile navigation */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden cursor-pointer"
          onClick={onClose}
        />
      )}

      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#7AB2B2]/20 flex flex-col p-6 shadow-[4px_0_24px_rgba(9,99,126,0.05)] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-10 px-2">
          <Link href="/" className="flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]">
            <div className="bg-[#09637E] p-2.5 rounded-xl group-hover:rotate-12 transition-transform shadow-sm">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#09637E] leading-tight tracking-tighter">ALAP</h1>
              <p className="text-[10px] text-[#1a3a44]/40 font-bold tracking-[0.15em] uppercase">Intelligence</p>
            </div>
          </Link>

          {/* Button to dismiss the sidebar on smaller screens */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-[#09637E] hover:bg-[#EBF4F6] rounded-xl transition-colors"
          >
            <LogOut className="rotate-180" size={20} />
          </button>
        </div>

        {/* Main sidebar navigation links based on user role */}
        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={onClose}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                pathname === item.href 
                  ? "bg-[#EBF4F6] text-[#09637E] font-semibold" 
                  : "text-[#1a3a44]/60 hover:bg-[#EBF4F6]/50 hover:text-[#09637E]"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-[#7AB2B2]/20">
          <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-[#EBF4F6]/50 border border-[#7AB2B2]/10 group transition-all hover:bg-[#EBF4F6] cursor-pointer">
            <div className="w-10 h-10 bg-[#09637E] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <User size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-[#09637E] truncate">{user?.name}</p>
              <p className="text-[10px] text-[#1a3a44]/50 font-bold uppercase tracking-wider">{user?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-5 py-4 w-full text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all duration-300 active:scale-95 shadow-sm hover:shadow-red-200/50"
          >
            <LogOut size={20} />
            Logout Account
          </button>
        </div>
      </div>
    </>
  );
}

