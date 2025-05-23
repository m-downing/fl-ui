import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Divider, 
  Button, 
  IconButton, 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  MenuItem,
  Box,
  Tab,
  Tabs,
  SelectChangeEvent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import DateRangeIcon from '@mui/icons-material/DateRange';

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
  [key: string]: string | number; // Add index signature, changed from any
}

interface RegionalKpiData {
  name: string;
  procurementEfficiency: number;
  deploymentTime: number;
  utilizationRate: number;
  [key: string]: string | number; // Add index signature, changed from any
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
      <Box sx={{ py: 3 }}>
        {children}
      </Box>
    </div>
  );
}

export const KPIsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [region, setRegion] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [tabsReady, setTabsReady] = useState(false);
  
  useEffect(() => {
    // Delay tabs rendering to avoid measurement issues
    const timer = setTimeout(() => {
      setTabsReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value);
  };
  
  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    setRegion(event.target.value);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Render the tabs without scrolling
  const renderTabs = () => {
    if (!tabsReady) {
      return <div className="h-12 border-b border-neutral-200"></div>;
    }
    
    return (
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        aria-label="KPI categories"
        variant="fullWidth"
      >
        <Tab label="Overview" />
        <Tab label="Procurement" />
        <Tab label="Deployment" />
        <Tab label="Utilization" />
        <Tab label="Cost Management" />
      </Tabs>
    );
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Typography variant="h4" className="font-semibold text-neutral-800">
            Key Performance Indicators
          </Typography>
          <Typography variant="body2" className="text-neutral-600">
            Monitor and analyze data center supply chain performance metrics
          </Typography>
        </div>
        <div className="flex items-center space-x-3">
          <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
            <InputLabel>Time Range</InputLabel>
            <MuiSelect
              value={timeRange}
              onChange={handleTimeRangeChange}
              label="Time Range"
              startAdornment={<DateRangeIcon style={{ marginRight: 8 }} fontSize="small" />}
            >
              <MenuItem value="30days">Last 30 Days</MenuItem>
              <MenuItem value="3months">Last 3 Months</MenuItem>
              <MenuItem value="6months">Last 6 Months</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </MuiSelect>
          </FormControl>
          
          <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
            <InputLabel>Region</InputLabel>
            <MuiSelect
              value={region}
              onChange={handleRegionChange}
              label="Region"
            >
              <MenuItem value="all">All Regions</MenuItem>
              <MenuItem value="nam">North America</MenuItem>
              <MenuItem value="emea">EMEA</MenuItem>
              <MenuItem value="apac">APAC</MenuItem>
              <MenuItem value="latam">LATAM</MenuItem>
            </MuiSelect>
          </FormControl>
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            size="medium"
          >
            More Filters
          </Button>
        </div>
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
      <Paper className="mb-6">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {renderTabs()}
        </Box>
        
        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Regional KPI Comparison</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Performance metrics by geographical region
                </Typography>
                <div className="h-96">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey={['procurementEfficiency', 'utilizationRate', 'deploymentTime']} 
                    xAxisKey="name" 
                    height={400}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-4">
              <Paper className="p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Top Performing Data Centers</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="subtitle2">NYC-WEST-08</Typography>
                      <Typography variant="body2" className="text-neutral-500">North America</Typography>
                    </div>
                    <Typography variant="h6" className="text-success-500">94%</Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="subtitle2">LONDON-EAST-04</Typography>
                      <Typography variant="body2" className="text-neutral-500">EMEA</Typography>
                    </div>
                    <Typography variant="h6" className="text-success-500">92%</Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="subtitle2">SINGAPORE-03</Typography>
                      <Typography variant="body2" className="text-neutral-500">APAC</Typography>
                    </div>
                    <Typography variant="h6" className="text-success-500">89%</Typography>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <div>
                      <Typography variant="subtitle2">FRANKFURT-02</Typography>
                      <Typography variant="body2" className="text-neutral-500">EMEA</Typography>
                    </div>
                    <Typography variant="h6" className="text-success-500">87%</Typography>
                  </div>
                </div>
              </Paper>
              
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">KPI Achievement</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <div className="space-y-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-32">
                      <Typography variant="body2" className="text-neutral-600">Procurement</Typography>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <Typography variant="body2" className="ml-2 text-success-500">91%</Typography>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32">
                      <Typography variant="body2" className="text-neutral-600">Deployment</Typography>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <Typography variant="body2" className="ml-2 text-success-500">87%</Typography>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32">
                      <Typography variant="body2" className="text-neutral-600">Utilization</Typography>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <Typography variant="body2" className="ml-2 text-neutral-500">78%</Typography>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32">
                      <Typography variant="body2" className="text-neutral-600">Cost</Typography>
                    </div>
                    <div className="flex-grow bg-neutral-200 h-2 rounded-full">
                      <div className="bg-warning-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <Typography variant="body2" className="ml-2 text-warning-500">65%</Typography>
                  </div>
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Procurement Efficiency</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  % of orders processed within SLA timeframe
                </Typography>
                <div className="h-72">
                  <LineChart 
                    data={procurementEfficiencyData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Average Deployment Time</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Days from order to operational deployment
                </Typography>
                <div className="h-72">
                  <LineChart 
                    data={deploymentTimeData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Paper>
            </div>
          </div>
        </TabPanel>
        
        {/* Procurement Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" className="mb-4">Procurement Key Performance Indicators</Typography>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Procurement Efficiency Trend</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Percentage of orders processed within SLA timeframe
                </Typography>
                <div className="h-72">
                  <LineChart 
                    data={procurementEfficiencyData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Inventory Turnover Rate</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Rate at which inventory is used and replaced
                </Typography>
                <div className="h-72">
                  <LineChart 
                    data={inventoryTurnoverData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Paper>
            </div>
          </div>
        </TabPanel>
        
        {/* Deployment Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" className="mb-4">Deployment Key Performance Indicators</Typography>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Deployment Time Trend</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Average days from order to operational deployment
                </Typography>
                <div className="h-72">
                  <LineChart 
                    data={deploymentTimeData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Regional Deployment Times</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Average deployment time by region (days)
                </Typography>
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey={["deploymentTime"]}
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </Paper>
            </div>
          </div>
        </TabPanel>
        
        {/* Utilization Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" className="mb-4">Utilization Key Performance Indicators</Typography>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Capacity Utilization Trend</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Percentage of data center capacity being utilized
                </Typography>
                <div className="h-72">
                  <LineChart 
                    data={capacityUtilizationData} 
                    dataKey={['value', 'target']} 
                    xAxisKey="name" 
                    height={300}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-6">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Regional Utilization Rates</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Capacity utilization percentage by region
                </Typography>
                <div className="h-72">
                  <BarChart 
                    data={regionalKpiData} 
                    dataKey="utilizationRate" 
                    xAxisKey="name"
                    height={300}
                  />
                </div>
              </Paper>
            </div>
          </div>
        </TabPanel>
        
        {/* Cost Management Tab */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" className="mb-4">Cost Management Key Performance Indicators</Typography>
          <div className="flex justify-center items-center h-64">
            <Typography variant="h6" className="text-neutral-500">
              Cost KPI data will be available in the next update
            </Typography>
          </div>
        </TabPanel>
      </Paper>
      
      <Paper className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="font-medium">KPI Insights</Typography>
          <Button variant="text" color="primary">
            View All Insights
          </Button>
        </div>
        <div className="space-y-4">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <Typography variant="subtitle2" className="text-success-700">Procurement Efficiency Improvement</Typography>
            <Typography variant="body2" className="text-neutral-600">
              Procurement efficiency has increased by 6% over the last quarter, exceeding the target by 3%. 
              This is attributed to the implementation of the new automated vendor management system.
            </Typography>
          </div>
          
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <Typography variant="subtitle2" className="text-success-700">Deployment Time Reduction</Typography>
            <Typography variant="body2" className="text-neutral-600">
              Average deployment time has decreased from 18 days to 13 days over the past 6 months, 
              meeting the SLA target of 15 days. Streamlined customs clearance processes have contributed to this improvement.
            </Typography>
          </div>
          
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <Typography variant="subtitle2" className="text-warning-700">Cost Management Alert</Typography>
            <Typography variant="body2" className="text-neutral-600">
              APAC region is showing higher-than-expected shipping costs, currently 12% above budget. 
              Recommend reviewing logistics contracts and exploring alternative shipping routes.
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default KPIsView;
