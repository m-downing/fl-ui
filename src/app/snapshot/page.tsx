'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MainLoadingSpinner from '../layout/mainLoadingSpinner';

const FlowUIPage = dynamic(() => import('../flow/page'), {
  ssr: false,
});

export default function SnapshotPage() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set the current app to FLOW
    localStorage.setItem('currentApp', 'FLOW');
    
    // Set the active tab to Snapshot for flow
    localStorage.setItem('activeTab_flux', 'Snapshot');
    
    // Dispatch an app change event
    const event = new Event('app:change');
    window.dispatchEvent(event);
    
    // Brief delay for setting up
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <MainLoadingSpinner />;
  }

  return <FlowUIPage />;
} 