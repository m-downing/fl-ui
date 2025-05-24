import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import Badge from '@/app/components/design-system/Badge';
import TableToggle from '@/app/components/design-system/TableToggle';
import clsx from 'clsx';
import { LogisticsEntry, BadgeVariant } from './types';

// Helper function to generate mock logistics data
const generateLogisticsData = (count: number, prefix: string): LogisticsEntry[] => {
  const statuses: LogisticsEntry['status'][] = ['Ordered', 'Shipped', 'In Transit', 'Customs', 'Delivered', 'Delayed'];
  const priorities: LogisticsEntry['priority'][] = ['High', 'Medium', 'Low'];
  const suppliers = ['Dell', 'HPE', 'Supermicro', 'Lenovo', 'Cisco'];
  const locations = ['Factory A', 'Port of Shanghai', 'Mid-Atlantic', 'Customs LAX', 'Warehouse TX'];
  const dataCenters = ['NYC-01', 'LDN-02', 'FRA-03', 'SGP-04', 'SYD-05'];

  return Array.from({ length: count }, (_, i) => {
    const eta = new Date();
    eta.setDate(eta.getDate() + (i % 15) + 5); 
    const status = statuses[i % statuses.length];
    return {
      id: `${prefix}-${i + 1}`,
      rackName: `Rack Unit ${prefix}${i + 100}`,
      sku: `SKU-${(i % 20) + 1000}`,
      supplier: suppliers[i % suppliers.length],
      purchaseOrder: `PO-${prefix.toUpperCase()}${(i % 50) + 7000}`,
      status: status,
      currentLocation: status === 'Delivered' ? dataCenters[i % dataCenters.length] : locations[i % locations.length],
      estimatedDelivery: eta.toISOString().split('T')[0],
      actualDelivery: status === 'Delivered' ? eta.toISOString().split('T')[0] : undefined,
      priority: priorities[i % priorities.length],
      quantity: (i % 5) + 1,
      assignedDc: dataCenters[i % dataCenters.length],
      trackingNumber: `TRK-${prefix.toUpperCase()}${(i % 100) + 90000}`,
      notes: `Note for ${prefix}-${i + 1}`,
      lastUpdate: new Date().toISOString(),
    };
  });
};

// Generate logistics data for warehouse inventory
const logisticsData = generateLogisticsData(30, 'LOG2');

// Column definitions for logistics table
const logisticsColumns: AGColumnDef<LogisticsEntry>[] = [
  { 
    field: 'status', 
    title: 'Status', 
    width: 120,
    flex: 1,
    cellRenderer: (row: LogisticsEntry) => {
      let badgeVariant: BadgeVariant;
      switch(row.status) {
        case 'Delivered': badgeVariant = 'delivered'; break;
        case 'Ordered': badgeVariant = 'ordered'; break;
        case 'In Transit': badgeVariant = 'inTransit'; break;
        case 'Shipped': badgeVariant = 'readyToShip'; break;
        case 'Customs': badgeVariant = 'qualityTesting'; break;
        case 'Delayed': badgeVariant = 'delayed'; break;
        default: badgeVariant = 'standard';
      }
      return <Badge variant={badgeVariant} size="small">{row.status}</Badge>;
    }
  },
  { field: 'id', title: 'ID', width: 80, flex: 1 },
  { field: 'rackName', title: 'Rack Name', width: 150, flex: 1.5 },
  { field: 'sku', title: 'SKU', width: 120, flex: 1 },
  { field: 'supplier', title: 'Supplier', width: 120, flex: 1 },
  { field: 'purchaseOrder', title: 'PO Number', width: 130, flex: 1 },
  { field: 'currentLocation', title: 'Current Location', width: 150, flex: 1.5 },
  { field: 'estimatedDelivery', title: 'Est. Delivery', width: 130, flex: 1 },
  { field: 'actualDelivery', title: 'Actual Delivery', width: 130, flex: 1 },
  { 
    field: 'priority', 
    title: 'Priority', 
    width: 100,
    flex: 1,
    cellRenderer: (row: LogisticsEntry) => {
      let badgeVariant: BadgeVariant;
      switch(row.priority) {
        case 'High': badgeVariant = 'critical'; break;
        case 'Medium': badgeVariant = 'highPriority'; break;
        case 'Low': badgeVariant = 'standard'; break;
        default: badgeVariant = 'standard';
      }
      return <Badge variant={badgeVariant} size="small">{row.priority}</Badge>;
    }
  },
  { field: 'quantity', title: 'Qty', width: 70, flex: 0.5 },
  { field: 'assignedDc', title: 'Assigned DC', width: 120, flex: 1 },
  { field: 'trackingNumber', title: 'Tracking #', width: 140, flex: 1 },
  { field: 'notes', title: 'Notes', width: 200, flex: 2 },
  { field: 'lastUpdate', title: 'Last Update', width: 180, flex: 1.5, cellRenderer: (row: LogisticsEntry) => new Date(row.lastUpdate).toLocaleString() },
];

interface LogisticsTableProps {
  title: string;
  data?: LogisticsEntry[];
  showDeepDive?: boolean;
  deepDiveUrl?: string;
}

