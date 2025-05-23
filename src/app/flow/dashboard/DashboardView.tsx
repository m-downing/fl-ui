import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
// Removed MUI imports: Grid, Paper, Box, Typography, Divider, Button, IconButton, Chip
// Removed MUI Icon imports: MoreVertIcon, WarningAmberIcon

import { 
  LineChart, 
  BarChart,
  PieChart,
  MetricCard, 
  ProgressTracker 
} from '@/app/components/design-system/charts';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import Modal from '@/app/components/design-system/Modal';
import Badge from '@/app/components/design-system/Badge';
import Button from '@/app/components/design-system/Button';
import TableToggle from '@/app/components/design-system/TableToggle';

// Define BadgeVariant type to match what's in the Badge component
type BadgeVariant = 
  // Supply Chain Status Badges
  | 'planned'
  | 'ordered'
  | 'manufacturing'
  | 'qualityTesting'
  | 'readyToShip'
  | 'inTransit'
  | 'delivered'
  | 'installing'
  | 'active'
  | 'maintenance'
  | 'delayed'
  // Priority/Risk Badges
  | 'critical'
  | 'highPriority'
  | 'standard'
  | 'atRisk';

// Contact interface
interface Contact {
  name: string;
  email: string;
  phone: string;
  role: string;
}

// AlertItem interface
interface AlertItem {
  id: number;
  sctId: string;
  severity: 'critical' | 'warning' | 'update';
  message: string;
  location: string;
  timestamp: string;
  contacts: Contact[];
}

// CapacityData interface
interface CapacityData {
  name: string;
  actual: number;
  forecast: number;
  remaining: number;
  region?: string; 
  [key: string]: string | number | undefined;
}

// RegionCapacity interface
interface RegionCapacity {
  name: string;
  Compute: number;
  Storage: number;
  Network: number;
  [key: string]: string | number;
}

// LogisticsEntry interface
interface LogisticsEntry {
  id: string;
  rackName: string;
  sku: string;
  supplier: string;
  purchaseOrder: string;
  status: 'Ordered' | 'Shipped' | 'In Transit' | 'Customs' | 'Delivered' | 'Delayed';
  currentLocation: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  priority: 'High' | 'Medium' | 'Low';
  quantity: number;
  assignedDc: string;
  trackingNumber: string;
  notes: string;
  lastUpdate: string;
}

// Mock data for alerts
const alertData: AlertItem[] = [
  { 
    id: 1, sctId: 'SCT-001', severity: 'critical', message: 'Power capacity threshold exceeded', location: 'NYC-EAST-12', timestamp: '2023-10-30 09:15:22',
    contacts: [
      { name: 'Alice Wonderland', email: 'alice.w@example.com', phone: '555-0101', role: 'DC Operations Lead' },
      { name: 'Bob The Builder', email: 'bob.b@example.com', phone: '555-0102', role: 'Power Systems SME' }
    ]
  },
  { 
    id: 2, sctId: 'SCT-002', severity: 'warning', message: 'Storage rack delivery delayed', location: 'LONDON-WEST-07', timestamp: '2023-10-30 08:30:45',
    contacts: [
      { name: 'Carol Danvers', email: 'carol.d@example.com', phone: '555-0103', role: 'Logistics Coordinator' },
      { name: 'Dave Lister', email: 'dave.l@example.com', phone: '555-0104', role: 'Regional Manager EMEA' }
    ]
  },
  { 
    id: 3, sctId: 'SCT-003', severity: 'update', message: 'Quarterly capacity forecast updated', location: 'ALL', timestamp: '2023-10-30 07:25:10',
    contacts: [
      { name: 'Eve Polastri', email: 'eve.p@example.com', phone: '555-0105', role: 'Analytics Team' },
      { name: 'Frank Drebin', email: 'frank.d@example.com', phone: '555-0106', role: 'Reporting Lead' }
    ]
  },
  { 
    id: 4, sctId: 'SCT-004', severity: 'warning', message: 'Cooling system maintenance scheduled', location: 'SINGAPORE-04', timestamp: '2023-10-29 18:45:33',
    contacts: [
      { name: 'Grace Hopper', email: 'grace.h@example.com', phone: '555-0107', role: 'Facilities APAC' },
      { name: 'Hank Hill', email: 'hank.h@example.com', phone: '555-0108', role: 'HVAC Specialist' }
    ]
  },
  { 
    id: 5, sctId: 'SCT-005', severity: 'critical', message: 'Network rack inventory below threshold', location: 'FRANKFURT-01', timestamp: '2023-10-29 15:20:18',
    contacts: [
      { name: 'Ivy Benson', email: 'ivy.b@example.com', phone: '555-0109', role: 'Network Inventory Manager' },
      { name: 'Jack Burton', email: 'jack.b@example.com', phone: '555-0110', role: 'Procurement Officer' }
    ]
  },
];

