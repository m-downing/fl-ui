'use client';

import { useEffect, useState } from 'react';
import DashboardView from './dashboard/DashboardView';
import BacklogsView from './backlogs/BacklogsView';
import KPIsView from './kpi/KPIsView';
import NetworkView from './network/NetworkView';
import MainLoadingSpinner from '../layout/mainLoadingSpinner';

export default function FlowUIPage() {
  const [activeTab, setActiveTab] = useState<string>('Snapshot');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading when component mounts
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading spinner for 2 seconds

    // Get the active tab from localStorage when the component mounts
    const savedTab = localStorage.getItem('activeTab_flux');
    if (savedTab) {
      setActiveTab(savedTab);
    }

    // Listen for app change events
    const handleAppChange = () => {
      const currentTab = localStorage.getItem('activeTab_flux');
      if (currentTab && currentTab !== activeTab) {
        setActiveTab(currentTab);
        // Show loading spinner when tab changes
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500); // Slightly shorter loading time for tab changes
      }
    };

    window.addEventListener('app:change', handleAppChange);

    return () => {
      window.removeEventListener('app:change', handleAppChange);
      clearTimeout(timer);
    };
  }, [activeTab]);

  // Show loading spinner first
  if (isLoading) {
    return <MainLoadingSpinner />;
  }

  // Then render the appropriate component based on the active tab with proper spacing
  return (
    <div className="pt-14 px-6 max-w-[1600px] mx-auto">
      {activeTab === 'Snapshot' && <DashboardView />}
      {activeTab === 'Backlogs' && <BacklogsView key="backlogs" />}
      {activeTab === 'KPI\'s' && <KPIsView />}
      {activeTab === 'Network' && <NetworkView />}
    </div>
  );
} 