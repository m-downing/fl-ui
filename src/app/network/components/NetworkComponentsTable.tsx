import React from 'react';
import { 
  Paper, 
  Typography, 
  Button
} from '@mui/material';
import RouterIcon from '@mui/icons-material/Router';
import WifiIcon from '@mui/icons-material/Wifi';
import StorageIcon from '@mui/icons-material/Storage';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import { NetworkComponent, networkComponents } from './mockData';

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

export const NetworkComponentsTable: React.FC = () => {
  return (
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
  );
}; 