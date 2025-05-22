'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MainLoadingSpinner from './layout/mainLoadingSpinner';

const FlowUIPage = dynamic(() => import('./flow/page'), {
  ssr: false,
});

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // If we're coming directly to the root, set up the Flow UI context
    if (typeof window !== 'undefined' && !initialized && window.location.pathname === '/') {
      // Set the current app to FLOW
      localStorage.setItem('currentApp', 'FLOW');
      
      // Set the active tab to Snapshot for flow
      localStorage.setItem('activeTab_flux', 'Snapshot');
      
      // Dispatch an app change event
      const event = new Event('app:change');
      window.dispatchEvent(event);
      
      setInitialized(true);
      
      // Hide loading spinner after a brief delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [initialized]);

  if (isLoading) {
    return <MainLoadingSpinner />;
  }

  return <FlowUIPage />;
}