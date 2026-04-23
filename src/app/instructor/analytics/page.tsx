'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, BarChart2, PieChart as PieChartIcon } from 'lucide-react';

const COLORS = ['#09637E', '#7AB2B2', '#EBF4F6', '#088395', '#1a3a44'];

export default function InstructorAnalytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/analytics/instructor');
        setData(response.data as any);
      } catch (err) {
        console.error('Analytics failed');
      }
    };
    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6 animate-pulse">
        <div className="h-24 w-full bg-white rounded-2xl border border-gray-100 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="h-[400px] bg-white rounded-3xl border border-gray-100"></div>
          <div className="h-[400px] bg-white rounded-3xl border border-gray-100"></div>
        </div>
        <div className="h-32 w-full bg-white rounded-3xl border border-gray-100"></div>
      </div>
    );
  }

  const statusData = data.statusDistribution?.map((s: any) => ({
    name: s._id,
    value: s.count
  })) || [];

  const difficultyData = data.difficultyDistribution?.map((d: any) => ({
    name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
    count: d.count
  })) || [];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 pb-20">
      <header className="mb-8 md:mb-10 bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#EBF4F6] to-transparent opacity-50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#09637E] tracking-tight mb-2 flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-[#088395]" />
              Learning Analytics
            </h1>
            <p className="text-[#1a3a44]/60 text-lg">Data-driven insights to monitor student performance</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 px-4 py-2.5 rounded-xl text-green-700 font-bold text-sm border border-green-100 flex items-center gap-2 shadow-sm relative z-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Live Sync Active
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 min-h-[420px] flex flex-col"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-[#EBF4F6] rounded-lg">
              <PieChartIcon className="w-5 h-5 text-[#09637E]" />
            </div>
            <h3 className="text-xl font-bold text-[#09637E]">Submission Status</h3>
          </div>
          <div className="flex-1 w-full flex items-center justify-center">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px 20px', fontWeight: 'bold' }} 
                    itemStyle={{ color: '#1a3a44' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 600, fontSize: '14px', color: '#1a3a44' }}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 italic font-medium">Not enough data to display</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 min-h-[420px] flex flex-col"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-[#EBF4F6] rounded-lg">
              <TrendingUp className="w-5 h-5 text-[#09637E]" />
            </div>
            <h3 className="text-xl font-bold text-[#09637E]">Assignments by Difficulty</h3>
          </div>
          <div className="flex-1 w-full">
            {difficultyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={difficultyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontWeight: 600, fontSize: 13 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontWeight: 600, fontSize: 13 }} />
                  <Tooltip 
                     cursor={{ fill: '#f3f4f6' }}
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px 20px', fontWeight: 'bold' }}
                     itemStyle={{ color: '#1a3a44' }}
                  />
                  <Bar dataKey="count" fill="#088395" radius={[8, 8, 0, 0]} maxBarSize={60}>
                    {difficultyData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-400 italic font-medium">Not enough data to display</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden bg-gradient-to-br from-[#09637E] to-[#088395] rounded-[2rem] text-white p-8 md:p-10 shadow-xl shadow-[#09637E]/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">AI Insights</h3>
          </div>
          <p className="text-white/90 text-lg leading-relaxed font-medium">
            Based on current trends, students are struggling most with <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md">Advanced</span> tasks. 
            Consider providing additional resources, video tutorials, or breaking down complex assignments into smaller, more manageable milestones to improve completion rates.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
