import React from 'react';
import { 
  Paper, 
  Typography, 
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ScatterPlot } from '@/app/components/design-system/charts';
import { latencyData } from './mockData';

export const NetworkLatencyScatter: React.FC = () => {
  return (
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
  );
}; 