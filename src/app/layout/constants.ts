// Define the common Dashboard tab that all apps will have
export const dashboardTab = {
  name: "Snapshot",
  icon: "/icons/ui/performance.svg"
};

// Define app-specific navigation tabs
export const appTabs = {
  'flow': [
    dashboardTab,
    { name: "Backlogs", icon: "/icons/vertical-nav/database.svg" },
    { name: "KPI's", icon: "/icons/ui/indicator.svg" },
    { name: "Network", icon: "/icons/vertical-nav/system-cloud.svg" },
  ],
  helius: [dashboardTab],
  mimir: [dashboardTab],
  oculus: [dashboardTab]
};

// Legacy export for backward compatibility
export const navTabs = appTabs['flow'];