// Helper function to generate mock logistics data
const generateLogisticsData = (count: number, prefix: string): LogisticsEntry[] => {
  const statuses: LogisticsEntry['status'][] = ['Ordered', 'Shipped', 'In Transit', 'Customs', 'Delivered', 'Delayed'];
  const priorities: LogisticsEntry['priority'][] = ['High', 'Medium', 'Low'];
  const suppliers = ['Dell', 'HPE', 'Supermicro', 'Lenovo', 'Cisco'];
  const locations = ['Factory A', 'Port of Shanghai', 'Mid-Atlantic', 'Customs LAX', 'Warehouse TX'];
  const dataCenters = ['NYC-01', 'LDN-02', 'FRA-03', 'SGP-04', 'SYD-05'];

  return Array.from({ length: count }, (_, i) => {
    const eta = new Date();
    eta.setDate(eta.getDate() + (i % 15) + 5); 
    const status = statuses[i % statuses.length];
    return {
      id: `${prefix}-${i + 1}`,
      rackName: `Rack Unit ${prefix}${i + 100}`,
      sku: `SKU-${(i % 20) + 1000}`,
      supplier: suppliers[i % suppliers.length],
      purchaseOrder: `PO-${prefix.toUpperCase()}${(i % 50) + 7000}`,
      status: status,
      currentLocation: status === 'Delivered' ? dataCenters[i % dataCenters.length] : locations[i % locations.length],
      estimatedDelivery: eta.toISOString().split('T')[0],
      actualDelivery: status === 'Delivered' ? eta.toISOString().split('T')[0] : undefined,
      priority: priorities[i % priorities.length],
      quantity: (i % 5) + 1,
      assignedDc: dataCenters[i % dataCenters.length],
      trackingNumber: `TRK-${prefix.toUpperCase()}${(i % 100) + 90000}`,
      notes: `Note for ${prefix}-${i + 1}`,
      lastUpdate: new Date().toISOString(),
    };
  });
};

const logisticsData1 = generateLogisticsData(25, 'LOG1');
const logisticsData2 = generateLogisticsData(30, 'LOG2');

