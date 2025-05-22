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
import { DataTable, ColumnDef } from '@/app/components/design-system/DataTable';
import Modal from '@/app/components/design-system/Modal';
import Badge from '@/app/components/design-system/Badge';

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
const logisticsColumns: ColumnDef<LogisticsEntry>[] = [
  { key: 'id', title: 'ID', width: 80 },
  { key: 'rackName', title: 'Rack Name', width: 150 },
  { key: 'sku', title: 'SKU', width: 120 },
  { key: 'supplier', title: 'Supplier', width: 120 },
  { key: 'purchaseOrder', title: 'PO Number', width: 130 },
  { 
    key: 'status', 
    title: 'Status', 
    width: 120,
    cellRenderer: (row) => {
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
      return <Badge variant={badgeVariant}>{row.status}</Badge>;
    }
  },
  { key: 'currentLocation', title: 'Current Location', width: 150 },
  { key: 'estimatedDelivery', title: 'Est. Delivery', width: 130 },
  { key: 'actualDelivery', title: 'Actual Delivery', width: 130 },
  { 
    key: 'priority', 
    title: 'Priority', 
    width: 100,
    cellRenderer: (row) => {
      let badgeVariant: BadgeVariant;
      switch(row.priority) {
        case 'High': badgeVariant = 'critical'; break;
        case 'Medium': badgeVariant = 'highPriority'; break;
        case 'Low': badgeVariant = 'standard'; break;
        default: badgeVariant = 'standard';
      }
      return <Badge variant={badgeVariant}>{row.priority}</Badge>;
    }
  },
  { key: 'quantity', title: 'Qty', width: 70 },
  { key: 'assignedDc', title: 'Assigned DC', width: 120 },
  { key: 'trackingNumber', title: 'Tracking #', width: 140 },
  { key: 'notes', title: 'Notes', width: 200 },
  { key: 'lastUpdate', title: 'Last Update', width: 180, cellRenderer: (row) => new Date(row.lastUpdate).toLocaleString() },
];

// Mock data for capacity trend chart
const capacityTrendData: CapacityData[] = [
  { name: 'Jan', actual: 4200, forecast: 4000, remaining: 800 },
  { name: 'Feb', actual: 4800, forecast: 4500, remaining: 700 },
  { name: 'Mar', actual: 5200, forecast: 5000, remaining: 650 },
  { name: 'Apr', actual: 5500, forecast: 5200, remaining: 600 },
  { name: 'May', actual: 5800, forecast: 5600, remaining: 550 },
  { name: 'Jun', actual: 6200, forecast: 6000, remaining: 500 },
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
}

