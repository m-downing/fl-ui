'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import MainLoadingSpinner from './mainLoadingSpinner';
import Link from 'next/link';

interface AppWrapperProps {
  children: React.ReactNode;
}

// Map of app names to their corresponding browser tab titles
const APP_TITLES: Record<string, string> = {
  'FLOW': 'FLOW',
};

// Map of app names to their corresponding favicon paths
const APP_FAVICONS: Record<string, string> = {
  'FLOW': '/icons/favicons/favicon.ico',
};

const DEFAULT_FAVICON = '/icons/favicons/favicon.ico';

const updateFavicon = (iconPath: string) => {
  const linkElements = document.querySelectorAll("link[rel*='icon']");
  if (linkElements.length > 0) {
    linkElements.forEach(link => {
      link.setAttribute('href', iconPath);
    });
  } else {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = iconPath;
    document.head.appendChild(link);
  }
};

export default function AppWrapper({ children }: AppWrapperProps) {
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.title = APP_TITLES['FLOW'] || 'FLOW | UI Demo';
    updateFavicon(APP_FAVICONS['FLOW'] || DEFAULT_FAVICON);
  }, []);

  useEffect(() => {
    if (!pathname.includes('/dashboard')) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown-menu]') && !target.closest('[data-user-menu-button]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-[100px_1fr] min-h-screen min-w-[768px] relative">
      {/* User menu button - replacing Reset button */}
      <div className="z-50 fixed top-5 right-5 flex flex-col items-center">
        <div 
          className="w-[36px] h-[36px] rounded-full bg-primary-700 flex items-center justify-center cursor-pointer hover:bg-primary-800 transition-all duration-50 shadow-md relative"
          role="button"
          aria-label="User menu"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          tabIndex={0}
          onClick={toggleMenu}
          data-user-menu-button
        >
          <span className="text-neutral-50 text-[12px] font-semibold">MD</span>
        </div>
        
        {/* Dropdown menu */}
        {isMenuOpen && (
          <div 
            className="absolute top-full right-0 mt-2 w-48 bg-neutral-100 rounded-md shadow-lg py-1 z-50"
            data-dropdown-menu
          >
            <Link 
              href="/design-system-demo" 
              className="block px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Design System Demo
            </Link>
            <Link 
              href="/design-system-demo/read-me" 
              className="block px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Design System README
            </Link>
          </div>
        )}
      </div>
      
      <Sidebar />
      <main className="overflow-y-auto min-h-screen bg-[#FCFCFC] relative">
        {(loading) && <MainLoadingSpinner />}
        {!loading && children}
      </main>
    </div>
  );
}
