'use client';

import React, { useState, useMemo } from 'react';
import { Card, Badge } from '../../components/design-system';
import { 
  LineChart, 
  BarChart,
  MetricCard, 
  ProgressTracker 
} from '@/app/components/design-system/charts';
import { DataTable, AGColumnDef } from '@/app/components/design-system/DataTable';

// Interface to match chart data requirements
interface ChartDataObject {
  name: string;
  [key: string]: string | number | undefined;
}

// Workstation data types
interface WorkstationData extends ChartDataObject {
  timely: number;
  delayed: number;
  critical: number;
}

interface FPYData extends ChartDataObject {
  passingRate: number;
  republishEvents: number;
  additionalRequests: number;
}

interface ThroughputData extends ChartDataObject {
  unitsPerDay: number;
  cumulativeUnits: number;
}

interface QueueChartData extends ChartDataObject {
  workstation: string;
  currentSize: number;
  yesterdaySize: number;
  change: number;
  status: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
}

interface RackData {
  id: string;
  name: string;
  station: string;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Complete';
  passingRate: number;
  needByDate: string;
  startDate: string;
  republishEvents: number;
  additionalRequests: number;
  notes: string;
}

// Mock data for workstation timeliness
const workstationData: WorkstationData[] = [
  { name: 'Assembly', timely: 85, delayed: 12, critical: 3 },
  { name: 'Config', timely: 78, delayed: 18, critical: 4 },
  { name: 'Test', timely: 92, delayed: 6, critical: 2 },
  { name: 'QA', timely: 88, delayed: 9, critical: 3 },
  { name: 'Deploy', timely: 82, delayed: 15, critical: 3 },
];

// Mock data for FPY metrics
const fpyData: FPYData[] = [
  { name: 'Assembly', passingRate: 92, republishEvents: 5, additionalRequests: 3 },
  { name: 'Config', passingRate: 88, republishEvents: 7, additionalRequests: 5 },
  { name: 'Test', passingRate: 95, republishEvents: 3, additionalRequests: 2 },
  { name: 'QA', passingRate: 96, republishEvents: 2, additionalRequests: 2 },
  { name: 'Deploy', passingRate: 90, republishEvents: 6, additionalRequests: 4 },
];

// Mock data for throughput
const throughputData: ThroughputData[] = [
  { name: 'Week 1', unitsPerDay: 18, cumulativeUnits: 18 },
  { name: 'Week 2', unitsPerDay: 22, cumulativeUnits: 40 },
  { name: 'Week 3', unitsPerDay: 25, cumulativeUnits: 65 },
  { name: 'Week 4', unitsPerDay: 20, cumulativeUnits: 85 },
  { name: 'Week 5', unitsPerDay: 28, cumulativeUnits: 113 },
  { name: 'Week 6', unitsPerDay: 32, cumulativeUnits: 145 },
];

// Mock data for queue size (with added name field for charts)
const queueData: QueueChartData[] = [
  { name: 'Assembly', workstation: 'Assembly', currentSize: 12, yesterdaySize: 15, change: -3, status: 'success' },
  { name: 'Config', workstation: 'Config', currentSize: 18, yesterdaySize: 14, change: 4, status: 'warning' },
  { name: 'Test', workstation: 'Test', currentSize: 8, yesterdaySize: 7, change: 1, status: 'neutral' },
  { name: 'QA', workstation: 'QA', currentSize: 5, yesterdaySize: 9, change: -4, status: 'success' },
  { name: 'Deploy', workstation: 'Deploy', currentSize: 22, yesterdaySize: 16, change: 6, status: 'error' },
];

