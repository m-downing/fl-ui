'use client';

import React, { useState } from 'react';
import NavigationHeader        from '@/app/first-pass-yield/components/NavigationHeader';
import FirstPassYieldSummary   from '@/app/first-pass-yield/components/FirstPassYieldSummary';

export default function FirstPassYieldPage() {
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
        <FirstPassYieldSummary />
      </div>
    </div>
  );
}
