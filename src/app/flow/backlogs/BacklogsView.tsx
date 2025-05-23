import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  IconButton, 
  Box,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  Tab,
  Tabs,
  SelectChangeEvent
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { 
  LineChart, 
  BarChart,
  MetricCard,
  // ProgressTracker // Removed as it's unused
} from '@/app/components/design-system/charts';
import { DataTable, ColumnDef } from '@/app/components/design-system';

// Define interfaces for backlogs data
interface BacklogItem {
  id: number;
  dataCenter: string;
  rackType: string;
  equipmentType: string;
  region: string;
  quantity: number;
  requestDate: string;
  expectedDelivery: string;
  delay: number;
  status: 'orderPlaced' | 'manufacturing' | 'shipping' | 'customs' | 'localDelivery' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  blockerReason?: string;
}

// Updated to match ChartDataObject with name property
interface BacklogTrend {
  name: string; // Changed from 'month' to 'name' to match ChartDataObject
  rackBacklogs: number;
  networkBacklogs: number;
  storageBacklogs: number;
  [key: string]: string | number; // Add index signature for ChartDataObject compatibility
}

// Updated to match ChartDataObject with name property
interface RegionalBacklog {
  name: string; // Changed from 'region' to 'name' to match ChartDataObject
  backlogCount: number;
  resolvedCount: number;
  [key: string]: string | number; // Add index signature for ChartDataObject compatibility
}

// Mock data for backlogs
const backlogItems: BacklogItem[] = [
  {
    id: 1,
    dataCenter: 'NYC-EAST-12',
    rackType: 'Compute',
    equipmentType: 'High-Performance Servers',
    region: 'NAM',
    quantity: 15,
    requestDate: '2023-08-15',
    expectedDelivery: '2023-11-30',
    delay: 25,
    status: 'manufacturing',
    priority: 'critical'
  },
  {
    id: 2,
    dataCenter: 'LONDON-WEST-07',
    rackType: 'Network',
    equipmentType: 'Core Switches',
    region: 'EMEA',
    quantity: 8,
    requestDate: '2023-09-03',
    expectedDelivery: '2023-12-15',
    delay: 12,
    status: 'orderPlaced',
    priority: 'high'
  },
  {
    id: 3,
    dataCenter: 'SINGAPORE-03',
    rackType: 'Storage',
    equipmentType: 'Flash Arrays',
    region: 'APAC',
    quantity: 10,
    requestDate: '2023-08-20',
    expectedDelivery: '2023-12-05',
    delay: 18,
    status: 'shipping',
    priority: 'high'
  },
  {
    id: 4,
    dataCenter: 'FRANKFURT-01',
    rackType: 'Compute',
    equipmentType: 'GPU Servers',
    region: 'EMEA',
    quantity: 5,
    requestDate: '2023-09-10',
    expectedDelivery: '2023-11-25',
    delay: 0,
    status: 'manufacturing',
    priority: 'medium'
  },
  {
    id: 5,
    dataCenter: 'NYC-WEST-08',
    rackType: 'Storage',
    equipmentType: 'Object Storage Arrays',
    region: 'NAM',
    quantity: 12,
    requestDate: '2023-07-25',
    expectedDelivery: '2023-11-20',
    delay: 45,
    status: 'blocked',
    priority: 'critical',
    blockerReason: 'Component shortage from manufacturer'
  },
  {
    id: 6,
    dataCenter: 'TOKYO-01',
    rackType: 'Network',
    equipmentType: 'Edge Routers',
    region: 'APAC',
    quantity: 6,
    requestDate: '2023-08-05',
    expectedDelivery: '2023-12-10',
    delay: 15,
    status: 'customs',
    priority: 'high'
  },
  {
    id: 7,
    dataCenter: 'SYDNEY-02',
    rackType: 'Compute',
    equipmentType: 'Blade Servers',
    region: 'APAC',
    quantity: 20,
    requestDate: '2023-09-15',
    expectedDelivery: '2023-12-20',
    delay: 5,
    status: 'orderPlaced',
    priority: 'medium'
  },
  {
    id: 8,
    dataCenter: 'SAO-PAULO-01',
    rackType: 'Storage',
    equipmentType: 'Backup Appliances',
    region: 'LATAM',
    quantity: 8,
    requestDate: '2023-08-30',
    expectedDelivery: '2023-11-28',
    delay: 30,
    status: 'blocked',
    priority: 'high',
    blockerReason: 'Import regulations changed, requires new certification'
  }
];

