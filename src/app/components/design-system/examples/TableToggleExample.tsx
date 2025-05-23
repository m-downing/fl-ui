import React, { useState } from 'react';
import { AGDataTable, AGColumnDef } from '../DataTable';
import TableToggle from '../TableToggle';

interface SampleData {
  id: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  value: number;
  change: number;
  lastUpdated: string;
}

const sampleData: SampleData[] = [
  { id: '1', name: 'Alpha Project', status: 'success', value: 125000, change: 5.2, lastUpdated: '2023-10-15' },
  { id: '2', name: 'Beta Service', status: 'warning', value: 76000, change: -2.1, lastUpdated: '2023-10-14' },
  { id: '3', name: 'Gamma Platform', status: 'error', value: 238000, change: -8.5, lastUpdated: '2023-10-13' },
  { id: '4', name: 'Delta System', status: 'success', value: 382000, change: 12.7, lastUpdated: '2023-10-12' },
  { id: '5', name: 'Epsilon Framework', status: 'success', value: 156000, change: 3.8, lastUpdated: '2023-10-11' },
];

const TableToggleExample: React.FC = () => {
  const [mode, setMode] = useState<'summary' | 'drilldown' | 'deepDive'>('summary');

  const columns: AGColumnDef<SampleData>[] = [
    {
      field: 'name',
      title: 'Project Name',
      statusAccessor: (row: SampleData) => row.status,
    },
    {
      field: 'value',
      title: 'Value',
      cellRenderer: (row: SampleData) => `$${row.value.toLocaleString()}`,
    },
    {
      field: 'change',
      title: 'Change',
      statusAccessor: (row: SampleData) => row.change > 0 ? 'success' : row.change < -5 ? 'error' : 'warning',
      cellRenderer: (row: SampleData) => `${row.change > 0 ? '+' : ''}${row.change}%`,
    },
    {
      field: 'lastUpdated',
      title: 'Last Updated',
    },
    {
      field: 'id',
      title: 'ID',
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Data Table with Toggle</h2>
      
      <TableToggle 
        mode={mode} 
        onChange={setMode} 
        showDeepDive={true} 
      />
      
      <AGDataTable 
        columns={columns}
        data={sampleData}
        mode={mode}
        maxRows={10}
      />
    </div>
  );
};

export default TableToggleExample; 