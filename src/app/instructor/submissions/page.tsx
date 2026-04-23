'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MessageSquare, CheckCircle, Clock, AlertTriangle, Sparkles, Save, X, User, FileText, CalendarDays } from 'lucide-react';
import { clsx } from 'clsx';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function InstructorSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await api.get('/submissions/instructor');
      setSubmissions(response.data as any);
    } catch (err) {
      console.error('Failed to fetch submissions');
      toast.error('Failed to load submissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/submissions/${selectedSubmission._id}`, { status, feedback });
      await Swal.fire({
        title: 'Review Saved!',
        text: 'The student will be notified of your feedback.',
        icon: 'success',
        confirmButtonColor: '#09637E',
      });
      setSelectedSubmission(null);
      fetchSubmissions();
    } catch (err) {
      console.error('Failed to update submission');
      toast.error('Failed to save review. Please try again.');
    }
  };

  const handleGenerateAIFeedback = async () => {
    if (!selectedSubmission) return;
    setIsGeneratingAI(true);
    try {
      const response = await api.post(`/submissions/${selectedSubmission._id}/ai-feedback`);
      setFeedback((response.data as any).aiFeedback);
      toast.success('AI feedback generated successfully!');
    } catch (err) {
      console.error('AI feedback failed');
      toast.error('Failed to generate AI feedback.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-5 w-96 bg-gray-200 rounded mb-10"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-24 border border-gray-100 p-6"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 pb-20 relative">
      <Toaster position="top-right" />
      
      <header className="mb-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#09637E] tracking-tight mb-3">Student Submissions</h1>
          <p className="text-[#1a3a44]/70 text-lg">Review work, provide qualitative feedback, and track student progress.</p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {submissions.map((sub: any, index: number) => (
          <motion.div 
            layout
            key={sub._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm hover:shadow-lg hover:shadow-[#09637E]/5 hover:border-[#09637E]/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-[#09637E] truncate max-w-md">{sub.assignmentId.title}</h3>
                <StatusBadge status={sub.status} />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
                <span className="flex items-center gap-1.5 text-[#1a3a44]">
                  <User size={16} className="text-[#088395]" />
                  {sub.studentId.name}
                </span>
                <span className="hidden md:inline text-gray-300">•</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-gray-400" />
                  {new Date(sub.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <a 
                href={sub.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-colors"
              >
                <ExternalLink size={16} />
                View Work
              </a>
              <button 
                onClick={() => {
                  setSelectedSubmission(sub);
                  setFeedback(sub.feedback || '');
                  setStatus(sub.status);
                }}
                className="flex-1 md:flex-initial btn-premium flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl font-semibold shadow-md shadow-[#09637E]/20"
              >
                <MessageSquare size={16} />
                Review
              </button>
            </div>
          </motion.div>
        ))}

        {!isLoading && submissions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 text-center px-6"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">All caught up!</h3>
            <p className="text-gray-500">There are no new submissions to review at this time.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="absolute inset-0 bg-[#1a3a44]/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="absolute top-0 right-0 p-6 z-20">
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-[#1a3a44]/60 hover:text-[#1a3a44] shadow-sm transition-all hover:scale-105"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="bg-[#EBF4F6]/50 p-8 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Reviewing Submission</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#09637E] leading-tight mb-4 pr-12">{selectedSubmission.assignmentId.title}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5 text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                    <User size={16} className="text-[#088395]" />
                    {selectedSubmission.studentId.name}
                  </span>
                  <a 
                    href={selectedSubmission.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#09637E] bg-[#09637E]/5 hover:bg-[#09637E]/10 px-3 py-1.5 rounded-lg border border-[#09637E]/10 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Open Project URL
                  </a>
                </div>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                {/* Detailed note provided by the student regarding their submission */}
                {selectedSubmission.note && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={16} /> Student's Note
                    </h4>
                    <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 text-sm italic leading-relaxed whitespace-pre-wrap">
                      "{selectedSubmission.note}"
                    </div>
                  </div>
                )}

                {/* Interactive controls for assigning an evaluation status */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Evaluation Status</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Accepted', 'Pending', 'Needs Improvement'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setStatus(opt)}
                        className={clsx(
                          "px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-center gap-2",
                          status === opt 
                            ? (opt === 'Accepted' ? 'border-green-500 bg-green-50 text-green-700' : 
                               opt === 'Pending' ? 'border-amber-500 bg-amber-50 text-amber-700' : 
                               'border-red-500 bg-red-50 text-red-700')
                            : "border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        {opt === 'Accepted' && <CheckCircle size={16} />}
                        {opt === 'Pending' && <Clock size={16} />}
                        {opt === 'Needs Improvement' && <AlertTriangle size={16} />}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dedicated area for writing or generating AI feedback */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Constructive Feedback</h4>
                    
                    <button 
                      onClick={handleGenerateAIFeedback}
                      disabled={isGeneratingAI}
                      className="flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#088395] to-[#7AB2B2] px-4 py-2 rounded-xl hover:shadow-md hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                    >
                      {isGeneratingAI ? <Clock className="animate-spin" size={14} /> : <Sparkles size={14} />}
                      {isGeneratingAI ? 'AI is Analyzing...' : 'Generate AI Review'}
                    </button>
                  </div>
                  
                  <textarea 
                    className="w-full p-5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#09637E]/20 focus:border-[#09637E] transition-all text-[#1a3a44] min-h-[180px] resize-y text-sm leading-relaxed"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your feedback here, or click 'Generate AI Review' to get a detailed automated analysis based on the student's note and assignment requirements..."
                  ></textarea>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4 shrink-0">
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="px-6 py-3 text-sm font-bold text-[#1a3a44]/60 hover:text-[#1a3a44] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate}
                  className="btn-premium flex-1 sm:flex-none flex items-center justify-center gap-2 py-3.5 px-8 text-sm font-black tracking-widest shadow-lg shadow-[#09637E]/20"
                >
                  <Save size={18} />
                  SAVE REVIEW
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
    <span className={clsx("flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider", styles[status] || 'bg-gray-50 text-gray-700 border-gray-200')}>
      {icons[status]}
      {status}
    </span>
  );
}
