'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, Star, Settings, BarChart2, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features', icon: <Star className="w-4 h-4" /> },
    { name: 'How it Works', href: '#how-it-works', icon: <Settings className="w-4 h-4" /> },
    { name: 'Analytics', href: '#analytics', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        isScrolled ? 'glass py-3 shadow-sm !border-none' : 'bg-transparent py-3 !border-none shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#09637E] p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-[#09637E] tracking-tight">ALAP</span>
        </Link>

        {/* Links for desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 text-[#1a3a44]/80 hover:text-[#09637E] font-medium transition-colors"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Authentication and user profile controls */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#09637E]/10 text-[#09637E] hover:bg-[#09637E]/20 transition-colors"
                >
                  <User size={20} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 mb-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                        <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold bg-[#09637E]/10 text-[#09637E] px-2 py-0.5 rounded-full">
                          {user.role}
                        </span>
                      </div>
                      
                      <Link 
                        href={user.role.toLowerCase() === 'instructor' ? '/instructor/dashboard' : '/student/dashboard'}
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#09637E] transition-colors"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={logout}
                className="btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-[#1a3a44]/80 hover:text-[#09637E] font-medium transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-premium py-2 px-6">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Navigation toggle for small screens */}
        <button
          className="md:hidden text-[#1a3a44]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Collapsible menu for mobile devices */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-[#1a3a44]"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/20" />
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href={user.role.toLowerCase() === 'instructor' ? '/instructor/dashboard' : '/student/dashboard'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-premium text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="btn-secondary text-center w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary text-center">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-premium text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
