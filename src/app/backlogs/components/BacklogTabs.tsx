import React, { useState, useEffect } from 'react';
import { Paper, Box, Tab, Tabs } from '@mui/material';
import BacklogTable, { BacklogItem } from './BacklogTable';
import BacklogAnalysis from './BacklogAnalysis';
import BacklogRiskFactors from './BacklogRiskFactors';

// Tab panel component
function TabPanel(props: { children: React.ReactNode; value: number; index: number; }) {
  const { children, value, index, ...other } = props;

  // Only render content when the tab is active
  if (value !== index) {
    return <div role="tabpanel" hidden aria-labelledby={`backlog-tab-${index}`} />;
  }

  return (
    <div
      role="tabpanel"
      id={`backlog-tabpanel-${index}`}
      aria-labelledby={`backlog-tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 3 }}>
        {children}
      </Box>
    </div>
  );
}

// Mock data for backlog trends
const backlogTrends = [
  { name: 'Jun', rackBacklogs: 35, networkBacklogs: 18, storageBacklogs: 22 },
  { name: 'Jul', rackBacklogs: 42, networkBacklogs: 23, storageBacklogs: 25 },
  { name: 'Aug', rackBacklogs: 48, networkBacklogs: 28, storageBacklogs: 30 },
  { name: 'Sep', rackBacklogs: 52, networkBacklogs: 25, storageBacklogs: 32 },
  { name: 'Oct', rackBacklogs: 45, networkBacklogs: 22, storageBacklogs: 28 },
  { name: 'Nov', rackBacklogs: 38, networkBacklogs: 20, storageBacklogs: 24 }
];

// Mock data for regional backlogs
const regionalBacklogs = [
  { name: 'NAM', backlogCount: 28, resolvedCount: 35 },
  { name: 'EMEA', backlogCount: 22, resolvedCount: 30 },
  { name: 'APAC', backlogCount: 32, resolvedCount: 25 },
  { name: 'LATAM', backlogCount: 14, resolvedCount: 10 }
];

interface BacklogTabsProps {
  backlogItems: BacklogItem[];
}

const BacklogTabs: React.FC<BacklogTabsProps> = ({ backlogItems }) => {
  const [tabValue, setTabValue] = useState(0);
  const [tabsReady, setTabsReady] = useState(false);
  
  useEffect(() => {
    // Delay tabs rendering to avoid measurement issues
    const timer = setTimeout(() => {
      setTabsReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Render the tabs without scrolling
  const renderTabs = () => {
    if (!tabsReady) {
      return <div className="h-12 border-b border-neutral-200"></div>;
    }
    
    return (
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        aria-label="Backlog categories"
        variant="fullWidth"
      >
        <Tab label="All Backlogs" />
        <Tab label="Critical Backlogs" />
        <Tab label="Blocked Orders" />
        <Tab label="Analysis" />
      </Tabs>
    );
  };
  
  return (
    <Paper className="mb-6">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {renderTabs()}
      </Box>
      
      {/* All Backlogs Tab */}
      <TabPanel value={tabValue} index={0}>
        <BacklogTable data={backlogItems} />
      </TabPanel>
      
      {/* Critical Backlogs Tab */}
      <TabPanel value={tabValue} index={1}>
        <BacklogTable data={backlogItems.filter(item => item.priority === 'critical')} />
      </TabPanel>
      
      {/* Blocked Orders Tab */}
      <TabPanel value={tabValue} index={2}>
        <BacklogTable data={backlogItems.filter(item => item.status === 'blocked')} />
      </TabPanel>
      
      {/* Analysis Tab */}
      <TabPanel value={tabValue} index={3}>
        <BacklogAnalysis 
          backlogTrends={backlogTrends}
          regionalBacklogs={regionalBacklogs}
        />
        <div className="md:col-span-12 mt-4">
          <BacklogRiskFactors />
        </div>
      </TabPanel>
    </Paper>
  );
};

export default BacklogTabs; 