// Column definitions for logistics table
const logisticsColumns: AGColumnDef<LogisticsEntry>[] = [
  { 
    field: 'status', 
    title: 'Status', 
    width: 120,
    flex: 1,
    cellRenderer: (row: LogisticsEntry) => {
      let badgeVariant: BadgeVariant;
      switch(row.status) {
        case 'Delivered': badgeVariant = 'delivered'; break;
        case 'Ordered': badgeVariant = 'ordered'; break;
        case 'In Transit': badgeVariant = 'inTransit'; break;
        case 'Shipped': badgeVariant = 'readyToShip'; break;
        case 'Customs': badgeVariant = 'qualityTesting'; break;
        case 'Delayed': badgeVariant = 'delayed'; break;
        default: badgeVariant = 'standard';
      }
      return <Badge variant={badgeVariant} size="small">{row.status}</Badge>;
    }
  },
  { field: 'id', title: 'ID', width: 80, flex: 1 },
  { field: 'rackName', title: 'Rack Name', width: 150, flex: 1.5 },
  { field: 'sku', title: 'SKU', width: 120, flex: 1 },
  { field: 'supplier', title: 'Supplier', width: 120, flex: 1 },
  { field: 'purchaseOrder', title: 'PO Number', width: 130, flex: 1 },
  { field: 'currentLocation', title: 'Current Location', width: 150, flex: 1.5 },
  { field: 'estimatedDelivery', title: 'Est. Delivery', width: 130, flex: 1 },
  { field: 'actualDelivery', title: 'Actual Delivery', width: 130, flex: 1 },
  { 
    field: 'priority', 
    title: 'Priority', 
    width: 100,
    flex: 1,
    cellRenderer: (row: LogisticsEntry) => {
      let badgeVariant: BadgeVariant;
      switch(row.priority) {
        case 'High': badgeVariant = 'critical'; break;
        case 'Medium': badgeVariant = 'highPriority'; break;
        case 'Low': badgeVariant = 'standard'; break;
        default: badgeVariant = 'standard';
      }
      return <Badge variant={badgeVariant} size="small">{row.priority}</Badge>;
    }
  },
  { field: 'quantity', title: 'Qty', width: 70, flex: 0.5 },
  { field: 'assignedDc', title: 'Assigned DC', width: 120, flex: 1 },
  { field: 'trackingNumber', title: 'Tracking #', width: 140, flex: 1 },
  { field: 'notes', title: 'Notes', width: 200, flex: 2 },
  { field: 'lastUpdate', title: 'Last Update', width: 180, flex: 1.5, cellRenderer: (row: LogisticsEntry) => new Date(row.lastUpdate).toLocaleString() },
];

// Mock data for capacity trend chart
const capacityTrendData: CapacityData[] = [
  { name: 'Jan', actual: 4200, forecast: 3800, remaining: 800 },
  { name: 'Feb', actual: 4800, forecast: 4300, remaining: 700 },
  { name: 'Mar', actual: 5200, forecast: 4700, remaining: 650 },
  { name: 'Apr', actual: 5500, forecast: 5600, remaining: 600 },
  { name: 'May', actual: 5800, forecast: 6200, remaining: 550 },
  { name: 'Jun', actual: 6200, forecast: 5800, remaining: 500 },
];

// Mock data for region capacity
const regionCapacityData: RegionCapacity[] = [
  { name: 'NAM', Compute: 420, Storage: 280, Network: 120 },
  { name: 'EMEA', Compute: 380, Storage: 240, Network: 110 },
  { name: 'APAC', Compute: 320, Storage: 210, Network: 90 },
  { name: 'LATAM', Compute: 150, Storage: 120, Network: 50 },
];

// Mock data for rack type distribution
const rackTypeData = [
  { name: 'Compute Racks', value: 520 },
  { name: 'Storage Racks', value: 380 },
  { name: 'Network Racks', value: 210 },
  { name: 'Security Appliances', value: 120 },
];

// LogisticsTable component (from previous step)
interface LogisticsTableProps {
  title: string;
  data: LogisticsEntry[];
  showDeepDive?: boolean;
}

