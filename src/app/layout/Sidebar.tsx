'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { appTabs } from './constants';
import { ChartBarSquareIcon, ServerStackIcon, BriefcaseIcon, CloudIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>('Snapshot');

  useEffect(() => {
    // Get the active tab from localStorage when the component mounts
    const savedTab = localStorage.getItem('activeTab_flux');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem('activeTab_flux', tabName);
    
    // Dispatch event to notify other components of the tab change
    window.dispatchEvent(new Event('app:change'));
  };

  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    if (iconName === 'ChartBarSquare') {
      return <ChartBarSquareIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'ServerStack') {
      return <ServerStackIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'Briefcase') {
      return <BriefcaseIcon className="w-6 h-6 text-neutral-50" />;
    } else if (iconName === 'Cloud') {
      return <CloudIcon className="w-6 h-6 text-neutral-50" />;
    } else {
      return (
        <Image 
          src={iconName}
          alt={`icon`}
          width={24}
          height={24}
          className="mb-2"
        />
      );
    }
  };

  return (
    <aside className="sticky top-0 h-screen flex flex-col bg-primary-800/90 w-[100px] font-heading">
      {/* Top section - always clickable, links to home */}
      <Link
        href="/"
        className="group h-[120px] flex flex-col items-center justify-center pt-2 cursor-pointer transition-colors duration-50 bg-primary-800/90 w-full"
        role="button"
        aria-label="Go to Home"
        tabIndex={0}
      >
        <div className="flex flex-col items-center gap-[5px]">
          <Image 
            src="/icons/vertical-nav/flow.svg"
            alt="FLOW Logo"
            width={26}
            height={26}
            className="mb-2 group-hover:opacity-60 transition-opacity duration-50"
          />
          <h1 className="text-neutral-50 group-hover:text-neutral-50/[.6] text-[14px] tracking-wider font-body transition-colors duration-50">FLOW</h1>
        </div>
      </Link>

      {/* Middle section - navigation tabs */}
      <div className="flex-1 flex flex-col items-center py-8 gap-8 bg-primary-800/90">
        {appTabs['flow'].map((tab) => (
          <div 
            key={tab.name}
            className={`flex flex-col items-center cursor-pointer group ${activeTab === tab.name ? 'opacity-100' : 'opacity-50'} hover:opacity-100 transition-opacity duration-200`}
            onClick={() => handleTabClick(tab.name)}
            role="button"
            tabIndex={0}
            aria-label={`Go to ${tab.name}`}
          >
            <div className="mb-2">
              {renderIcon(tab.icon)}
            </div>
            <span className="text-neutral-50 text-[11px] tracking-wider">{tab.name}</span>
          </div>
        ))}
      </div>
      
      {/* Bottom section - matches the styling of other sections */}
      <div className="h-[80px] bg-primary-800/90 w-full" />
    </aside>
  );
}
