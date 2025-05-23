'use client';

import React from 'react';
import ComingSoon from './shared/ComingSoon';
import { usePathname } from 'next/navigation';

interface PageWrapperProps {
  children: React.ReactNode;
  activeTab: string | null;
  currentApp: string;
}

export default function PageWrapper({ children, activeTab, currentApp }: PageWrapperProps) {
  const pathname = usePathname();
  const appId = currentApp?.toLowerCase();

  // If we're on the root path and an app is selected, show the appropriate app content
  if (pathname === '/' && activeTab !== null) {
    // For FLOW, use the children content
    if (appId === 'flow') {
      return <>{children}</>;
    }
    // Show coming soon for any other app that isn't FLOW
    else if (currentApp !== 'FLOW') {
      return <ComingSoon appName={currentApp} />;
    }
  }

  // For FLOW or when no app/tab is selected, show the default content
  return <>{children}</>;
} 