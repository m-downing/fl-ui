import React, { useState, useEffect } from 'react';
import FilterBar from '@/app/components/design-system/FilterBar';
import { 
  LineChart, 
  BarChart,
  MetricCard
} from '@/app/components/design-system/charts';

// Define interfaces for our KPI data
interface KpiTrendData {
  name: string;
  value: number;
  target: number;
  [key: string]: string | number;
}

interface RegionalKpiData {
  name: string;
  procurementEfficiency: number;
  deploymentTime: number;
  utilizationRate: number;
  [key: string]: string | number;
}

// Mock data for KPI charts
const procurementEfficiencyData: KpiTrendData[] = [
  { name: 'Jan', value: 82, target: 85 },
  { name: 'Feb', value: 85, target: 85 },
  { name: 'Mar', value: 87, target: 85 },
  { name: 'Apr', value: 84, target: 85 },
  { name: 'May', value: 89, target: 85 },
  { name: 'Jun', value: 91, target: 85 },
];

const deploymentTimeData: KpiTrendData[] = [
  { name: 'Jan', value: 18, target: 15 },
  { name: 'Feb', value: 17, target: 15 },
  { name: 'Mar', value: 16, target: 15 },
  { name: 'Apr', value: 15, target: 15 },
  { name: 'May', value: 14, target: 15 },
  { name: 'Jun', value: 13, target: 15 },
];

const capacityUtilizationData: KpiTrendData[] = [
  { name: 'Jan', value: 68, target: 75 },
  { name: 'Feb', value: 71, target: 75 },
  { name: 'Mar', value: 73, target: 75 },
  { name: 'Apr', value: 75, target: 75 },
  { name: 'May', value: 76, target: 75 },
  { name: 'Jun', value: 78, target: 75 },
];

const inventoryTurnoverData: KpiTrendData[] = [
  { name: 'Jan', value: 3.2, target: 4 },
  { name: 'Feb', value: 3.5, target: 4 },
  { name: 'Mar', value: 3.7, target: 4 },
  { name: 'Apr', value: 3.9, target: 4 },
  { name: 'May', value: 4.1, target: 4 },
  { name: 'Jun', value: 4.2, target: 4 },
];

const regionalKpiData: RegionalKpiData[] = [
  { name: 'NAM', procurementEfficiency: 91, deploymentTime: 12, utilizationRate: 78 },
  { name: 'EMEA', procurementEfficiency: 87, deploymentTime: 14, utilizationRate: 75 },
  { name: 'APAC', procurementEfficiency: 84, deploymentTime: 16, utilizationRate: 81 },
  { name: 'LATAM', procurementEfficiency: 79, deploymentTime: 19, utilizationRate: 72 },
];

// MoreIcon component to replace MUI MoreVertIcon
const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

// Tab panel component
function TabPanel(props: { children: React.ReactNode; value: number; index: number; }) {
  const { children, value, index, ...other } = props;

  // Only render content when the tab is active
  if (value !== index) {
    return <div role="tabpanel" hidden aria-labelledby={`kpi-tab-${index}`} />;
  }

  return (
    <div
      role="tabpanel"
      id={`kpi-tabpanel-${index}`}
      aria-labelledby={`kpi-tab-${index}`}
      {...other}
    >
      <div className="py-3">
        {children}
      </div>
    </div>
  );
}