const LogisticsTable: React.FC<LogisticsTableProps> = ({ 
  title, 
  data = logisticsData, 
  showDeepDive = false, 
  deepDiveUrl 
}) => {
  const [mode, setMode] = useState<'summary' | 'drilldown' | 'deepDive'>('summary');
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Handler for opening deep dive in new tab
  const handleOpenDeepDiveInNewTab = useCallback(() => {
    if (deepDiveUrl) {
      window.open(deepDiveUrl, '_blank');
    }
  }, [deepDiveUrl]);
  
  // Effect to hide scrollbars after render
  useEffect(() => {
    // Use a timeout to ensure the AG Grid has fully rendered
    const timer = setTimeout(() => {
      if (tableRef.current) {
        // Find all scrollable elements within this table
        const scrollableElements = tableRef.current.querySelectorAll('.ag-body-viewport, .ag-center-cols-viewport');
        
        scrollableElements.forEach(element => {
          // Apply styles directly to hide vertical scrollbars
          if (element instanceof HTMLElement) {
            element.style.overflowY = 'auto';
            // Add an inline style element to hide scrollbars for this specific element
            const styleEl = document.createElement('style');
            const elementId = `scrollable-${Math.random().toString(36).substring(2, 11)}`;
            element.id = elementId;
            
            styleEl.textContent = `
              #${elementId}::-webkit-scrollbar:vertical {
                width: 0 !important;
                display: none !important;
              }
              #${elementId} {
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
              }
            `;
            document.head.appendChild(styleEl);
          }
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Create specific columns for warehouse table (without Status column and Priority first)
  const warehouseColumns: AGColumnDef<LogisticsEntry>[] = [
    { 
      field: 'priority', 
      title: 'Priority', 
      width: 100,
      flex: 1,
      cellRenderer: (row: LogisticsEntry) => {
        let badgeVariant: BadgeVariant;
        switch(row.priority) {
          case 'High': badgeVariant = 'critical'; break;
          case 'Medium': badgeVariant = 'highPriority'; break;
          case 'Low': badgeVariant = 'standard'; break;
          default: badgeVariant = 'standard';
        }
        return <Badge variant={badgeVariant} size="small">{row.priority}</Badge>;
      }
    },
    { field: 'id', title: 'ID', width: 80, flex: 1 },
    { field: 'rackName', title: 'Rack Name', width: 150, flex: 1.5 },
    { field: 'sku', title: 'SKU', width: 120, flex: 1 },
    { field: 'supplier', title: 'Supplier', width: 120, flex: 1 },
    { field: 'purchaseOrder', title: 'PO Number', width: 130, flex: 1 },
    { field: 'currentLocation', title: 'Current Location', width: 150, flex: 1.5 },
    { field: 'estimatedDelivery', title: 'Est. Delivery', width: 130, flex: 1 },
    { field: 'actualDelivery', title: 'Actual Delivery', width: 130, flex: 1 },
    { field: 'quantity', title: 'Qty', width: 70, flex: 0.5 },
    { field: 'assignedDc', title: 'Assigned DC', width: 120, flex: 1 },
    { field: 'trackingNumber', title: 'Tracking #', width: 140, flex: 1 },
    { field: 'notes', title: 'Notes', width: 200, flex: 2 },
    { field: 'lastUpdate', title: 'Last Update', width: 180, flex: 1.5, cellRenderer: (row: LogisticsEntry) => new Date(row.lastUpdate).toLocaleString() },
  ];

  // Determine which columns to use based on the table title
  const tableColumns = title === "Warehouse Inventory & Allocation" ? warehouseColumns : logisticsColumns;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative block">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-lg font-medium text-neutral-800">{title}</h6>
        <div className="absolute top-3 right-3">
          {/* For Warehouse table, add the deep dive external functionality */}
          {title === "Warehouse Inventory & Allocation" && deepDiveUrl ? (
            <div className="flex items-center">
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <button
                  className={clsx(
                    'px-4 py-2 text-sm font-medium',
                    mode === 'summary'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  )}
                  onClick={() => setMode('summary')}
                >
                  Summary
                </button>
                <button
                  className={clsx(
                    'px-4 py-2 text-sm font-medium border-l border-gray-300',
                    mode === 'drilldown'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  )}
                  onClick={() => setMode('drilldown')}
                >
                  Drill Down
                </button>
              </div>
              
              {/* Custom rocket button with tooltip */}
              <button
                className={clsx(
                  'ml-2 p-2 rounded-md',
                  mode === 'deepDive' ? 'bg-blue-100' : 'bg-transparent'
                )}
                onClick={() => handleOpenDeepDiveInNewTab()}
                title="Deep Dive (Opens in new tab)"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-1.5 3.24 0 4.5 1.26 1.5 3.24 1.5 4.5 0L12 18l3 3c1.26 1.5 3.24 1.5 4.5 0 1.5-1.26 1.5-3.24 0-4.5L16.5 13.5 21 9l-3-3-4.5 4.5L10.5 7.5 15 3l-3-3-4.5 4.5"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </button>
            </div>
          ) : (
            <TableToggle 
              mode={mode} 
              onChange={setMode} 
              showDeepDive={showDeepDive} 
            />
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto no-vertical-scrollbar" ref={tableRef}>
        <AGDataTable
          columns={tableColumns}
          data={data}
          mode={mode}
          maxSummaryColumns={10}
          maxRows={10}
          height={300}
          width="100%"
        />
      </div>
    </div>
  );
};

export default LogisticsTable; 