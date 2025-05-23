import React, { useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry, ICellRendererParams, RowClickedEvent, GridOptions } from 'ag-grid-enterprise';
import { AllCommunityModule } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

// Import AG Grid styles - using only theme-alpine
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

// Add statusAccessor to the ColDef interface
interface ExtendedColDef extends ColDef {
  statusAccessor?: (row: any) => 'success' | 'warning' | 'error';
}

export interface AGColumnDef<T = Record<string, unknown>> extends Omit<ColDef, 'field'> {
  field: string;
  title: string;
  statusAccessor?: (row: T) => 'success' | 'warning' | 'error';
  summaryPriority?: number; // Lower number = higher priority for summary mode
  cellRenderer?: (row: T) => React.ReactNode;
  width?: number;
}

export interface AGDataTableProps<T = Record<string, unknown>> {
  columns: AGColumnDef<T>[];
  data: T[];
  mode?: DetailLevel;
  maxSummaryColumns?: number;
  maxRows?: number;
  height?: number | string;
  width?: number | string;
  onRowClick?: (data: T) => void;
}

// Extended ICellRendererParams with our custom properties
interface CustomCellRendererParams extends ICellRendererParams {
  mode?: DetailLevel;
  colDef?: ExtendedColDef;
}

// Status cell renderer for different modes
const StatusCellRenderer = (params: CustomCellRendererParams) => {
  const { value, data, colDef } = params;
  const mode = params.mode || 'summary';
  
  // Safely access statusAccessor with proper type checking
  const statusAccessor = colDef?.statusAccessor;
  
  if (!statusAccessor || !data) return value;
  
  const status = statusAccessor(data);
  const statusColors = {
    success: '#10B981',
    warning: '#F59E0B', 
    error: '#EF4444'
  };

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 12px'
  };

  switch (mode) {
    case 'summary':
      // Row-level status indicator via left border
      return (
        <div style={{
          ...baseStyle,
          borderLeft: `4px solid ${statusColors[status]}`,
          marginLeft: '-12px',
          paddingLeft: '16px'
        }}>
          {value}
        </div>
      );
      
    case 'drilldown':
      // Cell-level status border
      return (
        <div style={{
          ...baseStyle,
          borderLeft: `3px solid ${statusColors[status]}`,
          marginLeft: '-12px',
          paddingLeft: '15px'
        }}>
          {value}
        </div>
      );
      
    case 'deepDive':
      // Badge-style indicator
      return (
        <div style={{ ...baseStyle, gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: statusColors[status]
          }} />
          {value}
        </div>
      );
      
    default:
      return value;
  }
};

export function AGDataTable<T = Record<string, unknown>>({
  columns,
  data,
  mode = 'summary',
  maxSummaryColumns = 5,
  maxRows,
  height = 400,
  width = '100%',
  onRowClick
}: AGDataTableProps<T>) {
  const gridRef = useRef<AgGridReact>(null);
  const gridApiRef = useRef<GridApi | null>(null);

  // Convert your column definitions to AG Grid format
  const columnDefs = useMemo(() => {
    let visibleColumns = [...columns];

    // Filter columns based on mode
    if (mode === 'summary') {
      visibleColumns = columns
        .sort((a, b) => (a.summaryPriority || 999) - (b.summaryPriority || 999))
        .slice(0, maxSummaryColumns);
    }

    return visibleColumns.map((col): ColDef => {
      const { field, title, statusAccessor, cellRenderer, ...restColProps } = col;
      
      // Determine which cell renderer to use
      let renderer;
      if (statusAccessor) {
        renderer = StatusCellRenderer;
      } else if (cellRenderer) {
        // Convert our row-based renderer to AG Grid params-based renderer
        renderer = (params: any) => cellRenderer(params.data);
      }
      
      return {
        field,
        headerName: title,
        width: typeof col.width === 'number' ? col.width : undefined,
        minWidth: mode === 'summary' ? 120 : 100,
        flex: mode === 'summary' ? 1 : undefined,
        resizable: mode !== 'summary',
        sortable: true,
        filter: mode !== 'summary',
        headerTooltip: title,
        
        // Set the renderer
        cellRenderer: renderer,
        cellRendererParams: {
          statusAccessor,
          mode // Pass the mode to the cell renderer
        },
        
        // Apply any other column config
        ...restColProps
      };
    });
  }, [columns, mode, maxSummaryColumns]);

  // Base grid options
  const animateRows = true;
  const headerHeight = 40;
  const rowHeight = 45;
  const suppressHorizontalScroll = mode === 'summary';
  const suppressColumnVirtualisation = mode === 'summary';
  const rowClass = mode === 'summary' ? 'summary-row' : undefined;
  
  // Pagination settings based on maxRows
  const pagination = mode !== 'summary' || !!maxRows;
  const paginationPageSize = maxRows || (mode === 'deepDive' ? 50 : 25);
  const paginationPageSizeSelector = maxRows 
    ? [maxRows, maxRows * 2, maxRows * 4] 
    : (mode === 'deepDive' ? [50, 100, 200] : [25, 50, 100]);

  // Additional settings based on mode
  const domLayout = mode === 'summary' ? 'autoHeight' as const : undefined;
  const cellSelection = mode === 'deepDive';
  const sideBar = mode === 'deepDive' ? { toolPanels: ['columns', 'filters'] } : undefined;
  
  // Updated selection configuration for AG Grid v32+
  const rowSelection = useMemo(() => {
    if (mode === 'summary') {
      return {
        mode: 'singleRow' as const,
        enableClickSelection: !onRowClick
      };
    } else {
      return {
        mode: 'multiRow' as const,
        enableClickSelection: !onRowClick
      };
    }
  }, [mode, onRowClick]);
  
  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridApiRef.current = params.api;
    
    if (mode === 'summary') {
      params.api.sizeColumnsToFit();
    }
  }, [mode]);

  const onRowClicked = useCallback((event: any) => {
    if (onRowClick) {
      onRowClick(event.data);
    }
  }, [onRowClick]);

  return (
    <div 
      className="ag-theme-alpine"
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        onRowClicked={onRowClicked}
        
        // Base settings
        animateRows={animateRows}
        headerHeight={headerHeight}
        rowHeight={rowHeight}
        suppressHorizontalScroll={suppressHorizontalScroll}
        suppressColumnVirtualisation={suppressColumnVirtualisation}
        rowClass={rowClass}
        
        // Updated selection configuration (v32+ format)
        rowSelection={rowSelection}
        
        // Theme - use legacy mode since we're using CSS files
        theme="legacy"
        
        // Pagination
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        
        // Mode specific options
        domLayout={domLayout}
        cellSelection={cellSelection}
        sideBar={sideBar}
      />
      
      <style jsx>{`
        .summary-row {
          cursor: ${onRowClick ? 'pointer' : 'default'};
        }
        .summary-row:hover {
          background-color: #f8fafc !important;
        }
      `}</style>
    </div>
  );
}

