'use client';

import React, { useState } from 'react';
import NavigationHeader        from '@/app/first-pass-yield/components/NavigationHeader';
import FirstPassYieldSummary   from '@/app/first-pass-yield/components/FirstPassYieldSummary';
import FirstPassYieldDrilldown from '@/app/first-pass-yield/components/FirstPassYieldDrilldown';
import FirstPassYieldDeepDive  from '@/app/first-pass-yield/components/FirstPassYieldDeepDive';

export default function FirstPassYieldPage() {
  const [viewMode, setViewMode] = useState<'summary' | 'drilldown' | 'deepDive'>('summary');
  const [timeRange, setTimeRange] = useState('select');
  const [region, setRegion] = useState('all');
  const [priority, setPriority] = useState('all');

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  return (
    <div className="pt-14 px-6 max-w-[1600px] mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <NavigationHeader 
            timeRange={timeRange}
            region={region}
            priority={priority}
            onTimeRangeChange={handleTimeRangeChange}
            onRegionChange={handleRegionChange}
            onPriorityChange={handlePriorityChange}
          />
        </div>
        {viewMode === 'summary' && <FirstPassYieldSummary />}
        {viewMode === 'drilldown' && <FirstPassYieldDrilldown />}
        {viewMode === 'deepDive' && <FirstPassYieldDeepDive />}
      </div>
    </div>
  );
}
