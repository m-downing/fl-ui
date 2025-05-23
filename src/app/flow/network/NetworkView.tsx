import React from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  IconButton, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import StorageIcon from '@mui/icons-material/Storage';
import RouterIcon from '@mui/icons-material/Router';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { 
  LineChart, 
  PieChart,
  MetricCard,
  ScatterPlot
} from '@/app/components/design-system/charts';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';

// Define interfaces for network data
// interface NetworkMetric {
//   name: string;
//   value: number;
//   target?: number;
// }

interface NetworkIncident {
  id: number;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  location: string;
  component: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

// interface NetworkConnection {
//   id: number;
//   source: string;
//   target: string;
//   status: 'active' | 'degraded' | 'down';
//   bandwidth: number;
//   latency: number;
//   packetLoss: number;
// }

interface NetworkUtilization {
  name: string;
  inbound: number;
  outbound: number;
  [key: string]: string | number; // Add index signature, changed from any
}

interface NetworkComponent {
  id: number;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'load_balancer';
  location: string;
  status: 'operational' | 'warning' | 'critical' | 'maintenance';
  utilization: number;
  lastUpdated: string;
}

// Mock data
const networkIncidents: NetworkIncident[] = [
  { 
    id: 1, 
    severity: 'critical', 
    message: 'Network switch failure detected', 
    location: 'NYC-EAST-12', 
    component: 'Core Switch A4',
    timestamp: '2023-10-30 09:15:22',
    status: 'active'
  },
  { 
    id: 2, 
    severity: 'warning', 
    message: 'Elevated packet loss on APAC-EMEA link', 
    location: 'SINGAPORE-03 to FRANKFURT-01', 
    component: 'WAN Link',
    timestamp: '2023-10-30 08:30:45',
    status: 'investigating'
  },
  { 
    id: 3, 
    severity: 'info', 
    message: 'Firmware update scheduled', 
    location: 'LONDON-WEST-07', 
    component: 'Security Appliances',
    timestamp: '2023-10-30 07:25:10',
    status: 'active'
  },
  { 
    id: 4, 
    severity: 'warning', 
    message: 'Bandwidth utilization above 80%', 
    location: 'NYC-WEST-08', 
    component: 'Internet Gateway',
    timestamp: '2023-10-29 18:45:33',
    status: 'active'
  },
  { 
    id: 5, 
    severity: 'critical', 
    message: 'Multiple firewall failures detected', 
    location: 'FRANKFURT-01', 
    component: 'Security Cluster',
    timestamp: '2023-10-29 15:20:18',
    status: 'resolved'
  },
];

const networkComponents: NetworkComponent[] = [
  { id: 1, name: 'Core Router A', type: 'router', location: 'NYC-EAST-12', status: 'operational', utilization: 62, lastUpdated: '2023-10-30 09:30:00' },
  { id: 2, name: 'Core Switch B', type: 'switch', location: 'NYC-EAST-12', status: 'operational', utilization: 58, lastUpdated: '2023-10-30 09:30:00' },
  { id: 3, name: 'Edge Firewall C', type: 'firewall', location: 'NYC-EAST-12', status: 'warning', utilization: 78, lastUpdated: '2023-10-30 09:30:00' },
  { id: 4, name: 'Load Balancer D', type: 'load_balancer', location: 'NYC-EAST-12', status: 'operational', utilization: 45, lastUpdated: '2023-10-30 09:30:00' },
  { id: 5, name: 'Core Router A', type: 'router', location: 'LONDON-WEST-07', status: 'operational', utilization: 55, lastUpdated: '2023-10-30 09:25:00' },
  { id: 6, name: 'Core Switch B', type: 'switch', location: 'LONDON-WEST-07', status: 'maintenance', utilization: 0, lastUpdated: '2023-10-30 09:25:00' },
  { id: 7, name: 'Edge Firewall C', type: 'firewall', location: 'LONDON-WEST-07', status: 'operational', utilization: 72, lastUpdated: '2023-10-30 09:25:00' },
  { id: 8, name: 'Core Router A', type: 'router', location: 'SINGAPORE-03', status: 'critical', utilization: 94, lastUpdated: '2023-10-30 09:20:00' },
  { id: 9, name: 'Core Switch B', type: 'switch', location: 'SINGAPORE-03', status: 'operational', utilization: 65, lastUpdated: '2023-10-30 09:20:00' },
  { id: 10, name: 'Edge Firewall C', type: 'firewall', location: 'SINGAPORE-03', status: 'operational', utilization: 61, lastUpdated: '2023-10-30 09:20:00' },
];

const networkUtilizationData: NetworkUtilization[] = [
  { name: '00:00', inbound: 45, outbound: 32 },
  { name: '02:00', inbound: 38, outbound: 25 },
  { name: '04:00', inbound: 30, outbound: 20 },
  { name: '06:00', inbound: 35, outbound: 28 },
  { name: '08:00', inbound: 62, outbound: 55 },
  { name: '10:00', inbound: 78, outbound: 70 },
  { name: '12:00', inbound: 82, outbound: 73 },
  { name: '14:00', inbound: 85, outbound: 78 },
  { name: '16:00', inbound: 88, outbound: 80 },
  { name: '18:00', inbound: 75, outbound: 68 },
  { name: '20:00', inbound: 60, outbound: 52 },
  { name: '22:00', inbound: 50, outbound: 42 },
];

const networkEquipmentDistribution = [
  { name: 'Routers', value: 120 },
  { name: 'Switches', value: 220 },
  { name: 'Firewalls', value: 80 },
  { name: 'Load Balancers', value: 40 },
  { name: 'WAN Optimizers', value: 30 },
];

const latencyData = [
  { x: 35, y: 12, z: 120, name: 'NYC to London' },
  { x: 120, y: 24, z: 80, name: 'NYC to Tokyo' },
  { x: 80, y: 18, z: 100, name: 'London to Frankfurt' },
  { x: 140, y: 28, z: 70, name: 'London to Singapore' },
  { x: 95, y: 22, z: 90, name: 'Frankfurt to Tokyo' },
  { x: 60, y: 15, z: 110, name: 'NYC to Frankfurt' },
  { x: 175, y: 32, z: 60, name: 'Tokyo to Singapore' },
];

// Column definitions for incident table
const incidentColumns: AGColumnDef<NetworkIncident>[] = [
  {
    field: 'severity',
    title: 'Severity',
    width: 100,
    flex: 1,
    statusAccessor: (row) => {
      if (row.severity === 'critical') return 'error';
      if (row.severity === 'warning') return 'warning';
      return 'success';
    },
    cellRenderer: (row) => {
      let colorClass = '';
      switch (row.severity) {
        case 'critical': colorClass = 'text-red-600'; break;
        case 'warning': colorClass = 'text-yellow-600'; break;
        case 'info': colorClass = 'text-blue-600'; break;
      }
      return <span className={`font-semibold ${colorClass} px-2 py-1 rounded-full text-xs`}>{row.severity.toUpperCase()}</span>;
    }
  },
  {
    field: 'message',
    title: 'Issue',
    width: 250,
    flex: 2,
  },
  {
    field: 'location',
    title: 'Location',
    width: 180,
    flex: 1.5,
  },
  {
    field: 'status',
    title: 'Status',
    width: 120,
    flex: 1,
    cellRenderer: (row) => {
      let color = '';
      switch (row.status) {
        case 'active': color = 'error'; break;
        case 'investigating': color = 'warning'; break;
        case 'resolved': color = 'success'; break;
      }
      return (
        <Chip 
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} 
          size="small" 
          color={color as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
          className="capitalize"
        />
      );
    }
  },
  {
    field: 'timestamp',
    title: 'Timestamp',
    width: 150,
    flex: 1,
  }
];

// Column definitions for network components
const networkComponentColumns: AGColumnDef<NetworkComponent>[] = [
  {
    field: 'name',
    title: 'Name',
    width: 180,
    flex: 1.5,
    statusAccessor: (row) => {
      switch (row.status) {
        case 'critical': return 'error';
        case 'warning': return 'warning';
        case 'maintenance': return 'warning';
        default: return 'success';
      }
    },
    cellRenderer: (row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.name}</span>
        <span className="text-xs text-neutral-500">{row.location}</span>
      </div>
    )
  },
  {
    field: 'type',
    title: 'Type',
    width: 140,
    flex: 1,
    cellRenderer: (row) => {
      const typeIconMap = {
        router: <RouterIcon fontSize="small" className="mr-1" />,
        switch: <WifiIcon fontSize="small" className="mr-1" />,
        firewall: <WifiIcon fontSize="small" className="mr-1" />,
        load_balancer: <StorageIcon fontSize="small" className="mr-1" />
      };
      
      return (
        <div className="flex items-center">
          {typeIconMap[row.type]}
          <span className="capitalize">{row.type.replace('_', ' ')}</span>
        </div>
      );
    }
  },
  {
    field: 'status',
    title: 'Status',
    width: 140,
    flex: 1,
    cellRenderer: (row) => {
      let icon;
      let colorClass = '';
      
      switch (row.status) {
        case 'operational':
          icon = <CheckCircleOutlineIcon fontSize="small" className="text-success-500 mr-1" />;
          colorClass = 'text-success-500';
          break;
        case 'warning':
          icon = <WarningAmberIcon fontSize="small" className="text-warning-500 mr-1" />;
          colorClass = 'text-warning-500';
          break;
        case 'critical':
          icon = <ErrorOutlineIcon fontSize="small" className="text-error-500 mr-1" />;
          colorClass = 'text-error-500';
          break;
        case 'maintenance':
          icon = <WarningAmberIcon fontSize="small" className="text-neutral-500 mr-1" />;
          colorClass = 'text-neutral-500';
          break;
      }
      
      return (
        <div className={`flex items-center ${colorClass}`}>
          {icon}
          <span className="capitalize">{row.status}</span>
        </div>
      );
    }
  },
  {
    field: 'utilization',
    title: 'Utilization',
    width: 140,
    flex: 1,
    cellRenderer: (row) => {
      const getUtilizationColor = (value: number) => {
        if (value >= 80) return 'bg-error-500';
        if (value >= 70) return 'bg-warning-500';
        return 'bg-success-500';
      };
      
      return (
        <div className="flex items-center">
          <div className="w-24 bg-neutral-200 h-2 rounded-full mr-2">
            <div 
              className={`${getUtilizationColor(row.utilization)} h-2 rounded-full`} 
              style={{ width: `${row.utilization}%` }}
            ></div>
          </div>
          <span>{row.utilization}%</span>
        </div>
      );
    }
  },
  {
    field: 'lastUpdated',
    title: 'Last Updated',
    width: 150,
    flex: 1,
  }
];

