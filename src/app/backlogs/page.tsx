'use client';

import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { 
  BacklogSummaryMetrics, 
  BacklogFilters, 
  BacklogTabs, 
  backlogItems 
} from './components';

const BacklogsPage: React.FC = () => {
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterTimeRange, setFilterTimeRange] = useState('select');
  
  const handleRegionFilterChange = (value: string) => {
    setFilterRegion(value);
  };
  
  const handlePriorityFilterChange = (value: string) => {
    setFilterPriority(value);
  };

  const handleTimeRangeFilterChange = (value: string) => {
    setFilterTimeRange(value);
  };
  
  // Calculate summary metrics
  const totalBacklogs = backlogItems.length;
  const criticalBacklogs = backlogItems.filter(item => item.priority === 'critical').length;
  const blockedBacklogs = backlogItems.filter(item => item.status === 'blocked').length;
  const avgDelay = Math.round(backlogItems.reduce((sum, item) => sum + item.delay, 0) / totalBacklogs);
  
  return (
    <div className="pt-14 px-6 max-w-[1600px] mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h4" className="font-semibold text-neutral-800">
              Supply Chain Backlogs
            </Typography>
            <Typography variant="body2" className="text-neutral-600">
              Monitor and manage infrastructure equipment backlogs across global data centers
            </Typography>
          </div>
          <BacklogFilters
            filterRegion={filterRegion}
            filterPriority={filterPriority}
            filterTimeRange={filterTimeRange}
            onRegionChange={handleRegionFilterChange}
            onPriorityChange={handlePriorityFilterChange}
            onTimeRangeChange={handleTimeRangeFilterChange}
          />
        </div>
        
        <BacklogSummaryMetrics
          totalBacklogs={totalBacklogs}
          criticalBacklogs={criticalBacklogs}
          blockedBacklogs={blockedBacklogs}
          avgDelay={avgDelay}
        />
        
        <BacklogTabs backlogItems={backlogItems} />
      </div>
    </div>
  );
};

export default BacklogsPage;
