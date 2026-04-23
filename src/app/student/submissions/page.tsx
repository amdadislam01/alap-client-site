'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, MessageSquare, ExternalLink, FileText, CalendarDays, Inbox } from 'lucide-react';
import { clsx } from 'clsx';

export default function StudentSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get('/submissions/student');
        setSubmissions(response.data as any);
      } catch (err) {
        console.error('Failed to fetch submissions');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'intermediate': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'advanced': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-5 w-64 bg-gray-200 rounded mb-10"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
                  <div className="h-20 w-full bg-gray-50 rounded-2xl"></div>
                </div>
                <div className="w-full md:w-32 h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 pb-20">
      <header className="mb-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#09637E] tracking-tight mb-3">My Progress</h1>
          <p className="text-[#1a3a44]/70 text-lg">Track your completed missions and view instructor feedback.</p>
        </motion.div>
      </header>

      <div className="space-y-6">
        {submissions.map((sub: any, index: number) => (
          <motion.div 
            key={sub._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-[#09637E]/5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Gradient accent for visual flair */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#EBF4F6] to-transparent opacity-30 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-[#09637E] leading-tight">{sub.assignmentId.title}</h3>
                  <StatusBadge status={sub.status} />
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold mb-6">
                  <span className={clsx("px-2.5 py-1 rounded-md border uppercase tracking-wider", getDifficultyStyles(sub.assignmentId.difficulty))}>
                    {sub.assignmentId.difficulty}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <CalendarDays size={14} />
                    {new Date(sub.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Section displaying the student's submission notes */}
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-gray-400" />
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Note</h4>
                    </div>
                    <p className="text-sm text-gray-700 italic leading-relaxed whitespace-pre-wrap">"{sub.note}"</p>
                  </div>

                  {/* Highlighted block for feedback provided by the instructor */}
                  {sub.feedback && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-gradient-to-br from-[#09637E]/5 to-[#088395]/10 border border-[#088395]/20 rounded-2xl relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#09637E] to-[#088395]"></div>
                      <div className="flex items-center gap-2 mb-3 text-[#09637E]">
                        <MessageSquare size={18} />
                        <h4 className="text-xs font-extrabold uppercase tracking-widest">Instructor Feedback</h4>
                      </div>
                      <p className="text-[#1a3a44] text-sm leading-relaxed whitespace-pre-wrap">{sub.feedback}</p>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex flex-col justify-start">
                <a 
                  href={sub.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 hover:border-[#09637E]/30 text-gray-600 hover:text-[#09637E] font-semibold rounded-xl transition-all shadow-sm hover:shadow-md group/btn"
                >
                  <ExternalLink size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  View Project
                </a>
              </div>
            </div>
          </motion.div>
        ))}

        {!isLoading && submissions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border border-dashed border-gray-200 text-center px-6"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Inbox size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Submissions Yet</h3>
            <p className="text-gray-500 max-w-md">You haven't submitted any assignments. Go to your dashboard to find active missions.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    'Accepted': 'bg-green-50 text-green-700 border-green-200',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'Needs Improvement': 'bg-red-50 text-red-700 border-red-200'
  };
  const icons: any = {
    'Accepted': <CheckCircle size={14} />,
    'Pending': <Clock size={14} />,
    'Needs Improvement': <AlertTriangle size={14} />
  };

  return (
    <span className={clsx("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border", styles[status] || 'bg-gray-50 text-gray-700 border-gray-200')}>
      {icons[status]}
      {status}
    </span>
  );
}
