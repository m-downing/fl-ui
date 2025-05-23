import React from 'react';
import { MetricCard } from '../charts/MetricCard';

const MetricCardExample: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Metric Card Examples</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Basic Status Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            label="Total Rack Capacity" 
            value="1,230" 
            status="success" 
          />
          <MetricCard 
            label="Supply Chain Issues" 
            value="7" 
            status="error" 
          />
          <MetricCard 
            label="Pending Approvals" 
            value="12" 
            status="warning" 
          />
          <MetricCard 
            label="Total Data Centers" 
            value="42" 
            status="neutral" 
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">With Delta Values (Trends)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            label="Infrastructure Utilization" 
            value="74.8%" 
            delta={3.2} 
            trend="up"
            status="success" 
          />
          <MetricCard 
            label="Active Incidents" 
            value="5" 
            delta={2} 
            trend="up"
            status="error" 
          />
          <MetricCard 
            label="Deployment Backlog" 
            value="18" 
            delta={5} 
            trend="down"
            status="success" 
          />
          <MetricCard 
            label="Remaining Budget" 
            value="$1.2M" 
            delta={8} 
            trend="down"
            status="error" 
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage in Application</h3>
        <div className="bg-neutral-50 p-4 rounded-md">
          <pre className="text-sm">
{`// Basic metric card
<MetricCard 
  label="Total Global Rack Capacity" 
  value="1,230 Racks" 
  status="success" 
/>

// With delta (trend)
<MetricCard 
  label="Infrastructure Utilization" 
  value="74.8%" 
  delta={1.5} 
  trend="up"
  status="neutral" 
/>

// With click handler
<MetricCard 
  label="Active Alerts" 
  value="3" 
  status="warning"
  onClick={() => navigate('/alerts')} 
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default MetricCardExample; 