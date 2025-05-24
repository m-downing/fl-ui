import React from 'react';
import { 
  Paper, 
  Typography, 
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PieChart } from '@/app/components/design-system/charts';
import { networkEquipmentDistribution } from './mockData';

export const NetworkEquipmentDistribution: React.FC = () => {
  return (
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
  );
}; 