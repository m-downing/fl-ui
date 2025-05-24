import React from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Chip
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import { NetworkIncident, networkIncidents } from './mockData';

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

export const NetworkIncidents: React.FC = () => {
  return (
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
  );
}; 