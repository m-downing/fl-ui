'use client';

import React from 'react';
import { MetricCard, BarChart, LineChart } from '@/app/components/design-system/charts';
import { DataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import Badge from '@/app/components/design-system/Badge';
import { workstationData, fpyData, throughputData, queueData, QueueChartData } from './mockData';

// Define columns for queue data table
const queueColumns: AGColumnDef<QueueChartData>[] = [
  { field: 'workstation', title: 'Workstation', width: 150 },
  { field: 'currentSize', title: 'Current Queue', width: 120 },
  { field: 'yesterdaySize', title: 'Yesterday', width: 120 },
  {
    field: 'change',
    title: 'Change',
    width: 120,
    cellRenderer: (row) => {
      const isPositive = row.change > 0;
      const colorClass = isPositive ? 'text-error-600' : 'text-success-600';
      return (
        <div className={`flex items-center ${colorClass}`}>
          {isPositive ? '+' : ''}{row.change}
          <span className="ml-1">{isPositive ? '↑' : '↓'}</span>
        </div>
      );
    }
  },
  {
    field: 'status',
    title: 'Status',
    width: 120,
    cellRenderer: (row) => {
      // Map status to badge variants and labels
      const statusConfig = {
        success: { variant: 'delivered' as const, label: 'On Track' },
        warning: { variant: 'atRisk' as const, label: 'At Risk' },
        error: { variant: 'delayed' as const, label: 'Delayed' },
        neutral: { variant: 'standard' as const, label: 'Normal' },
        primary: { variant: 'active' as const, label: 'Active' }
      };
      
      const config = statusConfig[row.status] || statusConfig.neutral;
      return <Badge variant={config.variant} size="small">{config.label}</Badge>;
    }
  }
];

export default function FirstPassYieldSummary() {
  return (
    <>
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Overall First Pass Yield" value="92.1%" delta={1.5} trend="up" status="success" />
        <MetricCard label="Workstation Timeliness" value="85.3%" delta={-2.1} trend="down" status="warning" />
        <MetricCard label="Daily Throughput" value="28 units/day" delta={3} trend="up" status="success" />
        <MetricCard label="Total Queue Size" value="65 racks" delta={-5} trend="down" status="success" />
      </div>

      {/* Summary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <h6 className="text-lg font-medium text-neutral-800 mb-2">Timeliness by Workstation</h6>
          <p className="text-sm text-neutral-500 mb-4">Percentage of racks processed on time vs delayed by workstation</p>
          <div className="h-80">
            <BarChart data={workstationData} dataKey={[ 'timely', 'delayed', 'critical' ]} xAxisKey="name" height={320} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <h6 className="text-lg font-medium text-neutral-800 mb-2">First Pass Yield Metrics</h6>
          <p className="text-sm text-neutral-500 mb-4">Quality metrics per workstation (higher is better)</p>
          <div className="h-80">
            <BarChart data={fpyData} dataKey={[ 'passingRate' ]} xAxisKey="name" height={320} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <h6 className="text-lg font-medium text-neutral-800 mb-2">Throughput Trend</h6>
          <p className="text-sm text-neutral-500 mb-4">Units per day and cumulative units over time</p>
          <div className="h-80">
            <LineChart data={throughputData} dataKey={[ 'unitsPerDay', 'cumulativeUnits' ]} xAxisKey="name" height={320} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <h6 className="text-lg font-medium text-neutral-800 mb-2">Queue Size by Workstation</h6>
          <p className="text-sm text-neutral-500 mb-4">Current queue size and change from yesterday</p>
          <div className="h-80">
            <DataTable columns={queueColumns} data={queueData} mode="summary" maxRows={5} />
          </div>
        </div>
      </div>
    </>
  );
} 