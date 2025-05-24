import React from 'react';
import { Paper, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LineChart, BarChart } from '@/app/components/design-system/charts';

// Updated to match ChartDataObject with name property
interface BacklogTrend {
  name: string;
  rackBacklogs: number;
  networkBacklogs: number;
  storageBacklogs: number;
  [key: string]: string | number;
}

// Updated to match ChartDataObject with name property
interface RegionalBacklog {
  name: string;
  backlogCount: number;
  resolvedCount: number;
  [key: string]: string | number;
}

interface BacklogAnalysisProps {
  backlogTrends: BacklogTrend[];
  regionalBacklogs: RegionalBacklog[];
}

const BacklogAnalysis: React.FC<BacklogAnalysisProps> = ({ backlogTrends, regionalBacklogs }) => {
  return (
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
              xAxisKey="name"
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
              xAxisKey="name"
              height={320}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default BacklogAnalysis; 