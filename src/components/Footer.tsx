import Link from 'next/link';
import { GraduationCap, Globe, Briefcase, Code, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3a44] text-white/80 pt-20 pb-10 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main footer navigation grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand information and social links */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-[#088395] p-2 rounded-xl">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ALAP</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed">
              Bridge the gap between instruction and evaluation. The ultimate platform for smart learning management and real-time analytics.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Globe className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<MessageCircle className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Briefcase className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Code className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Platform related links */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#features">Features</FooterLink></li>
              <li><FooterLink href="#how-it-works">How it Works</FooterLink></li>
              <li><FooterLink href="/login">Instructor Portal</FooterLink></li>
              <li><FooterLink href="/login">Student Portal</FooterLink></li>
            </ul>
          </div>

          {/* Company and legal links */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#">About Us</FooterLink></li>
              <li><FooterLink href="#">Careers</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
            </ul>
          </div>

          {/* Help and documentation links */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#">Help Center</FooterLink></li>
              <li><FooterLink href="#">Contact Support</FooterLink></li>
              <li><FooterLink href="#">Community</FooterLink></li>
              <li><FooterLink href="#">Documentation</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Copyright and secondary legal links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} ALAP Platform. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      className="bg-white/5 hover:bg-[#088395] p-2.5 rounded-full transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
      {children}
    </Link>
  );
}