export const NetworkView: React.FC = () => {
  // const [selectedIncident, setSelectedIncident] = useState<NetworkIncident | null>(null); // Removed as unused
  // const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false); // Removed as unused
  
  // const handleIncidentClick = (incident: NetworkIncident) => { // Removed as unused
  //   setSelectedIncident(incident);
  //   setIsIncidentModalOpen(true);
  // };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Typography variant="h4" className="font-semibold text-neutral-800">
            Network Infrastructure Monitoring
          </Typography>
          <Typography variant="body2" className="text-neutral-600">
            Real-time monitoring of global data center network connectivity and equipment
          </Typography>
        </div>
        <div className="flex items-center space-x-3">
          <Chip 
            label="Last updated: Just now" 
            size="small" 
            className="bg-neutral-100"
          />
          <Button 
            variant="contained" 
            color="primary" 
            className="bg-primary-600"
          >
            View Topology Map
          </Button>
        </div>
      </div>
      
      {/* Top row - Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <MetricCard 
            label="Network Uptime" 
            value="99.97%" 
            delta={0.02} 
            trend="up"
            status="success" 
          />
        </div>
        <div>
          <MetricCard 
            label="Avg. Network Latency" 
            value="12.8ms" 
            delta={-2.1} 
            trend="down"
            status="success" 
          />
        </div>
        <div>
          <MetricCard 
            label="Active Incidents" 
            value="4" 
            delta={2} 
            trend="up"
            status="error" 
          />
        </div>
        <div>
          <MetricCard 
            label="Bandwidth Utilization" 
            value="68.5%" 
            delta={4.3} 
            trend="up"
            status="warning" 
          />
        </div>
      </div>
      
      {/* Network Incidents */}
      <Paper className="p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h6" className="font-medium">
            <div className="flex items-center">
              <WarningAmberIcon className="text-yellow-500 mr-2" fontSize="small" />
              Network Incidents
            </div>
          </Typography>
          <Button size="small" variant="outlined">View All</Button>
        </div>
        <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
          Active and recent network infrastructure incidents
        </Typography>
        <div className="w-full overflow-x-auto">
          <AGDataTable 
            columns={incidentColumns} 
            data={networkIncidents} 
            mode="drilldown" 
            maxRows={5}
            height={300}
            width="100%"
          />
        </div>
      </Paper>
      
      {/* Network Utilization and Equipment Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-8">
          <Paper className="p-4 h-full">
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-medium">Network Bandwidth Utilization</Typography>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
            <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
              24-hour global network traffic pattern (Gbps)
            </Typography>
            <div className="h-80">
              <LineChart 
                data={networkUtilizationData} 
                dataKey={['inbound', 'outbound']} 
                xAxisKey="name" 
                height={320}
              />
            </div>
          </Paper>
        </div>
        <div className="md:col-span-4">
          <Paper className="p-4 h-full">
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-medium">Network Equipment Distribution</Typography>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
            <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
              Types of network equipment deployed
            </Typography>
            <div className="h-80">
              <PieChart 
                data={networkEquipmentDistribution} 
                dataKey="value" 
                nameKey="name" 
                height={320} 
                mode="deepDive"
              />
            </div>
          </Paper>
        </div>
      </div>
      
      {/* Datacenter Interconnect Latency and Network Components */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-6">
          <Paper className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-medium">Data Center Interconnect Latency</Typography>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
            <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
              WAN latency between global data centers (ms)
            </Typography>
            <div className="h-80">
              <ScatterPlot 
                data={latencyData} 
                xAxisKey="x" 
                yAxisKey="y" 
                zAxisKey="z" 
                nameKey="name" 
                height={320}
                xAxisProps={{ name: 'Distance (ms)', unit: 'ms' }}
                yAxisProps={{ name: 'Latency', unit: 'ms' }}
                zAxisProps={{ name: 'Bandwidth', range: [50, 150] }}
              />
            </div>
          </Paper>
        </div>
        
        <div className="md:col-span-6">
          <Paper className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Typography variant="h6" className="font-medium">Critical Path Status</Typography>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </div>
            <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
              Status of critical network paths between data centers
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SignalCellularAltIcon className="text-success-500" />
                </ListItemIcon>
                <ListItemText 
                  primary="NYC-EAST to LONDON-WEST" 
                  secondary="Latency: 76ms | Packet Loss: 0.02% | Status: Optimal" 
                />
                <Chip label="100%" color="success" size="small" className="ml-2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SignalCellularAltIcon className="text-success-500" />
                </ListItemIcon>
                <ListItemText 
                  primary="NYC-EAST to FRANKFURT" 
                  secondary="Latency: 89ms | Packet Loss: 0.03% | Status: Optimal" 
                />
                <Chip label="99.9%" color="success" size="small" className="ml-2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SignalCellularAltIcon className="text-warning-500" />
                </ListItemIcon>
                <ListItemText 
                  primary="LONDON-WEST to SINGAPORE" 
                  secondary="Latency: 172ms | Packet Loss: 0.5% | Status: Degraded" 
                />
                <Chip label="94.5%" color="warning" size="small" className="ml-2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SignalCellularAltIcon className="text-success-500" />
                </ListItemIcon>
                <ListItemText 
                  primary="FRANKFURT to SINGAPORE" 
                  secondary="Latency: 151ms | Packet Loss: 0.02% | Status: Optimal" 
                />
                <Chip label="99.8%" color="success" size="small" className="ml-2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SignalCellularAltIcon className="text-error-500" />
                </ListItemIcon>
                <ListItemText 
                  primary="SINGAPORE to TOKYO" 
                  secondary="Latency: 210ms | Packet Loss: 2.1% | Status: Critical" 
                />
                <Chip label="88.7%" color="error" size="small" className="ml-2" />
              </ListItem>
            </List>
          </Paper>
        </div>
      </div>
      
      {/* Network Component List */}
      <Paper className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h6" className="font-medium">Network Components</Typography>
          <Button size="small" variant="outlined">View All</Button>
        </div>
        <Typography variant="body2" className="text-sm text-neutral-500 mb-4">
          Status of critical network infrastructure equipment
        </Typography>
        <div className="w-full overflow-x-auto">
          <AGDataTable 
            columns={networkComponentColumns} 
            data={networkComponents} 
            mode="deepDive" 
            maxRows={5}
            height={300}
            width="100%"
          />
        </div>
      </Paper>
      
      {/* Incident Detail Modal - Removed as it's no longer reachable */}
      {/* {selectedIncident && (
        <Modal
          isOpen={isIncidentModalOpen}
          onClose={() => setIsIncidentModalOpen(false)}
          title={`${selectedIncident.severity.toUpperCase()} Network Incident`}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <Typography variant="subtitle2" className="text-neutral-600">Issue</Typography>
              <Typography variant="body1">{selectedIncident.message}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-neutral-600">Location</Typography>
              <Typography variant="body1">{selectedIncident.location}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-neutral-600">Affected Component</Typography>
              <Typography variant="body1">{selectedIncident.component}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-neutral-600">Status</Typography>
              <Chip 
                label={selectedIncident.status.charAt(0).toUpperCase() + selectedIncident.status.slice(1)} 
                color={
                  selectedIncident.status === 'active' ? 'error' : 
                  selectedIncident.status === 'investigating' ? 'warning' : 
                  'success'
                } 
              />
            </div>
            <div>
              <Typography variant="subtitle2" className="text-neutral-600">Detected At</Typography>
              <Typography variant="body1">{selectedIncident.timestamp}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className="text-neutral-600">Recommended Action</Typography>
              <Typography variant="body1">
                {selectedIncident.severity === 'critical' 
                  ? 'Immediate attention required. Network engineering team has been paged.'
                  : selectedIncident.severity === 'warning'
                    ? 'Monitor and investigate. Prepare failover systems if degradation continues.'
                    : 'For information only. No immediate action required.'
                }
              </Typography>
            </div>
          </div>
        </Modal>
      )} */}
    </div>
  );
};

export default NetworkView;
