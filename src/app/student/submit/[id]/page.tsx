'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { Link as LinkIcon, FileText, Send, ArrowLeft, Clock, Info, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function SubmitAssignment() {
  const { id } = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<any>(null);
  const [formData, setFormData] = useState({
    url: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await api.get(`/assignments/${id}`);
        setAssignment(response.data as any);
      } catch (err) {
        console.error('Unable to retrieve assignment details from the server');
        toast.error('Failed to load assignment details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      toast.error('Please provide a valid project URL.');
      return;
    }
    if (!formData.note.trim()) {
      toast.error('Please provide a descriptive note.');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/submissions', {
        assignmentId: id,
        ...formData
      });
      await Swal.fire({
        title: 'Success!',
        text: 'Your assignment has been submitted successfully.',
        icon: 'success',
        confirmButtonColor: '#09637E',
      });
      router.push('/student/submissions');
    } catch (err: any) {
      console.error('Error encountered while submitting the assignment:', err);
      toast.error(err.response?.data?.message || 'Failed to submit assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
          <div className="mb-10">
            <div className="h-10 w-3/4 max-w-md bg-gray-200 rounded mb-4"></div>
            <div className="h-5 w-1/2 max-w-sm bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="card space-y-8">
                <div>
                  <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-64 bg-gray-100 rounded"></div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
                    <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
                  </div>
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
                    <div className="h-32 w-full bg-gray-100 rounded-xl"></div>
                  </div>
                  <div className="h-14 w-full bg-gray-200 rounded-xl mt-6"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="card h-64 bg-gray-50 border-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!assignment && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-[#09637E] mb-2">Assignment Not Found</h2>
        <p className="text-gray-500 mb-6">The assignment you are trying to submit could not be found or has been removed.</p>
        <button onClick={() => router.back()} className="btn-primary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Toaster position="top-right" />
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#09637E] font-medium mb-8 hover:text-[#0b7a9b] transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <header className="mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-md border uppercase tracking-wider ${getDifficultyColor(assignment.difficulty)}`}>
              {assignment.difficulty || 'Standard'}
            </span>
            {assignment.deadline && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-md">
                <Clock size={14} />
                Due: {new Date(assignment.deadline).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#09637E] tracking-tight mb-3">Submit: {assignment.title}</h1>
          <p className="text-[#1a3a44]/70 text-lg">Share your hard work and get valuable feedback from your instructor.</p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-0 overflow-hidden border-0 shadow-lg shadow-[#09637E]/5"
          >
            <div className="p-6 md:p-8 border-b border-gray-100 bg-white">
              <h2 className="text-xl font-bold text-[#09637E] flex items-center gap-2 mb-1">
                <FileText size={20} className="text-[#09637E]" />
                Submission Details
              </h2>
              <p className="text-sm text-gray-500">Provide the link to your completed work and any necessary notes.</p>
            </div>

            <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1a3a44] mb-2">Project URL <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <LinkIcon className="absolute left-4 top-3.5 text-[#1a3a44]/40 group-focus-within:text-[#09637E] transition-colors" size={18} />
                    <input 
                      type="url" 
                      className="input-field pl-11" 
                      placeholder="https://github.com/username/project"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      required 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 ml-1">Link to your GitHub repository, deployed site, or cloud document.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a3a44] mb-2">Descriptive Note <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-3.5 text-[#1a3a44]/40 group-focus-within:text-[#09637E] transition-colors" size={18} />
                    <textarea 
                      className="input-field pl-11 min-h-[160px] resize-y py-3" 
                      placeholder="Tell your instructor about your approach, challenges you faced, or specific areas you want feedback on..."
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-premium w-full flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Submitting Work...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Assignment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card bg-white"
          >
            <h3 className="text-lg font-bold text-[#09637E] flex items-center gap-2 mb-5">
              <Info size={18} />
              Assignment Info
            </h3>
            
            <div className="space-y-5">
              {assignment.description && (
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h4>
                  <div className="text-sm text-gray-600 leading-relaxed max-h-48 overflow-y-auto custom-scrollbar pr-2 whitespace-pre-wrap">
                    {assignment.description}
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Guidelines</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#088395] mt-0.5 shrink-0" />
                    <span className="leading-tight">Ensure your repository is public or accessible to the instructor.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#088395] mt-0.5 shrink-0" />
                    <span className="leading-tight">Double-check your URL before submitting.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-[#088395] mt-0.5 shrink-0" />
                    <span className="leading-tight">You can only submit this assignment once.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-gradient-to-br from-[#09637E]/5 to-[#088395]/10 border-none shadow-none"
          >
            <h3 className="text-sm font-bold text-[#09637E] mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">If you're having trouble submitting your assignment, please reach out to your instructor or teaching assistant.</p>
            <button className="text-xs font-semibold text-[#09637E] hover:text-[#088395] transition-colors flex items-center gap-1 group">
              Contact Support <ArrowLeft size={12} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
