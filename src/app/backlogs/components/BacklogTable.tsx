import React from 'react';
import { DataTable, ColumnDef } from '@/app/components/design-system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Define interfaces for backlogs data
export interface BacklogItem {
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

interface BacklogTableProps {
  data: BacklogItem[];
  height?: number;
}

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
      if (row.priority === 'medium') return 'success';
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

const BacklogTable: React.FC<BacklogTableProps> = ({ data, height = 300 }) => {
  return (
    <div className="w-full overflow-x-auto">
      <DataTable 
        columns={backlogColumns} 
        data={data} 
        mode="deepDive" 
        width="100%"
        height={height}
      />
    </div>
  );
};

export default BacklogTable; 