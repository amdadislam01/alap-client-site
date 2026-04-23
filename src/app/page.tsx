'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Users, 
  Layout, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />

      <main>
        {/* Main hero section with platform introduction and CTA */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 hero-gradient">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4F6] text-[#09637E] text-sm font-semibold mb-6 border border-[#7AB2B2]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#088395] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#09637E]"></span>
                </span>
                New: AI-Powered Analytics
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-[#1a3a44] leading-tight mb-6 tracking-tight">
                Bridge the Gap in <br />
                <span className="gradient-text">Smart Learning</span>
              </h1>
              <p className="text-xl text-[#1a3a44]/70 mb-10 max-w-xl leading-relaxed">
                The ultimate platform for instructors to manage assignments and students to track their growth. 
                Experience seamless integration of AI feedback and real-time performance analytics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn-premium px-8 py-4 text-lg flex items-center gap-2 group">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/login" className="btn-secondary px-8 py-4 text-lg bg-white border border-[#7AB2B2]/30 text-[#09637E] hover:bg-[#EBF4F6]">
                  View Demo
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#7AB2B2] flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                      <Image 
                        src={`https://i.pravatar.cc/100?img=${i+10}`} 
                        alt="User" 
                        width={40} 
                        height={40} 
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#1a3a44]/60">
                  <span className="font-bold text-[#1a3a44]">2,000+</span> instructors already joined
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
                <Image 
                  src="/hero.png" 
                  alt="Learning Platform Hero" 
                  width={800} 
                  height={600} 
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              {/* Floating badges highlighting AI and Analytics features */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-lg z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#1a3a44]/60">AI Feedback</p>
                    <p className="text-sm font-bold text-[#1a3a44]">Instant Analysis</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-lg z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-[#1a3a44]/60">Analytics</p>
                    <p className="text-sm font-bold text-[#1a3a44]">98% Accuracy</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Detailed breakdown of core platform features */}
        <section id="features" className="section-padding bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#09637E] uppercase tracking-widest mb-3">Core Features</h2>
              <h3 className="text-4xl font-bold text-[#1a3a44] mb-4">Everything you need to <span className="gradient-text">excel</span></h3>
              <p className="text-[#1a3a44]/60 max-w-2xl mx-auto">
                Powerful tools designed to streamline the learning process for both instructors and students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<BookOpen className="w-7 h-7 text-white" />}
                title="Assignment Hub"
                description="Create, manage, and distribute assignments with AI-powered clarity and ease."
                color="bg-[#09637E]"
              />
              <FeatureCard 
                icon={<BarChart3 className="w-7 h-7 text-white" />}
                title="Dynamic Analytics"
                description="Visualize performance trends and submission rates with real-time interactive charts."
                color="bg-[#088395]"
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-7 h-7 text-white" />}
                title="Secure Infrastructure"
                description="Role-based access control and encrypted data storage for total peace of mind."
                color="bg-[#7AB2B2]"
              />
              <FeatureCard 
                icon={<Zap className="w-7 h-7 text-white" />}
                title="Smart Feedback"
                description="Automated AI suggestions help students improve their work before submission."
                color="bg-orange-500"
              />
              <FeatureCard 
                icon={<Users className="w-7 h-7 text-white" />}
                title="Collaboration"
                description="Direct communication channels between instructors and students for better mentorship."
                color="bg-purple-600"
              />
              <FeatureCard 
                icon={<Layout className="w-7 h-7 text-white" />}
                title="Seamless UI"
                description="A beautiful, intuitive interface that feels alive and responsive on every device."
                color="bg-pink-600"
              />
            </div>
          </div>
        </section>

        {/* Step-by-step guide on how the platform functions */}
        <section id="how-it-works" className="section-padding bg-[#EBF4F6]/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold text-[#09637E] uppercase tracking-widest mb-3">How it works</h2>
                <h3 className="text-4xl font-bold text-[#1a3a44] mb-8">Simplified workflow for <span className="gradient-text">efficient growth</span></h3>
                
                <div className="space-y-8">
                  <StepItem 
                    number="01" 
                    title="Sign up and Set Roles" 
                    description="Choose your role as an instructor or student and set up your institutional profile in seconds." 
                  />
                  <StepItem 
                    number="02" 
                    title="Create or Join Assignments" 
                    description="Instructors create tasks with detailed requirements; students access them instantly on their dashboard." 
                  />
                  <StepItem 
                    number="03" 
                    title="Track and Analyze" 
                    description="Use our real-time analytics to monitor progress, identify gaps, and provide timely feedback." 
                  />
                </div>
              </div>
              <div className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#7AB2B2]/20 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="font-bold text-[#1a3a44]">Weekly Progress</h4>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {[
                      { label: 'Submissions', val: '85%', color: 'bg-[#09637E]' },
                      { label: 'Completion Rate', val: '92%', color: 'bg-[#088395]' },
                      { label: 'Student Engagement', val: '78%', color: 'bg-[#7AB2B2]' }
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#1a3a44]/70 font-medium">{item.label}</span>
                          <span className="text-[#09637E] font-bold">{item.val}</span>
                        </div>
                        <div className="w-full bg-[#EBF4F6] rounded-full h-2">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: item.val }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className={`h-2 rounded-full ${item.color}`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Soft background accents for visual depth */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7AB2B2]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#088395]/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Final call to action for user conversion */}
        <section className="section-padding px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] gradient-bg p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to transform your <br /> educational experience?</h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of instructors and students who are already using ALAP to bridge the gap in learning.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="bg-white text-[#09637E] px-10 py-4 rounded-xl text-lg font-bold hover:bg-[#EBF4F6] transition-colors shadow-lg">
                  Get Started Now
                </Link>
                <Link href="/login" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/20 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
            
            {/* Subtle background patterns for the CTA block */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="card p-8 group hover:border-[#09637E]/30 transition-all duration-300"
    >
      <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1a3a44] mb-4">{title}</h3>
      <p className="text-[#1a3a44]/60 leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-[#09637E] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#09637E]/10 flex items-center justify-center text-[#09637E] font-black">
          {number}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-[#1a3a44] mb-2">{title}</h4>
        <p className="text-[#1a3a44]/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
