import React from 'react';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import Badge from '@/app/components/design-system/Badge';
// Assuming a Badge component might be available or needed later for full DataTable feature parity
// import { Badge } from '@/app/components/design-system'; 

// Define the BadgeVariant type based on the variants used in the application


// Sample Data Interface
interface ServerRackActivity {
  id: number;
  operator: string;
  action: string;
  timestamp: string;
  status: 'deployed' | 'in-transit' | 'failed' | 'ordered';
  details: string;
  dataCenter: string;
  region: string;
  rackCount: number;
  capacityValue: number;
}

// Sample Data
const sampleTableData: ServerRackActivity[] = [
  { id: 1, operator: 'john.smith@bank.com', action: 'Rack Deployment', timestamp: '2023-10-26 10:00:00', status: 'deployed', details: 'Compute rack deployment completed', dataCenter: 'NYC-EAST-12', region: 'NAM', rackCount: 5, capacityValue: 150.25 },
  { id: 2, operator: 'emily.parker@bank.com', action: 'Rack Decommission', timestamp: '2023-10-26 10:05:00', status: 'deployed', details: 'Legacy hardware removed from service', dataCenter: 'SG-CENTRAL-03', region: 'APAC', rackCount: 2, capacityValue: 0 },
  { id: 3, operator: 'carlos.mendez@bank.com', action: 'Capacity Addition', timestamp: '2023-10-26 10:15:23', status: 'in-transit', details: 'Additional storage racks en route...', dataCenter: 'LONDON-WEST-07', region: 'EMEA', rackCount: 10, capacityValue: 75.00 },
  { id: 4, operator: 'susan.sharma@bank.com', action: 'Deployment Error', timestamp: '2023-10-26 10:20:05', status: 'failed', details: 'Power distribution unit failure', dataCenter: 'FRANKFURT-01', region: 'EMEA', rackCount: 1, capacityValue: 10.50 },
  { id: 5, operator: 'thomas.weber@bank.com', action: 'Capacity Expansion', timestamp: '2023-10-26 10:30:50', status: 'deployed', details: 'High-density compute racks installed', dataCenter: 'NYC-WEST-08', region: 'NAM', rackCount: 23, capacityValue: 999.99 },
  { id: 6, operator: 'maria.gomez@bank.com', action: 'Infrastructure Request', timestamp: '2023-10-26 10:35:10', status: 'ordered', details: 'Network racks approved for Q4', dataCenter: 'PARIS-SOUTH-02', region: 'EMEA', rackCount: 8, capacityValue: 234.10 },
  { id: 7, operator: 'robert.chen@bank.com', action: 'Capacity Report', timestamp: '2023-10-26 10:40:00', status: 'deployed', details: 'Monthly inventory reconciliation', dataCenter: 'DALLAS-03', region: 'NAM', rackCount: 12, capacityValue: 0 },
  { id: 8, operator: 'sarah.johnson@bank.com', action: 'New Data Center', timestamp: '2023-10-26 10:45:30', status: 'in-transit', details: 'Initial infrastructure for Toronto facility', dataCenter: 'TORONTO-01', region: 'NAM', rackCount: 3, capacityValue: 500.00 },
  { id: 9, operator: 'james.wilson@bank.com', action: 'Deployment Failure', timestamp: '2023-10-26 10:50:15', status: 'failed', details: 'HVAC capacity insufficient', dataCenter: 'SYDNEY-04', region: 'APAC', rackCount: 1, capacityValue: 49.99 },
  { id: 10, operator: 'anna.kowalski@bank.com', action: 'Configuration Update', timestamp: '2023-10-26 10:55:00', status: 'deployed', details: 'Network topology revised', dataCenter: 'BERLIN-02', region: 'EMEA', rackCount: 7, capacityValue: 12.00 },
  { id: 11, operator: 'david.zhang@bank.com', action: 'Rack Maintenance', timestamp: '2023-10-26 11:00:00', status: 'deployed', details: 'Quarterly preventative maintenance completed', dataCenter: 'SINGAPORE-05', region: 'APAC', rackCount: 4, capacityValue: 0 },
  { id: 12, operator: 'lisa.muller@bank.com', action: 'Capacity Forecast', timestamp: '2023-10-26 11:05:30', status: 'ordered', details: 'Q1 2024 capacity planning submitted', dataCenter: 'CHICAGO-07', region: 'NAM', rackCount: 6, capacityValue: 1.50 },
  { id: 13, operator: 'michael.brown@bank.com', action: 'Inventory Transfer', timestamp: '2023-10-26 11:10:15', status: 'in-transit', details: 'Intra-region rack reallocation', dataCenter: 'MONTREAL-02', region: 'NAM', rackCount: 2, capacityValue: 25.00 },
  { id: 14, operator: 'sophia.garcia@bank.com', action: 'Rack Procurement', timestamp: '2023-10-26 11:15:00', status: 'ordered', details: 'New vendor equipment order placed', dataCenter: 'MANCHESTER-01', region: 'EMEA', rackCount: 1, capacityValue: 0 },
  { id: 15, operator: 'daniel.takahashi@bank.com', action: 'Power Upgrade', timestamp: '2023-10-26 11:20:45', status: 'in-transit', details: 'UPS systems shipping to Mumbai facility', dataCenter: 'MUMBAI-03', region: 'APAC', rackCount: 3, capacityValue: 5.00 },
];

