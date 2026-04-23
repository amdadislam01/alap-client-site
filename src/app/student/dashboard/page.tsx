'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ChevronRight, X, Clock, Target, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get('/assignments');
        setAssignments(response.data as any);
      } catch (err) {
        console.error('Failed to fetch assignments');
      }
    };
    fetchAssignments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <header className="mb-12 p-8 md:p-12 rounded-[2rem] bg-[#09637E] text-white shadow-2xl shadow-[#09637E]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#7AB2B2]/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-[60px]"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase">Active Semester</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Your Learning Journey</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            Select a challenge that matches your skill level, apply your knowledge, and build your professional portfolio.
          </p>
        </div>
      </header>

      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-bold text-[#1a3a44]">Available Missions</h2>
        <span className="text-sm font-semibold text-[#1a3a44]/50">{assignments.length} assignments found</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment: any, index: number) => (
          <AssignmentCard 
            key={assignment._id} 
            assignment={assignment} 
            index={index} 
            onClick={() => setSelectedAssignment(assignment)}
          />
        ))}

        {assignments.length === 0 && (
          <div className="col-span-full card text-center py-32 bg-white/50 backdrop-blur-sm border-dashed border-2 border-[#7AB2B2]/30">
            <div className="w-20 h-20 bg-[#EBF4F6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <BookOpen className="text-[#09637E]" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-[#09637E] mb-3">No Missions Available</h3>
            <p className="text-[#1a3a44]/60 text-lg">Check back later for new challenges from your instructor.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAssignment && (
          <AssignmentModal 
            assignment={selectedAssignment} 
            onClose={() => setSelectedAssignment(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AssignmentCard({ assignment, index, onClick }: { assignment: any, index: number, onClick: () => void }) {
  const diffStyles: any = {
    'beginner': { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    'intermediate': { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    'advanced': { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' }
  };
  const style = diffStyles[assignment.difficulty] || diffStyles['beginner'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white rounded-3xl p-6 border border-[#1a3a44]/5 hover:border-[#09637E]/20 shadow-sm hover:shadow-xl hover:shadow-[#09637E]/5 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#EBF4F6] to-transparent opacity-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-[#09637E] group-hover:bg-[#09637E] group-hover:text-white transition-colors duration-300">
          <Target size={24} />
        </div>
        <span className={clsx(
          "px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border",
          style.color, style.bg, style.border
        )}>
          {assignment.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-bold text-[#1a3a44] mb-3 pb-1 line-clamp-2 leading-snug group-hover:text-[#09637E] transition-colors">{assignment.title}</h3>
      <p className="text-[#1a3a44]/60 text-sm mb-8 flex-1 line-clamp-3 leading-relaxed">{assignment.description}</p>
      
      <div className="flex items-center justify-between pt-5 border-t border-gray-100/80 relative z-10">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1a3a44]/50">
          <Clock size={14} />
          <span>{new Date(assignment.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#EBF4F6] flex items-center justify-center text-[#09637E] group-hover:bg-[#09637E] group-hover:text-white transition-colors">
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}

function AssignmentModal({ assignment, onClose }: { assignment: any, onClose: () => void }) {
  const diffStyles: any = {
    'beginner': { color: 'text-emerald-700', bg: 'bg-emerald-100' },
    'intermediate': { color: 'text-amber-700', bg: 'bg-amber-100' },
    'advanced': { color: 'text-rose-700', bg: 'bg-rose-100' }
  };
  const style = diffStyles[assignment.difficulty] || diffStyles['beginner'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#1a3a44]/40 backdrop-blur-sm cursor-pointer"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="absolute top-0 right-0 p-6 z-20">
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/80 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-[#1a3a44]/60 hover:text-[#1a3a44] shadow-sm transition-all hover:scale-105"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-[#EBF4F6]/50 p-8 sm:p-10 border-b border-gray-100 relative overflow-hidden shrink-0">
          <div className="absolute -right-10 -top-10 text-[#09637E]/5 opacity-20">
            <BookOpen size={200} />
          </div>
          <div className="relative z-10">
            <span className={clsx(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4",
              style.color, style.bg
            )}>
              {assignment.difficulty} Level
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#09637E] leading-normal pb-2 mb-2">{assignment.title}</h2>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1a3a44]/60 bg-white/60 inline-flex px-4 py-2 rounded-xl backdrop-blur-sm">
              <Calendar size={16} className="text-[#088395]" />
              Deadline: <span className="text-[#1a3a44]">{new Date(assignment.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar flex-1">
          <h3 className="text-sm font-bold text-[#1a3a44]/40 uppercase tracking-widest mb-4">Mission Description</h3>
          <div className="prose prose-sm sm:prose-base max-w-none text-[#1a3a44]/80 whitespace-pre-wrap leading-relaxed">
            {assignment.description}
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-[#1a3a44]/60 hover:text-[#1a3a44] transition-colors"
          >
            Cancel
          </button>
          <Link 
            href={`/student/submit/${assignment._id}`}
            className="btn-premium flex-1 sm:flex-none flex items-center justify-center gap-2 py-4 px-8 text-sm font-black tracking-widest shadow-lg shadow-[#09637E]/20"
          >
            ACCEPT MISSION
            <ChevronRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