// Mock data for backlog trends - updated with 'name' instead of 'month'
const backlogTrends: BacklogTrend[] = [
  { name: 'Jun', rackBacklogs: 35, networkBacklogs: 18, storageBacklogs: 22 },
  { name: 'Jul', rackBacklogs: 42, networkBacklogs: 23, storageBacklogs: 25 },
  { name: 'Aug', rackBacklogs: 48, networkBacklogs: 28, storageBacklogs: 30 },
  { name: 'Sep', rackBacklogs: 52, networkBacklogs: 25, storageBacklogs: 32 },
  { name: 'Oct', rackBacklogs: 45, networkBacklogs: 22, storageBacklogs: 28 },
  { name: 'Nov', rackBacklogs: 38, networkBacklogs: 20, storageBacklogs: 24 }
];

// Mock data for regional backlogs - updated with 'name' instead of 'region'
const regionalBacklogs: RegionalBacklog[] = [
  { name: 'NAM', backlogCount: 28, resolvedCount: 35 },
  { name: 'EMEA', backlogCount: 22, resolvedCount: 30 },
  { name: 'APAC', backlogCount: 32, resolvedCount: 25 },
  { name: 'LATAM', backlogCount: 14, resolvedCount: 10 }
];

// Column definitions for backlog table
const backlogColumns: ColumnDef<BacklogItem>[] = [
  {
    field: 'priority',
    title: 'Priority',
    width: 100,
    flex: 1,
    statusAccessor: (row) => {
      if (row.priority === 'critical') return 'error';
      if (row.priority === 'high') return 'warning';
      // Changed from 'accent' to 'success' for medium priority
      if (row.priority === 'medium') return 'success';
      // Changed from 'neutral' to 'success' for low priority
      return 'success';
    },
    cellRenderer: (row) => {
      let colorClass = '';
      switch (row.priority) {
        case 'critical': colorClass = 'text-red-600'; break;
        case 'high': colorClass = 'text-yellow-600'; break;
        case 'medium': colorClass = 'text-blue-600'; break;
        case 'low': colorClass = 'text-neutral-600'; break;
      }
      return <span className={`font-semibold ${colorClass} px-2 py-1 rounded-full text-xs`}>{row.priority.toUpperCase()}</span>;
    }
  },
  {
    field: 'dataCenter',
    title: 'Data Center',
    width: 140,
    flex: 1,
    cellRenderer: (row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.dataCenter}</span>
        <span className="text-xs text-neutral-500">{row.region}</span>
      </div>
    )
  },
  {
    field: 'rackType',
    title: 'Equipment',
    width: 160,
    flex: 1.5,
    cellRenderer: (row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.rackType}</span>
        <span className="text-xs text-neutral-500">{row.equipmentType}</span>
      </div>
    )
  },
  {
    field: 'quantity',
    title: 'Qty',
    width: 70,
    flex: 0.5,
  },
  {
    field: 'status',
    title: 'Status',
    width: 160,
    flex: 1.5,
    cellRenderer: (row) => {
      const statusText = {
        orderPlaced: 'Order Placed',
        manufacturing: 'Manufacturing',
        shipping: 'Shipping',
        customs: 'Customs',
        localDelivery: 'Local Delivery',
        blocked: 'Blocked'
      };
      
      const statusIcon = row.status === 'blocked' 
        ? <ErrorOutlineIcon fontSize="small" className="text-error-500 mr-1" />
        : <CheckCircleOutlineIcon fontSize="small" className="text-success-500 mr-1" />;
      
      const statusColorClass = row.status === 'blocked' ? 'text-error-500' : '';
      
      return (
        <div className={`flex items-center ${statusColorClass}`}>
          {statusIcon}
          <span>{statusText[row.status]}</span>
        </div>
      );
    }
  },
  {
    field: 'delay',
    title: 'Delay (days)',
    width: 120,
    flex: 1,
    cellRenderer: (row) => {
      let colorClass = 'text-neutral-600';
      if (row.delay > 30) colorClass = 'text-error-500';
      else if (row.delay > 15) colorClass = 'text-warning-500';
      else if (row.delay > 0) colorClass = 'text-accent-500';
      
      return <span className={`font-medium ${colorClass}`}>{row.delay > 0 ? `+${row.delay}` : '0'}</span>;
    }
  },
  {
    field: 'expectedDelivery',
    title: 'Expected Delivery',
    width: 150,
    flex: 1,
  }
];

