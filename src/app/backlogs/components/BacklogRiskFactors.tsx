import React from 'react';
import { Paper, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const BacklogRiskFactors: React.FC = () => {
  return (
    <Paper className="p-4">
      <div className="flex justify-between items-center mb-2">
        <Typography variant="h6" className="font-medium">
          <div className="flex items-center">
            <WarningAmberIcon className="text-yellow-500 mr-2" fontSize="small" />
            Supply Chain Risk Factors
          </div>
        </Typography>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <Typography variant="subtitle2" className="text-error-700">Component Shortages</Typography>
          <Typography variant="body2" className="text-neutral-600 mt-1">
            Global shortage of specific processor models is affecting manufacturing of compute racks.
            Estimated impact: 15-20 day delay for high-performance servers.
          </Typography>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <Typography variant="subtitle2" className="text-warning-700">Shipping Delays</Typography>
          <Typography variant="body2" className="text-neutral-600 mt-1">
            Congestion at major Asian ports is affecting shipping times to NAM and EMEA regions.
            Average additional delay: 10-12 days for equipment from APAC manufacturers.
          </Typography>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <Typography variant="subtitle2" className="text-warning-700">Import Regulations</Typography>
          <Typography variant="body2" className="text-neutral-600 mt-1">
            New security regulations for network equipment in LATAM region require additional certification.
            Process adds approximately 18-25 days to customs clearance.
          </Typography>
        </div>
        
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <Typography variant="subtitle2" className="text-success-700">Manufacturing Capacity</Typography>
          <Typography variant="body2" className="text-neutral-600 mt-1">
            Primary storage equipment manufacturer has increased production capacity.
            Expected to reduce manufacturing delays by 30% starting next month.
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default BacklogRiskFactors; 