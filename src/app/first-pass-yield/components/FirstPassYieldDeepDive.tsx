'use client';

import React from 'react';
import { Card } from '@/app/components/design-system';
import { DataTable, AGColumnDef } from '@/app/components/design-system/DataTable';
import { RackData, rackData } from './mockData';

export default function FirstPassYieldDeepDive() {
  // Simplified columns for deep dive
  const rackColumns: AGColumnDef<RackData>[] = [
    { field: 'id', title: 'ID', width: 100 },
    { field: 'name', title: 'Rack Name', width: 120 },
    { field: 'station', title: 'Station', width: 120 },
    { field: 'status', title: 'Status', width: 120 },
  ];

  return (
    <Card className="p-4">
      <h6 className="text-lg font-medium text-neutral-800 mb-4">Deep Dive Analysis</h6>
      <div className="overflow-x-auto">
        <DataTable columns={rackColumns} data={rackData} mode="deepDive" maxRows={15} />
      </div>
    </Card>
  );
} 