// Tab panel component
function TabPanel(props: { children: React.ReactNode; value: number; index: number; }) {
  const { children, value, index, ...other } = props;

  // Only render content when the tab is active
  if (value !== index) {
    return <div role="tabpanel" hidden aria-labelledby={`backlog-tab-${index}`} />;
  }

  return (
    <div
      role="tabpanel"
      id={`backlog-tabpanel-${index}`}
      aria-labelledby={`backlog-tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 3 }}>
        {children}
      </Box>
    </div>
  );
}

const BacklogsView: React.FC = () => {
  // const [selectedBacklog, setSelectedBacklog] = useState<BacklogItem | null>(null); // Removed as unused
  // const [isBacklogModalOpen, setIsBacklogModalOpen] = useState(false); // Removed as unused
  const [tabValue, setTabValue] = useState(0);
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [tabsReady, setTabsReady] = useState(false);
  
  useEffect(() => {
    // Delay tabs rendering to avoid measurement issues
    const timer = setTimeout(() => {
      setTabsReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleRegionFilterChange = (event: SelectChangeEvent) => {
    setFilterRegion(event.target.value as string);
  };
  
  const handlePriorityFilterChange = (event: SelectChangeEvent) => {
    setFilterPriority(event.target.value as string);
  };
  
  // Calculate summary metrics
  const totalBacklogs = backlogItems.length;
  const criticalBacklogs = backlogItems.filter(item => item.priority === 'critical').length;
  const blockedBacklogs = backlogItems.filter(item => item.status === 'blocked').length;
  const avgDelay = Math.round(backlogItems.reduce((sum, item) => sum + item.delay, 0) / totalBacklogs);
  
  // Render the tabs without scrolling
  const renderTabs = () => {
    if (!tabsReady) {
      return <div className="h-12 border-b border-neutral-200"></div>;
    }
    
    return (
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        aria-label="Backlog categories"
        variant="fullWidth"
      >
        <Tab label="All Backlogs" />
        <Tab label="Critical Backlogs" />
        <Tab label="Blocked Orders" />
        <Tab label="Analysis" />
      </Tabs>
    );
  };
  
  return (
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
        <div className="flex items-center space-x-3">
          <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
            <InputLabel>Region</InputLabel>
            <MuiSelect
              value={filterRegion}
              onChange={handleRegionFilterChange}
              label="Region"
            >
              <MenuItem value="all">All Regions</MenuItem>
              <MenuItem value="nam">North America</MenuItem>
              <MenuItem value="emea">EMEA</MenuItem>
              <MenuItem value="apac">APAC</MenuItem>
              <MenuItem value="latam">LATAM</MenuItem>
            </MuiSelect>
          </FormControl>
          
          <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <MuiSelect
              value={filterPriority}
              onChange={handlePriorityFilterChange}
              label="Priority"
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
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
      
      {/* Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <MetricCard 
            label="Total Backlogged Orders" 
            value={`${totalBacklogs}`} 
            delta={-3} 
            trend="down"
            status="success" 
          />
        </div>
        <div>
          <MetricCard 
            label="Critical Priority Backlogs" 
            value={`${criticalBacklogs}`} 
            delta={1} 
            trend="up"
            status="error" 
          />
        </div>
        <div>
          <MetricCard 
            label="Blocked Orders" 
            value={`${blockedBacklogs}`} 
            delta={0} 
            // Changed from "neutral" to undefined as "neutral" is not a valid trend value
            trend={undefined}
            status="warning" 
          />
        </div>
        <div>
          <MetricCard 
            label="Average Delay" 
            value={`${avgDelay} days`} 
            delta={-2} 
            trend="down"
            status="success" 
          />
        </div>
      </div>
      
      {/* Backlog Tabs */}
      <Paper className="mb-6">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {renderTabs()}
        </Box>
        
        {/* All Backlogs Tab */}
        <TabPanel value={tabValue} index={0}>
          <div className="w-full overflow-x-auto">
            <DataTable 
              columns={backlogColumns} 
              data={backlogItems} 
              mode="deepDive" 
              width="100%"
              height={300}
              // Removed onRowClick as it's not supported by DataTable component
            />
          </div>
        </TabPanel>
        
        {/* Critical Backlogs Tab */}
        <TabPanel value={tabValue} index={1}>
          <div className="w-full overflow-x-auto">
            <DataTable 
              columns={backlogColumns} 
              data={backlogItems.filter(item => item.priority === 'critical')} 
              mode="deepDive" 
              width="100%"
              height={300}
              // Removed onRowClick as it's not supported by DataTable component
            />
          </div>
        </TabPanel>
        
        {/* Blocked Orders Tab */}
        <TabPanel value={tabValue} index={2}>
          <div className="w-full overflow-x-auto">
            <DataTable 
              columns={backlogColumns} 
              data={backlogItems.filter(item => item.status === 'blocked')} 
              mode="deepDive" 
              width="100%"
              height={300}
              // Removed onRowClick as it's not supported by DataTable component
            />
          </div>
        </TabPanel>
        
        {/* Analysis Tab */}
        <TabPanel value={tabValue} index={3}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Backlog Trend Analysis</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  6-month trend of equipment backlogs by category
                </Typography>
                <div className="h-80">
                  <LineChart 
                    data={backlogTrends} 
                    dataKey={['rackBacklogs', 'networkBacklogs', 'storageBacklogs']} 
                    xAxisKey="name" // Updated from "month" to "name"
                    height={320}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-4">
              <Paper className="p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">Resolution Progress</Typography>
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
                <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
                  Current vs. resolved backlogs by region
                </Typography>
                <div className="h-80">
                  <BarChart 
                    data={regionalBacklogs} 
                    dataKey={['backlogCount', 'resolvedCount']} 
                    xAxisKey="name" // Updated from "region" to "name"
                    height={320}
                  />
                </div>
              </Paper>
            </div>
            
            <div className="md:col-span-12">
              <Paper className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6" className="font-medium">
                    <div className="flex items-center">
                      <WarningAmberIcon className="text-yellow-500 mr-2" fontSize="small" />
                      Supply Chain Risk Factors
                    </div>
                  </Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <Typography variant="subtitle2" className="text-error-700">Component Shortages</Typography>
                    <Typography variant="body2" className="text-neutral-600 mt-1">
                      Global shortage of specific processor models is affecting manufacturing of compute racks.
                      Estimated impact: 15-20 day delay for high-performance servers.
                    </Typography>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <Typography variant="subtitle2" className="text-warning-700">Shipping Delays</Typography>
                    <Typography variant="body2" className="text-neutral-600 mt-1">
                      Congestion at major Asian ports is affecting shipping times to NAM and EMEA regions.
                      Average additional delay: 10-12 days for equipment from APAC manufacturers.
                    </Typography>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <Typography variant="subtitle2" className="text-warning-700">Import Regulations</Typography>
                    <Typography variant="body2" className="text-neutral-600 mt-1">
                      New security regulations for network equipment in LATAM region require additional certification.
                      Process adds approximately 18-25 days to customs clearance.
                    </Typography>
                  </div>
                  
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    <Typography variant="subtitle2" className="text-success-700">Manufacturing Capacity</Typography>
                    <Typography variant="body2" className="text-neutral-600 mt-1">
                      Primary storage equipment manufacturer has increased production capacity.
                      Expected to reduce manufacturing delays by 30% starting next month.
                    </Typography>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default BacklogsView;