export const KPIsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [region, setRegion] = useState('all');
  const [priority, setPriority] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [tabsReady, setTabsReady] = useState(false);
  
  useEffect(() => {
    // Delay tabs rendering to avoid measurement issues
    const timer = setTimeout(() => {
      setTabsReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Render the tabs without scrolling
  const renderTabs = () => {
    if (!tabsReady) {
      return <div className="h-12 border-b border-neutral-200"></div>;
    }
    
    return (
      <div className="border-b border-neutral-200">
        <div className="flex">
          {['Overview', 'Procurement', 'Deployment', 'Utilization', 'Cost Management'].map((label, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium ${
                tabValue === index 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-neutral-600 hover:text-primary-500 hover:border-b-2 hover:border-primary-300'
              }`}
              onClick={(e) => handleTabChange(e, index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  return (
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
      
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div>
          <MetricCard 
            label="Procurement Efficiency" 
            value="91%" 
            delta={6} 
            trend="up" 
            status="success" 
          />
        </div>
        <div>
          <MetricCard 
            label="Avg. Deployment Time" 
            value="13 days" 
            delta={-5} 
            trend="down" 
            status="success" 
          />
        </div>
        <div>
          <MetricCard 
            label="Capacity Utilization" 
            value="78%" 
            delta={3} 
            trend="up" 
            status="success" 
          />
        </div>
        <div>
          <MetricCard 
            label="Inventory Turnover" 
            value="4.2x" 
            delta={0.3} 
            trend="up" 
            status="success" 
          />
        </div>
      </div>
      
      {/* KPI Category Tabs */}
      <div className="mb-6 bg-white shadow-md rounded-lg">
        {renderTabs()}
        
        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8">
              <div className="p-4 bg-white shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Regional KPI Comparison</h6>
                  <button className="text-neutral-500 p-1 rounded-full hover:bg-neutral-100">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Performance metrics by geographical region
                </p>
                <div className="h-96">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey={['procurementEfficiency', 'utilizationRate', 'deploymentTime']} 
                    xAxisKey="name" 
                    height={400}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <div className="p-4 mb-6 bg-white shadow-sm rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Top Performing Data Centers</h6>
                  <button className="text-neutral-500 p-1 rounded-full hover:bg-neutral-100">
                    <MoreIcon />
                  </button>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">NYC-WEST-08</p>
                      <p className="text-sm text-neutral-500">North America</p>
                    </div>
                    <p className="text-lg font-medium text-success-500">94%</p>
                  </div>
                  <hr className="border-neutral-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">LONDON-EAST-04</p>
                      <p className="text-sm text-neutral-500">EMEA</p>
                    </div>
                    <p className="text-lg font-medium text-success-500">92%</p>
                  </div>
                  <hr className="border-neutral-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">SINGAPORE-03</p>
                      <p className="text-sm text-neutral-500">APAC</p>
                    </div>
                    <p className="text-lg font-medium text-success-500">89%</p>
                  </div>
                  <hr className="border-neutral-200" />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">FRANKFURT-02</p>
                      <p className="text-sm text-neutral-500">EMEA</p>
                    </div>
                    <p className="text-lg font-medium text-success-500">87%</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">KPI Achievement</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-32">
                      <p className="text-sm text-neutral-600">Procurement</p>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <p className="ml-2 text-success-500">91%</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32">
                      <p className="text-sm text-neutral-600">Deployment</p>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <p className="ml-2 text-success-500">87%</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32">
                      <p className="text-sm text-neutral-600">Utilization</p>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <p className="ml-2 text-neutral-500">78%</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32">
                      <p className="text-sm text-neutral-600">Cost</p>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-warning-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="ml-2 text-warning-500">65%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Procurement Efficiency</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  % of orders processed within SLA timeframe
                </p>
                <div className="h-72">
                  <LineChart 
                    data={procurementEfficiencyData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Average Deployment Time</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Days from order to operational deployment
                </p>
                <div className="h-72">
                  <LineChart 
                    data={deploymentTimeData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        {/* Procurement Tab */}
        <TabPanel value={tabValue} index={1}>
          <h6 className="mb-4">Procurement Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Procurement Efficiency Trend</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Percentage of orders processed within SLA timeframe
                </p>
                <div className="h-72">
                  <LineChart 
                    data={procurementEfficiencyData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Inventory Turnover Rate</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Rate at which inventory is used and replaced
                </p>
                <div className="h-72">
                  <LineChart 
                    data={inventoryTurnoverData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        {/* Deployment Tab */}
        <TabPanel value={tabValue} index={2}>
          <h6 className="mb-4">Deployment Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Deployment Time Trend</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Average days from order to operational deployment
                </p>
                <div className="h-72">
                  <LineChart 
                    data={deploymentTimeData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Regional Deployment Times</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Average deployment time by region (days)
                </p>
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey={["deploymentTime"]}
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        {/* Utilization Tab */}
        <TabPanel value={tabValue} index={3}>
          <h6 className="mb-4">Utilization Key Performance Indicators</h6>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Capacity Utilization Trend</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Percentage of data center capacity being utilized
                </p>
                <div className="h-72">
                  <LineChart 
                    data={capacityUtilizationData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-6">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium">Regional Utilization Rates</h6>
                  <button className="text-sm text-neutral-500">
                    <MoreIcon />
                  </button>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  Capacity utilization percentage by region
                </p>
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey="utilizationRate" 
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        {/* Cost Management Tab */}
        <TabPanel value={tabValue} index={4}>
          <h6 className="mb-4">Cost Management Key Performance Indicators</h6>
          <div className="flex justify-center items-center h-64">
            <p className="text-neutral-500">
              Cost KPI data will be available in the next update
            </p>
          </div>
        </TabPanel>
      </div>
      
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
    </div>
  );
};

export default KPIsView;
