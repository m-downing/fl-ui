import React from 'react';
import { 
  Paper, 
  Typography, 
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

export const NetworkCriticalPaths: React.FC = () => {
  return (
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
  );
}; 