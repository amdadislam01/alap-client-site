'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

/* Compact header for mobile devices providing branding and menu access */
export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-[#7AB2B2]/20 sticky top-0 z-40 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-8 h-8 overflow-hidden">
          <Image 
            src="/logo.png" 
            alt="ALAP Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg font-black text-[#09637E] leading-tight tracking-tighter">ALAP</h1>
        </div>
      </Link>

      <button 
        onClick={onMenuClick}
        className="p-2 text-[#09637E] hover:bg-[#EBF4F6] rounded-xl transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