const LogisticsTable: React.FC<LogisticsTableProps> = ({ title, data, showDeepDive = false }) => {
  const [mode, setMode] = useState<'summary' | 'drilldown' | 'deepDive'>('summary');
  
  // Create specific columns for warehouse table (without Status column and Priority first)
  const warehouseColumns: AGColumnDef<LogisticsEntry>[] = [
    { 
      field: 'priority', 
      title: 'Priority', 
      width: 100,
      flex: 1,
      cellRenderer: (row: LogisticsEntry) => {
        let badgeVariant: BadgeVariant;
        switch(row.priority) {
          case 'High': badgeVariant = 'critical'; break;
          case 'Medium': badgeVariant = 'highPriority'; break;
          case 'Low': badgeVariant = 'standard'; break;
          default: badgeVariant = 'standard';
        }
        return <Badge variant={badgeVariant} size="small">{row.priority}</Badge>;
      }
    },
    { field: 'id', title: 'ID', width: 80, flex: 1 },
    { field: 'rackName', title: 'Rack Name', width: 150, flex: 1.5 },
    { field: 'sku', title: 'SKU', width: 120, flex: 1 },
    { field: 'supplier', title: 'Supplier', width: 120, flex: 1 },
    { field: 'purchaseOrder', title: 'PO Number', width: 130, flex: 1 },
    { field: 'currentLocation', title: 'Current Location', width: 150, flex: 1.5 },
    { field: 'estimatedDelivery', title: 'Est. Delivery', width: 130, flex: 1 },
    { field: 'actualDelivery', title: 'Actual Delivery', width: 130, flex: 1 },
    { field: 'quantity', title: 'Qty', width: 70, flex: 0.5 },
    { field: 'assignedDc', title: 'Assigned DC', width: 120, flex: 1 },
    { field: 'trackingNumber', title: 'Tracking #', width: 140, flex: 1 },
    { field: 'notes', title: 'Notes', width: 200, flex: 2 },
    { field: 'lastUpdate', title: 'Last Update', width: 180, flex: 1.5, cellRenderer: (row: LogisticsEntry) => new Date(row.lastUpdate).toLocaleString() },
  ];

  // Determine which columns to use based on the table title
  const tableColumns = title === "Warehouse Inventory & Allocation" ? warehouseColumns : logisticsColumns;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative block">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-lg font-medium text-neutral-800">{title}</h6>
        <div className="absolute top-3 right-3">
          <TableToggle 
            mode={mode} 
            onChange={setMode} 
            showDeepDive={showDeepDive} 
          />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-white">
        <AGDataTable
          columns={tableColumns}
          data={data}
          mode={mode}
          maxSummaryColumns={10}
          maxRows={10}
          height={300}
        />
      </div>
    </div>
  );
};

