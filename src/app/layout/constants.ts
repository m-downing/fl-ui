// Define the common Dashboard tab that all apps will have
export const dashboardTab = {
  name: "Snapshot",
  icon: "ChartBarSquare"
};

// Define app-specific navigation tabs
export const appTabs = {
  'flow': [
    dashboardTab,
    { name: "Backlogs", icon: "ServerStack" },
    { name: "KPI's", icon: "Briefcase" },
    { name: "Network", icon: "Cloud" },
  ],
  helius: [dashboardTab],
  mimir: [dashboardTab],
  oculus: [dashboardTab]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
