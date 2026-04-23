'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Save, BookOpen, CalendarDays, BarChart, FileText, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function CreateAssignment() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    difficulty: 'beginner'
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleOptimize = async () => {
    if (!formData.description) {
      toast.error('Please write some description first!');
      return;
    }
    setIsOptimizing(true);
    const toastId = toast.loading('AI is optimizing your description...');
    try {
      const response = await api.post('/assignments/refine', { description: formData.description });
      setFormData({
        ...formData,
        description: (response.data as any).refined
      });
      toast.success('Description optimized successfully!', { id: toastId });
    } catch (err) {
      console.error('AI refinement failed');
      toast.error('AI refinement failed. Please try again.', { id: toastId });
    } finally {
      setIsOptimizing(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/assignments', formData);
      await Swal.fire({
        title: 'Success!',
        text: 'Assignment created successfully.',
        icon: 'success',
        confirmButtonColor: '#09637E',
      });
      router.push('/instructor/dashboard');
    } catch (err) {
      toast.error('Failed to create assignment. Please check the details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
      <Toaster position="top-right" />
      
      <button 
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-[#09637E] font-semibold transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <header className="mb-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#09637E] tracking-tight mb-2">Create New Assignment</h1>
          <p className="text-[#1a3a44]/70 text-lg">Define the next challenge for your students and let AI help you structure it.</p>
        </motion.div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-[#09637E]/5 overflow-hidden relative"
      >
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#EBF4F6] to-transparent opacity-40 rounded-bl-full pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8 relative z-10">
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#09637E] flex items-center gap-2 border-b border-gray-100 pb-2">
              <BookOpen size={20} className="text-[#088395]" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Assignment Title</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#09637E] focus:border-[#09637E] block p-3.5 transition-colors" 
                  placeholder="e.g. Next.js Fundamentals & Routing"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <BarChart size={16} className="text-gray-400" /> Difficulty
                  </label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#09637E] focus:border-[#09637E] block p-3.5 transition-colors cursor-pointer appearance-none"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-gray-400" /> Deadline
                  </label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-[#09637E] focus:border-[#09637E] block p-3.5 transition-colors" 
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    required 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-2">
              <h3 className="text-lg font-bold text-[#09637E] flex items-center gap-2">
                <FileText size={20} className="text-[#088395]" />
                Detailed Description
              </h3>
              <button 
                type="button"
                onClick={handleOptimize}
                disabled={isOptimizing || !formData.description}
                className="flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#088395] to-[#7AB2B2] px-4 py-2 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isOptimizing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isOptimizing ? 'Optimizing Details...' : 'Optimize Clarity with AI'}
              </button>
            </div>
            
            <textarea 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-[#09637E] focus:border-[#09637E] block p-5 transition-colors min-h-[250px] resize-y leading-relaxed" 
              placeholder="Describe the assignment requirements, learning objectives, and any specific instructions students need to follow. You can write a draft and use the AI tool to refine it..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-8 py-3.5 text-gray-600 font-bold bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-premium flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl font-black tracking-wide shadow-lg shadow-[#09637E]/20 disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {isSubmitting ? 'CREATING...' : 'PUBLISH ASSIGNMENT'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