const LogisticsTable: React.FC<LogisticsTableProps> = ({ title, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const displayedColumns = isExpanded ? logisticsColumns : logisticsColumns.slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative block">
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-lg font-medium text-neutral-800 mb-6">{title}</h6>
        <div className="absolute top-3 right-3 overflow-hidden bg-white hover:bg-white rounded-md flex items-center w-16 h-7">
          <button 
            onClick={toggleExpand} 
            className="flex items-center w-full h-full relative"
          >
            <Image 
              src="/icons/ui/rocket.svg" 
              alt="Rocket" 
              className="w-7 h-5 absolute right-1"
              width={28}
              height={20}
            />
            <div className={`absolute inset-y-0 right-0 w-7 bg-white hover:bg-white flex justify-center items-center transition-transform duration-300 ${isExpanded ? '-translate-x-8 delay-120' : 'translate-x-0'}`}>
              <Image 
                src={isExpanded ? "/icons/ui/remove.svg" : "/icons/ui/expand_icon.svg"} 
                alt={isExpanded ? "Collapse" : "Expand"} 
                className="w-5 h-5"
                width={20}
                height={20}
              />
            </div>
          </button>
        </div>
      </div>
      <div className={isExpanded ? "overflow-x-auto scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-white" : "overflow-x-hidden"}>
        <DataTable
          columns={displayedColumns}
          data={data}
          mode="deepDive"
          maxRows={10}
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

  const alertColumns = useMemo((): ColumnDef<AlertItem>[] => [
    {
      key: 'severity',
      title: 'Severity',
      width: 120,
      cellRenderer: (row) => {
        let badgeVariant: BadgeVariant;
        switch(row.severity) {
          case 'critical': badgeVariant = 'critical'; break;
          case 'warning': badgeVariant = 'atRisk'; break;
          case 'update': badgeVariant = 'standard'; break;
          default: badgeVariant = 'standard';
        }
        return <Badge variant={badgeVariant}>{row.severity.toUpperCase()}</Badge>;
      }
    },
    {
      key: 'sctId',
      title: 'SCT ID',
      width: 100,
      cellRenderer: (row) => (
        <span 
          style={{ cursor: 'url(/icons/ui/paste.png) 16 16, auto' }}
          onClick={() => navigator.clipboard.writeText(row.sctId)}
          title="Copy SCT ID"
        >
          {row.sctId}
        </span>
      )
    },
    {
      key: 'message',
      title: 'Occurrence',
      width: 300,
      cellRenderer: (row) => row.message
    },
    {
      key: 'location',
      title: 'Location',
      width: 140,
      cellRenderer: (row) => row.location
    },
    {
      key: 'timestamp',
      title: 'Event Date',
      width: 180,
      cellRenderer: (row) => row.timestamp
    },
    {
      key: 'resolutionLog',
      title: 'Resolution Log',
      width: 140,
      align: "center",
      cellRenderer: (row) => (
        <div className="flex justify-center items-center">
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
    <div className="p-6 bg-neutral-50 min-h-screen">
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
                  <div className="flex items-center">
                    <span className="mr-2 text-yellow-500">⚠️</span>
                    Critical Alerts
                  </div>
                </h6>
                <button className="px-3 py-1 border border-neutral-300 rounded-md text-sm font-medium text-primary-600 hover:bg-neutral-50">View All</button>
              </div>
              <div className="w-full overflow-x-auto">
                <DataTable 
                  columns={alertColumns} 
                  data={alertData} 
                  mode="deepDive" 
                  maxRows={5}
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
            <LogisticsTable title="Incoming Rack Shipments" data={logisticsData1} />
          </div>
          <div className="md:col-span-1">
            <LogisticsTable title="Warehouse Inventory & Allocation" data={logisticsData2} />
          </div>
        </div>

      </div>
      
      {/* Contact Detail Modal */}
      {currentAlertForContacts && (
        <Modal
          isOpen={isContactModalOpen}
          onClose={handleCloseContactModal}
          title={`Contact Information for Alert: ${currentAlertForContacts.message.substring(0, 30)}${currentAlertForContacts.message.length > 30 ? '...' : ''}`}
          size="xl"
        >
          <div className="space-y-6 p-4">
            <h6 className="text-lg font-semibold text-neutral-800 mb-3 border-b border-neutral-200 pb-3">Key Contacts for: {currentAlertForContacts.location} - <span className={`${currentAlertForContacts.severity === 'critical' ? 'text-red-600' : currentAlertForContacts.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>{currentAlertForContacts.severity}</span></h6>
            {currentAlertForContacts.contacts.map((contact, index) => (
              <div key={index} className="bg-neutral-50 shadow-sm rounded-lg p-4 mb-4 border border-neutral-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <p className="text-xs font-medium text-neutral-500">Name</p>
                    <p className="text-sm font-semibold text-neutral-800">{contact.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-500">Role</p>
                    <p className="text-sm text-neutral-800">{contact.role}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-500">Email</p>
                    <p className="text-sm text-primary-600 hover:underline">
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-500">Phone</p>
                    <p className="text-sm text-neutral-800">{contact.phone}</p>
                  </div>
                </div>
              </div>
            ))}
            {currentAlertForContacts.contacts.length === 0 && (
              <p className="text-sm text-neutral-600">No specific contacts listed for this alert.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardView;
