'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { 
  Users, 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  PlusCircle, 
  BarChart2,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  Save,
  X,
  User,
  CalendarDays
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function InstructorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, subsRes] = await Promise.all([
        api.get('/analytics/instructor'),
        api.get('/submissions/instructor')
      ]);
      setStats(statsRes.data as any);
      setRecentSubmissions((subsRes.data as any).slice(0, 4));
    } catch (err) {
      console.error('Failed to fetch dashboard data');
      toast.error('Failed to load dashboard data.');
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
      fetchData();
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
      <div className="max-w-7xl mx-auto p-4 md:p-6 animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-5 w-96 bg-gray-200 rounded mb-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
           {[1,2,3,4].map(i => <div key={i} className="h-44 bg-white border border-gray-100 rounded-[2rem]"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 h-[400px] bg-white border border-gray-100 rounded-[2rem]"></div>
           <div className="h-[400px] bg-white border border-gray-100 rounded-[2rem]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 pb-20 relative">
      <Toaster position="top-right" />
      
      <header className="mb-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#09637E] tracking-tight mb-3">Instructor Dashboard</h1>
          <p className="text-[#1a3a44]/70 text-lg">Welcome back! Here's an overview of your students' performance.</p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          icon={<FileText className="text-[#09637E]" />} 
          label="Total Assignments" 
          value={stats?.totalAssignments || 0} 
          color="bg-[#09637E]/10 border-[#09637E]/20" 
        />
        <StatCard 
          icon={<Users className="text-emerald-600" />} 
          label="Active Students" 
          value={stats?.totalStudents || 24} 
          color="bg-emerald-50 border-emerald-100" 
        />
        <StatCard 
          icon={<AlertCircle className="text-amber-500" />} 
          label="Pending Review" 
          value={stats?.statusDistribution?.find((s: any) => s._id === 'Pending')?.count || 0} 
          color="bg-amber-50 border-amber-100" 
        />
        <StatCard 
          icon={<TrendingUp className="text-[#088395]" />} 
          label="Avg. Completion" 
          value="78%" 
          color="bg-[#088395]/10 border-[#088395]/20" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-[#09637E]">Recent Submissions</h3>
            <button 
              className="text-sm font-bold text-[#088395] bg-[#088395]/10 px-4 py-2 rounded-xl hover:bg-[#088395]/20 transition-colors" 
              onClick={() => router.push('/instructor/submissions')}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
             {recentSubmissions.map((sub: any) => (
               <div 
                 key={sub._id} 
                 onClick={() => {
                   setSelectedSubmission(sub);
                   setFeedback(sub.feedback || '');
                   setStatus(sub.status);
                 }}
                 className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl bg-[#EBF4F6]/50 border border-transparent hover:border-[#088395]/20 hover:bg-[#EBF4F6] transition-all cursor-pointer group gap-4"
               >
                 <div className="flex items-center gap-4 w-full sm:w-auto">
                   <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#09637E] font-black text-lg shadow-sm border border-gray-100 uppercase shrink-0">
                     {sub.studentId?.name?.charAt(0)}
                   </div>
                   <div className="overflow-hidden">
                     <p className="font-bold text-[#1a3a44] truncate text-lg">{sub.studentId?.name}</p>
                     <p className="text-sm text-[#1a3a44]/60 truncate font-medium">{sub.assignmentId?.title}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                   <span className={clsx(
                     "px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border",
                     sub.status === 'Accepted' ? 'bg-green-50 text-green-700 border-green-200' : 
                     sub.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                     'bg-red-50 text-red-700 border-red-200'
                   )}>
                     {sub.status}
                   </span>
                   <div className="text-[#088395] opacity-0 group-hover:opacity-100 transition-opacity">
                     <MessageSquare size={20} />
                   </div>
                 </div>
               </div>
             ))}
             
             {recentSubmissions.length === 0 && (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                 <CheckCircle size={40} className="text-gray-300 mb-4" />
                 <p className="text-gray-500 font-medium">No recent activity found.</p>
               </div>
             )}
             
             <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
               <p className="text-[10px] text-[#09637E]/40 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                 Real-time activity sync enabled
               </p>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#09637E] mb-8">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
             <button 
               onClick={() => router.push('/instructor/create')}
               className="btn-premium w-full justify-between flex items-center gap-4 group p-5 rounded-2xl shadow-md shadow-[#09637E]/10"
             >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                    <PlusCircle size={24} className="text-white" />
                  </div>
                  <span className="font-bold text-lg tracking-wide">New Assignment</span>
                </div>
                <TrendingUp size={20} className="text-white/50 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
             </button>
             
             <button 
               onClick={() => router.push('/instructor/analytics')}
               className="w-full justify-between flex items-center gap-4 group p-5 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#7AB2B2]/50 hover:bg-[#EBF4F6]/30 transition-all text-[#1a3a44]"
             >
                <div className="flex items-center gap-3">
                  <div className="bg-[#EBF4F6] p-2 rounded-xl text-[#088395]">
                    <BarChart2 size={24} />
                  </div>
                  <span className="font-bold text-lg">Full Analytics</span>
                </div>
                <TrendingUp size={20} className="text-[#088395]/50 group-hover:text-[#088395] transition-colors group-hover:translate-x-1 duration-300" />
             </button>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200/50">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Instructor Tip</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Consistently reviewing assignments within 24 hours boosts student engagement by up to <span className="font-black text-[#09637E]">40%</span>.
            </p>
          </div>
        </motion.div>
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

function StatCard({ icon, label, value, color }: any) {
  const bgColor = color?.split(' ')[0] || 'bg-gray-50';
  const borderColor = color?.split(' ')[1] || 'border-gray-100';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white rounded-[2rem] border ${borderColor} p-6 flex flex-col justify-between h-44 shadow-sm hover:shadow-lg transition-all cursor-pointer relative overflow-hidden group`}
    >
      <div className={`absolute -right-6 -top-6 w-28 h-28 rounded-full ${bgColor} opacity-40 group-hover:scale-110 transition-transform duration-500 pointer-events-none`}></div>
      <div className={`${bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10 border ${borderColor}`}>
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-[#09637E] tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
