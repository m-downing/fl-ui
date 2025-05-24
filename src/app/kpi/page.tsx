'use client';

import React, { useState } from 'react';
import FilterBar from '@/app/components/design-system/FilterBar';
import { 
  KPISummaryMetrics, 
  KPITabs, 
  KPIInsights 
} from './components';

const KPIPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
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
  
  const handleMoreFiltersClick = () => {
    // Implementation for more filters can be added here
    console.log('More filters clicked');
  };
  
  return (
    <div className="pt-14 px-6 max-w-[1600px] mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-2xl font-semibold text-neutral-800">
              Key Performance Indicators
            </h4>
            <p className="text-sm text-neutral-600">
              Monitor and analyze data center supply chain performance metrics
            </p>
          </div>
          <FilterBar
            timeRange={timeRange}
            region={region}
            priority={priority}
            onTimeRangeChange={handleTimeRangeChange}
            onRegionChange={handleRegionChange}
            onPriorityChange={handlePriorityChange}
            onMoreFiltersClick={handleMoreFiltersClick}
          />
        </div>
        
        <KPISummaryMetrics />
        
        <KPITabs />
        
        <KPIInsights />
      </div>
    </div>
  );
};

export default KPIPage; 