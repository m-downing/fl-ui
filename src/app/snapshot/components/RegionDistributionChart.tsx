import React from 'react';
import { BarChart } from '@/app/components/design-system/charts';

// Mock data for region capacity
const regionCapacityData = [
  { name: 'NAM', Compute: 420, Storage: 280, Network: 120 },
  { name: 'EMEA', Compute: 380, Storage: 240, Network: 110 },
  { name: 'APAC', Compute: 320, Storage: 210, Network: 90 },
  { name: 'LATAM', Compute: 150, Storage: 120, Network: 50 },
];

const RegionDistributionChart: React.FC = () => {
  return (
    <div className="md:col-span-8">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h6 className="text-lg font-medium text-neutral-800">Infrastructure Distribution by Region</h6>
        </div>
        <p className="text-sm text-neutral-500 mb-4">
          Current rack allocation across global regions
        </p>
        <div className="h-80">
          <BarChart 
            data={regionCapacityData} 
            dataKey={['Compute', 'Storage', 'Network']} 
            xAxisKey="name" 
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default RegionDistributionChart; 