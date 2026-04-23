'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data as any;
      login(data.result, data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
        className="w-full max-w-md"
      >
        <div className="card shadow-2xl p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-white">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="bg-[#09637E] p-3 rounded-2xl mb-6 shadow-lg shadow-[#09637E]/20">
              <GraduationCap className="text-white w-8 h-8" />
            </Link>
            <h2 className="text-3xl font-bold text-[#1a3a44] mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-[#1a3a44]/60 text-center">Login to your ALAP account to continue</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3 border border-red-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1a3a44] mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a3a44]/40" />
                <input 
                  type="email" 
                  className="input-field pl-12" 
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm font-semibold text-[#1a3a44]">Password</label>
                <Link href="#" className="text-xs font-semibold text-[#09637E] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a3a44]/40" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field pl-12 pr-12" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a3a44]/40 hover:text-[#1a3a44]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#09637E] focus:ring-[#09637E]" />
              <label htmlFor="remember" className="text-sm text-[#1a3a44]/60">Remember me for 30 days</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-premium w-full py-4 text-lg font-bold mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Login to Account'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-[#1a3a44]/70">
              New to the platform? <Link href="/register" className="text-[#09637E] font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-[#1a3a44]/40">
          © 2026 ALAP Platform. All rights reserved. Secure institutional access.
        </p>
      </motion.div>
    </div>
  );
}
