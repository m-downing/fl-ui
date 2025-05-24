import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  BarChart
} from '@/app/components/design-system/charts';
import {
  procurementEfficiencyData,
  deploymentTimeData,
  capacityUtilizationData,
  inventoryTurnoverData,
  regionalKpiData
} from './mockData';

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

export const KPITabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tabsReady, setTabsReady] = useState(false);
  
  useEffect(() => {
    // Delay tabs rendering to avoid measurement issues
    const timer = setTimeout(() => {
      setTabsReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  );
}; 