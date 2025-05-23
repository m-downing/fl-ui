"use client";

import React from 'react';
import { AGDataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import Badge from '@/app/components/design-system/Badge';

// Define BadgeVariant type to match what's in the Badge component
type BadgeVariant = 
  // Supply Chain Status Badges
  | 'planned'
  | 'ordered'
  | 'manufacturing'
  | 'qualityTesting'
  | 'readyToShip'
  | 'inTransit'
  | 'delivered'
  | 'installing'
  | 'active'
  | 'maintenance'
  | 'delayed'
  // Priority/Risk Badges
  | 'critical'
  | 'highPriority'
  | 'standard'
  | 'atRisk';

// LogisticsEntry interface
interface LogisticsEntry {
  id: string;
  rackName: string;
  sku: string;
  supplier: string;
  purchaseOrder: string;
  status: 'Ordered' | 'Shipped' | 'In Transit' | 'Customs' | 'Delivered' | 'Delayed';
  currentLocation: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  priority: 'High' | 'Medium' | 'Low';
  quantity: number;
  assignedDc: string;
  trackingNumber: string;
  notes: string;
  lastUpdate: string;
}

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

// Create a large dataset for the deep dive view
const warehouseInventoryData = generateLogisticsData(100, 'LOG2');

// Column definitions for warehouse inventory table
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

const WarehouseDeepDive: React.FC = () => {
  return (
    <div className="px-6 py-8 pb-16 bg-neutral-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-2xl font-semibold text-neutral-800">
            Warehouse Inventory & Allocation - Deep Dive
          </h4>
          <p className="text-sm text-neutral-600">
            Complete inventory with full details and no row limitations
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-white">
          <AGDataTable
            columns={warehouseColumns}
            data={warehouseInventoryData}
            mode="deepDive"
            height={600}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeepDive; 