'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft, User, Mail, Lock, UserCircle, Briefcase } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#EBF4F6]/30 hero-gradient">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[#1a3a44]/60 hover:text-[#09637E] transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="card shadow-2xl p-8 md:p-12 bg-white/80 backdrop-blur-xl border border-white">
          <div className="flex flex-col items-center mb-10 text-center">
            <Link href="/" className="bg-[#088395] p-3 rounded-2xl mb-6 shadow-lg shadow-[#088395]/20">
              <GraduationCap className="text-white w-8 h-8" />
            </Link>
            <h2 className="text-3xl font-bold text-[#1a3a44] mb-2 tracking-tight">Create Account</h2>
            <p className="text-[#1a3a44]/60 max-w-md">Join thousands of students and instructors on the ultimate learning analytics platform.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-xl mb-8 text-sm border border-red-100 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a3a44] mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a3a44]/40" />
                  <input 
                    type="text" 
                    className="input-field pl-12" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a3a44] mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a3a44]/40" />
                  <input 
                    type="email" 
                    className="input-field pl-12" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a3a44] mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a3a44]/40" />
                <input 
                  type="password" 
                  className="input-field pl-12" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a3a44] mb-4 ml-1 text-center">Select Your Role</label>
              <div className="grid grid-cols-2 gap-4">
                <RoleCard 
                  active={formData.role === 'student'} 
                  onClick={() => setFormData({...formData, role: 'student'})}
                  icon={<UserCircle className="w-6 h-6" />}
                  title="Student"
                  description="Track assignments & analytics"
                />
                <RoleCard 
                  active={formData.role === 'instructor'} 
                  onClick={() => setFormData({...formData, role: 'instructor'})}
                  icon={<Briefcase className="w-6 h-6" />}
                  title="Instructor"
                  description="Manage class & assignments"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-premium w-full py-4 text-lg font-bold mt-4 flex items-center justify-center gap-2 disabled:opacity-70 shadow-xl"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Create Your Account'
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-[#1a3a44]/70">
              Already have an account? <Link href="/login" className="text-[#09637E] font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function RoleCard({ active, onClick, icon, title, description }: { active: boolean, onClick: () => void, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center ${
        active 
          ? 'border-[#09637E] bg-[#09637E]/5 shadow-md' 
          : 'border-gray-100 bg-white hover:border-[#7AB2B2]/50 hover:bg-gray-50'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${active ? 'bg-[#09637E] text-white' : 'bg-gray-100 text-gray-500'}`}>
        {icon}
      </div>
      <h4 className={`font-bold mb-1 ${active ? 'text-[#09637E]' : 'text-[#1a3a44]'}`}>{title}</h4>
      <p className="text-[10px] text-gray-500 leading-tight">{description}</p>
    </div>
  );
}
