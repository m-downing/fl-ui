// src/app/components/shared/ComingSoon.tsx

import Image from 'next/image';
import React from 'react';

interface ComingSoonProps {
  appName: string;
  children?: React.ReactNode;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ appName, children }) => {
  // Normalize app name for case-insensitive mapping
  const normalizedAppName = appName.toLowerCase();
  
  // Map of valid app names to ensure only correct icons are loaded
  const validApps = ['flow'];
  
  // Use the dark icon path or fall back to a default
  const iconPath = validApps.includes(normalizedAppName)
    ? `/icons/vertical-nav/${normalizedAppName}.svg`
    : '/icons/vertical-nav/flow.svg'; // Default fallback

  return (
    <div className="flex flex-col justify-center items-center h-full min-h-[calc(100vh-64px)]">
      <div 
        className="text-center"
        style={{ 
          width: '400px',
          height: '300px',
          backgroundColor: '#FCFCFC',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          src={iconPath}
          alt={`${appName} icon`}
          width={80}
          height={80}
        />
        <h2 className="text-2xl font-semibold text-[#1b1b1b] mt-4 mb-4">{appName}</h2>
        <p className="text-[#000000]">Coming soon. Stay tuned for updates.</p>
        {children}
      </div>
    </div>
  );
};

export default ComingSoon;