// Generate rack data
const generateRackData = (): RackData[] => {
  const statuses: RackData['status'][] = ['On Track', 'At Risk', 'Delayed', 'Complete'];
  
  return Array.from({ length: 30 }, (_, i) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - (Math.floor(Math.random() * 30) + 1));
    
    const needByDate = new Date();
    needByDate.setDate(today.getDate() + (Math.floor(Math.random() * 21) + 5));
    
    const statusIndex = Math.floor(Math.random() * 4);
    const passingRate = 75 + Math.floor(Math.random() * 25);
    
    return {
      id: `RACK-${1000 + i}`,
      name: `Rack ${1000 + i}`,
      station: workstationData[i % workstationData.length].name,
      status: statuses[statusIndex],
      passingRate: passingRate,
      needByDate: needByDate.toISOString().split('T')[0],
      startDate: startDate.toISOString().split('T')[0],
      republishEvents: Math.floor(Math.random() * 8),
      additionalRequests: Math.floor(Math.random() * 10),
      notes: statusIndex === 1 || statusIndex === 2 ? `Issues with ${i % 2 === 0 ? 'components' : 'cabling'}` : '',
    };
  });
};

const rackData = generateRackData();

export default function FirstPassYieldView() {
  const [viewMode, setViewMode] = useState<'summary' | 'drilldown' | 'deepDive'>('summary');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTab, setSelectedTab] = useState('timeliness');

  // Queue table columns
  const queueColumns = useMemo((): AGColumnDef<QueueChartData>[] => [
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
        return <ProgressTracker value={Math.min(100, (row.currentSize / 20) * 100)} mode="summary" status={row.status} />;
      }
    }
  ], []);

  // Rack data table columns
  const rackColumns = useMemo((): AGColumnDef<RackData>[] => [
    { field: 'id', title: 'ID', width: 100 },
    { field: 'name', title: 'Rack Name', width: 120 },
    { field: 'station', title: 'Station', width: 120 },
    {
      field: 'status',
      title: 'Status',
      width: 120,
      cellRenderer: (row) => {
        let variant: 'active' | 'atRisk' | 'delayed' | 'standard' = 'standard';
        if (row.status === 'On Track') variant = 'active';
        else if (row.status === 'At Risk') variant = 'atRisk';
        else if (row.status === 'Delayed') variant = 'delayed';
        
        return <Badge variant={variant} size="small">{row.status}</Badge>;
      }
    },
    { field: 'passingRate', title: 'Pass Rate', width: 100, cellRenderer: (row) => `${row.passingRate}%` },
    { field: 'needByDate', title: 'Need By Date', width: 120 },
    { field: 'republishEvents', title: 'Republish Events', width: 140 },
    { field: 'additionalRequests', title: 'Additional Requests', width: 160 },
    { field: 'notes', title: 'Notes', width: 200 },
  ], []);

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800">
            First Pass Yield
          </h4>
          <p className="text-sm text-neutral-600">
            Quality metrics of rack builds over time, measuring workstation performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            className="text-sm border border-neutral-300 rounded px-2 py-1"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <div className="flex border border-neutral-300 rounded-md overflow-hidden">
            {['summary', 'drilldown', 'deepDive'].map((mode) => (
              <button
                key={mode}
                className={`px-3 py-1 text-xs font-medium ${viewMode === mode 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'}`}
                onClick={() => setViewMode(mode as 'summary' | 'drilldown' | 'deepDive')}
              >
                {mode === 'deepDive' ? 'Deep Dive' : mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {viewMode === 'summary' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Key metrics section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard 
              label="Overall First Pass Yield" 
              value="92.1%" 
              delta={1.5} 
              trend="up"
              status="success" 
            />
            <MetricCard 
              label="Workstation Timeliness" 
              value="85.3%" 
              delta={-2.1} 
              trend="down"
              status="warning" 
            />
            <MetricCard 
              label="Daily Throughput" 
              value="28 units/day" 
              delta={3} 
              trend="up"
              status="success" 
            />
            <MetricCard 
              label="Total Queue Size" 
              value="65 racks" 
              delta={-5} 
              trend="down"
              status="success" 
            />
          </div>
          
          {/* Charts section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">Timeliness by Workstation</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Percentage of racks processed on time vs delayed by workstation
              </p>
              <div className="h-80">
                <BarChart 
                  data={workstationData} 
                  dataKey={['timely', 'delayed', 'critical']} 
                  xAxisKey="name" 
                  height={320}
                />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">First Pass Yield Metrics</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Quality metrics per workstation (higher is better)
              </p>
              <div className="h-80">
                <BarChart 
                  data={fpyData} 
                  dataKey={['passingRate']} 
                  xAxisKey="name" 
                  height={320}
                />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">Throughput Trend</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Units per day and cumulative units over time
              </p>
              <div className="h-80">
                <LineChart 
                  data={throughputData} 
                  dataKey={['unitsPerDay', 'cumulativeUnits']} 
                  xAxisKey="name" 
                  height={320}
                />
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">Queue Size by Workstation</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Current queue size and change from yesterday
              </p>
              <div className="h-80">
                <DataTable 
                  columns={queueColumns} 
                  data={queueData} 
                  mode="summary"
                  maxRows={5}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {viewMode === 'drilldown' && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-4">
            <div className="border-b border-neutral-200 mb-4">
              <div className="flex space-x-4">
                {['timeliness', 'firstPassYield', 'throughput', 'queueSize'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium border-b-2 ${
                      selectedTab === tab 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedTab === 'timeliness' && (
              <div>
                <h6 className="text-lg font-medium text-neutral-800 mb-4">Timeliness Analysis</h6>
                <p className="text-sm text-neutral-600 mb-6">
                  Detailed breakdown of timeliness metrics by workstation based on need-by date
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  {workstationData.map((station) => (
                    <Card key={station.name} className="p-3">
                      <h6 className="text-sm font-semibold mb-2">{station.name}</h6>
                      <ProgressTracker 
                        value={station.timely} 
                        label={`${station.timely}% On Time`} 
                        status={station.timely > 90 ? 'success' : station.timely > 80 ? 'primary' : 'warning'} 
                        mode="drilldown" 
                      />
                      <div className="mt-2 text-xs text-neutral-500">
                        <div className="flex justify-between">
                          <span>Delayed:</span>
                          <span className="text-warning-600 font-medium">{station.delayed}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Critical:</span>
                          <span className="text-error-600 font-medium">{station.critical}%</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="h-96">
                  <DataTable 
                    columns={rackColumns.filter(col => ['id', 'name', 'station', 'status', 'needByDate', 'notes'].includes(col.field))} 
                    data={rackData} 
                    mode="drilldown"
                    maxRows={10}
                  />
                </div>
              </div>
            )}
            
            {selectedTab === 'firstPassYield' && (
              <div>
                <h6 className="text-lg font-medium text-neutral-800 mb-4">First Pass Yield Analysis</h6>
                <p className="text-sm text-neutral-600 mb-6">
                  Detailed metrics on quality including republishing events and additional requests
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h6 className="text-md font-medium mb-3">Event Republishing Rate</h6>
                    <div className="h-80">
                      <BarChart 
                        data={fpyData} 
                        dataKey={['republishEvents']} 
                        xAxisKey="name" 
                        height={320}
                      />
                    </div>
                  </div>
                  <div>
                    <h6 className="text-md font-medium mb-3">Additional Requests Rate</h6>
                    <div className="h-80">
                      <BarChart 
                        data={fpyData} 
                        dataKey={['additionalRequests']} 
                        xAxisKey="name" 
                        height={320}
                      />
                    </div>
                  </div>
                </div>
                <div className="h-96">
                  <DataTable 
                    columns={rackColumns.filter(col => ['id', 'name', 'station', 'passingRate', 'republishEvents', 'additionalRequests', 'notes'].includes(col.field))} 
                    data={rackData.sort((a, b) => a.passingRate - b.passingRate)} 
                    mode="drilldown"
                    maxRows={10}
                  />
                </div>
              </div>
            )}
            
            {selectedTab === 'throughput' && (
              <div>
                <h6 className="text-lg font-medium text-neutral-800 mb-4">Throughput Analysis</h6>
                <p className="text-sm text-neutral-600 mb-6">
                  Analysis of units processed per day and cumulative throughput
                </p>
                <div className="h-80 mb-6">
                  <LineChart 
                    data={throughputData} 
                    dataKey={['unitsPerDay', 'cumulativeUnits']} 
                    xAxisKey="name" 
                    height={320}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  {workstationData.map((station, index) => (
                    <Card key={station.name} className="p-3">
                      <h6 className="text-sm font-semibold mb-2">{station.name}</h6>
                      <div className="text-2xl font-bold text-neutral-800 mb-1">
                        {5 + index * 2} <span className="text-sm font-normal">units/day</span>
                      </div>
                      <div className="text-xs text-neutral-600">
                        <span className={index % 2 === 0 ? "text-success-600" : "text-error-600"}>
                          {index % 2 === 0 ? "↑" : "↓"} {index + 1}% vs last week
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTab === 'queueSize' && (
              <div>
                <h6 className="text-lg font-medium text-neutral-800 mb-4">Queue Size Analysis</h6>
                <p className="text-sm text-neutral-600 mb-6">
                  Current queue size by workstation and historical trends
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h6 className="text-md font-medium mb-3">Current Queue Size</h6>
                    <div className="h-80">
                      <BarChart 
                        data={queueData} 
                        dataKey={['currentSize']} 
                        xAxisKey="name" 
                        height={320}
                      />
                    </div>
                  </div>
                  <div>
                    <h6 className="text-md font-medium mb-3">Queue Size Change (vs Yesterday)</h6>
                    <div className="h-80">
                      <BarChart 
                        data={queueData.map(q => ({ 
                          name: q.name,
                          change: q.change
                        }))} 
                        dataKey={['change']} 
                        xAxisKey="name" 
                        height={320}
                      />
                    </div>
                  </div>
                </div>
                <div className="h-96">
                  <DataTable 
                    columns={queueColumns} 
                    data={queueData} 
                    mode="drilldown"
                    maxRows={10}
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
      
      {viewMode === 'deepDive' && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h6 className="text-lg font-medium text-neutral-800">Deep Dive Analysis</h6>
              <div className="flex space-x-2">
                <button className="text-sm px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Export Data
                </button>
                <button className="text-sm px-3 py-1 border border-neutral-300 rounded-md hover:bg-neutral-50">
                  Print Report
                </button>
              </div>
            </div>
            <p className="text-sm text-neutral-600 mb-6">
              Comprehensive analysis of all rack build data with advanced filtering
            </p>
            <div className="mb-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="bg-neutral-100 rounded-md px-3 py-1.5 text-sm flex items-center">
                  <span className="font-medium mr-1.5">Station:</span> All
                  <button className="ml-2 text-neutral-500 hover:text-neutral-700">×</button>
                </div>
                <div className="bg-neutral-100 rounded-md px-3 py-1.5 text-sm flex items-center">
                  <span className="font-medium mr-1.5">Status:</span> All
                  <button className="ml-2 text-neutral-500 hover:text-neutral-700">×</button>
                </div>
                <div className="bg-neutral-100 rounded-md px-3 py-1.5 text-sm flex items-center">
                  <span className="font-medium mr-1.5">Pass Rate:</span> &gt; 80%
                  <button className="ml-2 text-neutral-500 hover:text-neutral-700">×</button>
                </div>
                <button className="bg-neutral-100 rounded-md px-3 py-1.5 text-sm hover:bg-neutral-200">
                  + Add Filter
                </button>
              </div>
            </div>
            <div className="h-[600px]">
              <DataTable 
                columns={rackColumns} 
                data={rackData} 
                mode="deepDive"
                maxRows={15}
              />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 