'use client';

import React from 'react';
import { 
  Typography, 
  Button, 
  Chip
} from '@mui/material';
import { 
  NetworkSummaryMetrics,
  NetworkIncidents, 
  NetworkUtilization,
  NetworkEquipmentDistribution,
  NetworkLatencyScatter,
  NetworkCriticalPaths,
  NetworkComponentsTable
} from './components';

const NetworkPage: React.FC = () => {
  return (
    <div className="pt-14 px-6 max-w-[1600px] mx-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h4" className="font-semibold text-neutral-800">
              Network Infrastructure Monitoring
            </Typography>
            <Typography variant="body2" className="text-neutral-600">
              Real-time monitoring of global data center network connectivity and equipment
            </Typography>
          </div>
          <div className="flex items-center space-x-3">
            <Chip 
              label="Last updated: Just now" 
              size="small" 
              className="bg-neutral-100"
            />
            <Button 
              variant="contained" 
              color="primary" 
              className="bg-primary-600"
            >
              View Topology Map
            </Button>
          </div>
        </div>
        
        <NetworkSummaryMetrics />
        
        <NetworkIncidents />
        
        {/* Network Utilization and Equipment Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-8">
            <NetworkUtilization />
          </div>
          <div className="md:col-span-4">
            <NetworkEquipmentDistribution />
          </div>
        </div>
        
        {/* Datacenter Interconnect Latency and Network Critical Paths */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-6">
            <NetworkLatencyScatter />
          </div>
          <div className="md:col-span-6">
            <NetworkCriticalPaths />
          </div>
        </div>
        
        <NetworkComponentsTable />
      </div>
    </div>
  );
};

export default NetworkPage; 