// Column Definitions
const columns: AGColumnDef<ServerRackActivity>[] = [
  {
    field: 'operator',
    title: 'Operator',
    width: 220,
    summaryPriority: 1,
    statusAccessor: (row) => {
      if (row.status === 'failed') return 'error';
      if (row.status === 'in-transit') return 'warning';
      return 'success'; // deployed or ordered
    },
    cellRenderer: (row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.operator}</span>
        <span className="text-xs text-neutral-500">{row.region}</span>
      </div>
    )
  },
  {
    field: 'action',
    title: 'Action',
    width: 150,
    summaryPriority: 2,
  },
  {
    field: 'status',
    title: 'Status',
    width: 120,
    summaryPriority: 3,
    cellRenderer: (row) => {
      let variant: 'standard' | 'active' | 'ordered' | 'inTransit' | 'critical' = 'standard';
      switch (row.status) {
        case 'deployed': variant = 'active'; break;
        case 'ordered': variant = 'ordered'; break;
        case 'in-transit': variant = 'inTransit'; break;
        case 'failed': variant = 'critical'; break;
      }
      return <Badge variant={variant} size="small">{row.status.toUpperCase()}</Badge>;
    }
  },
  {
    field: 'timestamp',
    title: 'Timestamp',
    width: 180,
    summaryPriority: 4,
  },
  {
    field: 'capacityValue',
    title: 'Capacity (kW)',
    width: 120,
    summaryPriority: 5,
    cellRenderer: (row) => `${row.capacityValue.toFixed(2)} kW`
  },
  {
    field: 'rackCount',
    title: 'Rack Count',
    width: 100,
  },
  {
    field: 'dataCenter',
    title: 'Data Center',
    width: 150,
  },
  {
    field: 'details',
    title: 'Details',
    width: 300,
  },
];

export function TableShowcase() {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Data Center Infrastructure Tracking</h2>
        <div className="inline-flex items-center gap-0.5 text-xs border border-neutral-200 rounded px-2 py-1 hover:bg-neutral-50 cursor-pointer bg-neutral-100 mr-4">
          <svg 
            className="w-4 h-4" 
            fill="none"
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span className="font-semibold">README</span>
        </div>
      </div>

      <div className="mb-10 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm">
        <h3 className="text-xl font-medium text-neutral-700 mb-1">Recent Activity Dashboard</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Quick overview of recent server rack activities across all global data centers. 
          Color coding indicates status: green for successful deployments, yellow for in-transit equipment, red for failed operations.
        </p>
        <AGDataTable<ServerRackActivity> 
          columns={columns} 
          data={sampleTableData} 
          mode="summary" 
          maxSummaryColumns={5} 
          maxRows={10}
          height="auto"
        />
      </div>

      <div className="mb-10 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm">
        <h3 className="text-xl font-medium text-neutral-700 mb-1">Regional Capacity Analysis</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Regional breakdown of infrastructure deployments and capacity planning activities. 
          This view provides supply chain managers with deployment status across global regions.
        </p>
        <AGDataTable<ServerRackActivity> 
          columns={columns} 
          data={sampleTableData} 
          mode="drilldown" 
          maxRows={20}
          height={500}
        />
      </div>

      <div className="mb-10 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm">
        <h3 className="text-xl font-medium text-neutral-700 mb-1">Comprehensive Infrastructure Inventory</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Complete view of all rack infrastructure activities with full details. This comprehensive view helps supply chain analysts 
          track equipment from procurement through deployment and eventual decommissioning.
        </p>
        <AGDataTable<ServerRackActivity> 
          columns={columns} 
          data={sampleTableData} 
          mode="deepDive" 
          height={400}
        />
      </div>

      <p className="mt-10 text-xs text-neutral-500">
        The Data Center Infrastructure Tracking system provides global visibility into server rack deployments, 
        helping the Enterprise Technology department effectively manage data center capacity across the bank&apos;s global network.
        Supply chain operators can filter, sort, and export data for procurement planning and capacity forecasting.
      </p>
    </div>
  );
} 