// For backward compatibility
export const DataTable = AGDataTable;

// Define a stronger type for our example data
interface RackData {
  rackId: string;
  datacenter: string;
  utilization: number;
  location: string;
  vendor: string;
  overallStatus: 'success' | 'warning' | 'error';
  installDate: string;
  powerUsage: number;
  temperature: number;
}

// Example usage for rack logistics:
export const RackLogisticsTable = () => {
  const rackColumns: AGColumnDef<RackData>[] = [
    {
      field: 'rackId',
      title: 'Rack ID',
      summaryPriority: 1,
      pinned: 'left',
      statusAccessor: (row) => row.overallStatus,
    },
    {
      field: 'datacenter',
      title: 'Data Center',
      summaryPriority: 2,
    },
    {
      field: 'utilization',
      title: 'Utilization %',
      summaryPriority: 3,
      statusAccessor: (row) => 
        row.utilization > 90 ? 'error' : 
        row.utilization > 75 ? 'warning' : 'success',
      valueFormatter: (params) => `${params.value}%`,
    },
    {
      field: 'location',
      title: 'Location',
      summaryPriority: 4,
    },
    {
      field: 'vendor',
      title: 'Vendor',
      summaryPriority: 5,
    },
    // Additional columns for drilldown/deepDive
    {
      field: 'installDate',
      title: 'Install Date',
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'powerUsage',
      title: 'Power Usage (kW)',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'temperature',
      title: 'Temperature (°C)',
      filter: 'agNumberColumnFilter',
      statusAccessor: (row) =>
        row.temperature > 35 ? 'error' :
        row.temperature > 30 ? 'warning' : 'success',
    },
  ];

  const [mode, setMode] = React.useState<DetailLevel>('summary');
  const [rackData] = React.useState<RackData[]>([
    {
      rackId: 'R-NYC-001',
      datacenter: 'NYC Primary',
      utilization: 85,
      location: 'Floor 2, Aisle A',
      vendor: 'Dell',
      overallStatus: 'warning',
      installDate: '2023-01-15',
      powerUsage: 12.5,
      temperature: 28,
    },
    // ... more rack data
  ]);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => setMode('summary')}
          style={{ 
            marginRight: '8px',
            padding: '8px 16px',
            backgroundColor: mode === 'summary' ? '#3B82F6' : '#E5E7EB',
            color: mode === 'summary' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Summary
        </button>
        <button 
          onClick={() => setMode('drilldown')}
          style={{ 
            marginRight: '8px',
            padding: '8px 16px',
            backgroundColor: mode === 'drilldown' ? '#3B82F6' : '#E5E7EB',
            color: mode === 'drilldown' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Drill Down
        </button>
        <button 
          onClick={() => setMode('deepDive')}
          style={{ 
            padding: '8px 16px',
            backgroundColor: mode === 'deepDive' ? '#3B82F6' : '#E5E7EB',
            color: mode === 'deepDive' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Deep Dive
        </button>
      </div>

      <AGDataTable
        columns={rackColumns}
        data={rackData}
        mode={mode}
        height={mode === 'summary' ? 'auto' : 500}
        onRowClick={(data) => console.log('Clicked rack:', data)}
      />
    </div>
  );
};