const DashboardView: React.FC = () => {
  // const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // Removed as unused
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentAlertForContacts, setCurrentAlertForContacts] = useState<AlertItem | null>(null);
  
  const handleOpenContactModal = useCallback((alert: AlertItem) => {
    setCurrentAlertForContacts(alert);
    setIsContactModalOpen(true);
  }, []);

  const handleCloseContactModal = useCallback(() => {
    setIsContactModalOpen(false);
    setCurrentAlertForContacts(null);
  }, []);

  const alertColumns = useMemo((): AGColumnDef<AlertItem>[] => [
    {
      field: 'severity',
      title: 'Severity',
      width: 120,
      flex: 1,
      cellRenderer: (row: AlertItem) => {
        let badgeVariant: BadgeVariant;
        switch(row.severity) {
          case 'critical': badgeVariant = 'critical'; break;
          case 'warning': badgeVariant = 'atRisk'; break;
          case 'update': badgeVariant = 'standard'; break;
          default: badgeVariant = 'standard';
        }
        return <Badge variant={badgeVariant} size="small">{row.severity.toUpperCase()}</Badge>;
      }
    },
    {
      field: 'sctId',
      title: 'SCT ID',
      width: 100,
      flex: 1,
      cellRenderer: (row: AlertItem) => (
        <span 
          onClick={() => navigator.clipboard.writeText(row.sctId)}
          title="Copy SCT ID"
        >
          {row.sctId}
        </span>
      )
    },
    {
      field: 'message',
      title: 'Occurrence',
      width: 300,
      flex: 2,
      cellRenderer: (row: AlertItem) => row.message
    },
    {
      field: 'location',
      title: 'Location',
      width: 140,
      flex: 1,
      cellRenderer: (row: AlertItem) => row.location
    },
    {
      field: 'timestamp',
      title: 'Event Date',
      width: 180,
      flex: 1,
      cellRenderer: (row: AlertItem) => row.timestamp
    },
    {
      field: 'resolutionLog',
      title: 'Resolution Log',
      width: 140,
      flex: 1,
      cellRenderer: (row: AlertItem) => (
        <div className="flex justify-center items-center h-full">
          <Image
            src="/icons/ui/group-chat.svg"
            alt="Resolution Log"
            className="w-5 h-5 cursor-pointer hover:opacity-75"
            width={20}
            height={20}
            onClick={() => handleOpenContactModal(row)}
          />
        </div>
      )
    }
  ], [handleOpenContactModal]);
  
  return (
    <div className="px-6 py-8 pb-16 bg-neutral-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800">
            Global Infrastructure Dashboard
          </h4>
          <p className="text-sm text-neutral-600">
            Real-time overview of data center capacity, deployments, and critical alerts
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Top row - Key metrics */}
        <div className="col-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard 
              label="Total Global Rack Capacity" 
              value="1,230 Racks" 
              delta={3.2} 
              trend="up"
              status="success" 
            />
            <MetricCard 
              label="Infrastructure Utilization" 
              value="74.8%" 
              delta={1.5} 
              trend="up"
              status="neutral" 
            />
            <MetricCard 
              label="Pending Deployments" 
              value="43 Racks" 
              delta={-5} 
              trend="down"
              status="success" 
            />
            <MetricCard 
              label="Supply Chain Issues" 
              value="7 Active" 
              delta={2} 
              trend="up"
              status="error" 
            />
          </div>
        </div>
        
        {/* Second row - Capacity Trends chart and Rack Type Distribution pie chart */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">Global Capacity Trend</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Actual vs forecasted rack capacity (last 6 months)
              </p>
              <div className="h-80">
                <LineChart 
                  data={capacityTrendData} 
                  dataKey={['actual', 'forecast']} 
                  xAxisKey="name" 
                  height={320}
                  tooltipFormatter={(value, name) => {
                    // Format the value as a string with the capitalized name
                    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                    return [`${value} racks`, formattedName];
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">Rack Type Distribution</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Current infrastructure by rack type
              </p>
              <div className="h-80">
                <PieChart 
                  data={rackTypeData} 
                  dataKey="value" 
                  nameKey="name" 
                  height={320} 
                  mode="deepDive"
                  labelFormatter={(entry) => `${entry.value}`} 
                  showLegend={true}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Critical Alerts Section (moved up) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-12"> 
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">
                  Critical Alerts
                </h6>
                <button className="px-3 py-1 border border-neutral-300 rounded-md text-sm font-medium text-primary-600 hover:bg-neutral-50">View All</button>
              </div>
              <div className="w-full overflow-x-auto">
                <AGDataTable 
                  columns={alertColumns} 
                  data={alertData} 
                  mode="deepDive" 
                  maxSummaryColumns={5}
                  maxRows={5}
                  height={300}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Infrastructure Distribution by Region */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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
          
          {/* Key Data Center Deployments Progress */}
          <div className="md:col-span-4">
            <div className="bg-white shadow-md rounded-lg p-4 h-full">
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-lg font-medium text-neutral-800">Key Deployment Progress</h6>
              </div>
              <p className="text-sm text-neutral-500 mb-4">
                Major data center expansion initiatives
              </p>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <ProgressTracker value={75} label="Frankfurt Expansion" status="success" mode="deepDive" />
                <ProgressTracker value={33} label="Singapore Phase 2" status="warning" mode="deepDive" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ProgressTracker value={90} label="NYC West Migration" status="warning" mode="deepDive" />
                <ProgressTracker value={15} label="London Retrofit" status="error" mode="deepDive" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Fifth Row - Logistics Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <LogisticsTable title="Incoming Rack Shipments" data={logisticsData1} showDeepDive={false} />
          </div>
          <div className="md:col-span-1">
            <LogisticsTable title="Warehouse Inventory & Allocation" data={logisticsData2} showDeepDive={true} />
          </div>
        </div>

      </div>
      
      {/* Contact Detail Modal */}
      {currentAlertForContacts && (
        <Modal
          isOpen={isContactModalOpen}
          onClose={handleCloseContactModal}
          title={`${currentAlertForContacts.sctId}: ${currentAlertForContacts.message}`}
          size="lg"
          footer={
            <div className="flex justify-between items-center w-full">
              <Button variant="outline" size="sm" onClick={handleCloseContactModal}>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark Issue as Resolved
                </div>
              </Button>
              <Button variant="primary" size="sm">Send</Button>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Collapsible Contact Information Section */}
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <div 
                className="bg-neutral-50 p-3 flex justify-between items-center cursor-pointer"
                onClick={() => {
                  const contactsEl = document.getElementById('contacts-section');
                  if (contactsEl) {
                    contactsEl.classList.toggle('hidden');
                  }
                }}
              >
                <h4 className="text-sm font-medium text-neutral-700">Key Contacts ({currentAlertForContacts.contacts.length})</h4>
                <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div id="contacts-section" className="p-3 border-t border-neutral-200 hidden">
                <div className="grid grid-cols-2 gap-4">
                  {currentAlertForContacts.contacts.map((contact, index) => (
                    <div key={index} className="bg-white p-2 rounded border border-neutral-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{contact.name}</p>
                          <p className="text-xs text-neutral-500">{contact.role}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            className="text-primary-600 hover:text-primary-700"
                            onClick={() => window.location.href = `mailto:${contact.email}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button 
                            className="text-primary-600 hover:text-primary-700"
                            onClick={() => window.location.href = `tel:${contact.phone}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Issue Details */}
            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-neutral-500">Location</p>
                  <p className="text-sm font-medium">{currentAlertForContacts.location}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Reported</p>
                  <p className="text-sm font-medium">{currentAlertForContacts.timestamp}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Status</p>
                  <p className={`text-sm font-medium ${
                    currentAlertForContacts.severity === 'critical' ? 'text-red-600' : 
                    currentAlertForContacts.severity === 'warning' ? 'text-yellow-600' : 
                    'text-blue-600'
                  }`}>
                    {currentAlertForContacts.severity.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Chat History */}
            <div className="border border-neutral-200 rounded-lg">
              <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                <h4 className="text-sm font-medium text-neutral-700">Resolution Log</h4>
              </div>
              <div 
                className="p-3 max-h-60 overflow-y-auto scrollbar-hide" 
                style={{ 
                  minHeight: "240px"
                }}
              >
                {/* Example messages - you can replace with actual data */}
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-blue-700">
                        {currentAlertForContacts.contacts[0]?.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">{currentAlertForContacts.contacts[0]?.name}</p>
                        <p className="text-xs text-neutral-500">{new Date().toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">Initial assessment: {currentAlertForContacts.message}. Investigating root cause.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-neutral-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-neutral-700">ME</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">You</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 300000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">What&apos;s the current impact on operations?</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-green-700">
                        {currentAlertForContacts.contacts[1]?.name.split(' ').map(n => n[0]).join('') || 'BB'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">{currentAlertForContacts.contacts[1]?.name || 'Bob The Builder'}</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 240000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">Currently minimal impact. Redundant systems have kicked in. Load balancing is working as expected.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-blue-700">
                        {currentAlertForContacts.contacts[0]?.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">{currentAlertForContacts.contacts[0]?.name}</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 180000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">Confirmed. We&apos;ve temporarily rerouted workloads from affected racks. Facilities team is en route to assess hardware.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-purple-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-purple-700">FM</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">Facilities Manager</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 120000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">On-site now. Initial inspection shows potential issues with PDU-3. Running full diagnostics.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-neutral-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-neutral-700">ME</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">You</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 90000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">Do we need to notify the business units? Any SLA impacts expected?</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-green-700">
                        {currentAlertForContacts.contacts[1]?.name.split(' ').map(n => n[0]).join('') || 'BB'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">{currentAlertForContacts.contacts[1]?.name || 'Bob The Builder'}</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 60000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">No SLA breach expected. Current capacity is sufficient. Will send comms update in 30 mins if situation changes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-orange-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-orange-700">VE</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">Vendor Engineer</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 30000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">Remote diagnostics complete. Replacement PDU unit available in local inventory. ETA for swap: 45 minutes.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-blue-100 w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-blue-700">
                        {currentAlertForContacts.contacts[0]?.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-medium text-neutral-700">{currentAlertForContacts.contacts[0]?.name}</p>
                        <p className="text-xs text-neutral-500">{new Date(Date.now() - 10000).toLocaleTimeString()}</p>
                      </div>
                      <div className="mt-1 p-2 bg-neutral-100 rounded-lg">
                        <p className="text-sm">Excellent. Maintenance window approved. Will coordinate with NOC for planned failover during PDU replacement.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t border-neutral-200">
              <div className="mb-2">
                <input 
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button className="text-neutral-500 hover:text-neutral-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="text-neutral-500 hover:text-neutral-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardView;
