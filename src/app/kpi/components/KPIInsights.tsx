import React from 'react';

export const KPIInsights: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h6 className="font-medium">KPI Insights</h6>
        <button className="text-primary-500">
          View All Insights
        </button>
      </div>
      <div className="space-y-4">
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="text-success-700">Procurement Efficiency Improvement</p>
          <p className="text-neutral-600">
            Procurement efficiency has increased by 6% over the last quarter, exceeding the target by 3%. 
            This is attributed to the implementation of the new automated vendor management system.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="text-success-700">Deployment Time Reduction</p>
          <p className="text-neutral-600">
            Average deployment time has decreased from 18 days to 13 days over the past 6 months, 
            meeting the SLA target of 15 days. Streamlined customs clearance processes have contributed to this improvement.
          </p>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="text-warning-700">Cost Management Alert</p>
          <p className="text-neutral-600">
            APAC region is showing higher-than-expected shipping costs, currently 12% above budget. 
            Recommend reviewing logistics contracts and exploring alternative shipping routes.
          </p>
        </div>
      </div>
    </div>
  );
}; 