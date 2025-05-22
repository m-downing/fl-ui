import React from 'react';
import { tableTokens } from './tokens/tableTokens';
import { chartTokens } from './tokens/charts';
import clsx from 'clsx';

type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

export interface ColumnDef<Row> {
  key: string;
  title: string;
  align?: 'left'|'center'|'right';
  width?: number|string;
  statusAccessor?: (row: Row) => 'success'|'warning'|'error';
  cellRenderer?: (row: Row) => React.ReactNode;
}

export interface DataTableProps<Row> {
  columns: ColumnDef<Row>[];
  data: Row[];
  mode?: DetailLevel;
  maxColumns?: number;
  maxRows?: number; 
  width?: number|string;
  height?: number|string;
}

export function DataTable<Row>({ 
  columns,
  data,
  mode = 'summary',
  maxColumns,
  maxRows = 10,
  width,
  height,
}: DataTableProps<Row>) {
  // 1️⃣ Column slicing
  let visibleCols = columns;
  if (mode === 'summary') {
    visibleCols = columns.slice(0, maxColumns ?? 5);
  } else if (mode === 'drilldown') {
    visibleCols = columns;
  }

  // 2️⃣ Row slicing / virtualization - NO LONGER SLICING displayData for scrolling purposes.
  // displayData will be the full dataset. Scrolling handled by container overflow.
  const displayData = data; // Always use the full data

  // 3️⃣ Scroll container sizing
  const headerHeightNum = parseInt(tableTokens.header.height, 10);
  const rowHeightNum = parseInt(tableTokens.row.height, 10);

  let calculatedHeight: number | string;
  if (typeof height !== 'undefined') {
    // If an explicit height prop is provided, use it.
    calculatedHeight = height;
  } else {
    // Otherwise, calculate height dynamically based on maxRows or actual data length if shorter.
    // This will apply to all modes (summary, drilldown, deepDive) when an explicit height is not set.
    const numRowsForSizing = Math.min(data.length, maxRows); // maxRows defaults to 10 or uses passed prop
    calculatedHeight = headerHeightNum + numRowsForSizing * rowHeightNum;
  }

  // The Badge component is used below. Ensure it is defined and imported if necessary.
  // For example: import { Badge } from '../components/Badge'; // Adjust path as needed

  return (
    <div
      className={clsx(
        "data-table-scroll-container"
      )}
      style={{
        width,
        height: typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight,
        border: tableTokens.container.border,
        borderRadius: tableTokens.container.borderRadius,
        boxShadow: tableTokens.container.shadow,
        overflowY: 'auto',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{
          background: tableTokens.header.bg,
          color: tableTokens.header.color,
          fontSize: tableTokens.header.fontSize,
          fontWeight: tableTokens.header.fontWeight,
          height: tableTokens.header.height,
          borderBottom: tableTokens.header.border,
          position: 'sticky', // Keep header visible during scroll
          top: 0,             // Required for sticky positioning
          zIndex: 1,          // Ensure header is above body content during scroll
        }}>
          <tr>
            {visibleCols.map(col => (
              <th
                key={col.key}
                style={{
                  textAlign: col.align || 'left',
                  padding: '0.75rem 1.5rem',
                  width: col.width,
                }}
              >
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {col.title}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {displayData.map((row, rowIndex) => {
            // Determine row-level status for Prong 1 summary highlight
            const rowStatus = visibleCols[0].statusAccessor?.(row);
            
            // MODIFIED: rowBg will now only handle zebra striping.
            // Status for summary mode will be handled by a left border on the first cell.
            const rowBg = rowIndex % 2 === 0 ? undefined : tableTokens.row.zebraBg;

            // NEW: Determine border for the first cell in summary mode
            const firstCellBorderLeft =
              mode === 'summary' && rowStatus
                ? `6px solid ${chartTokens.status[rowStatus]}`
                : undefined;

            return (
              <tr
                key={rowIndex}
                className={clsx({
                  'hover:bg-gray-100': !rowBg, // Example hover, replace with token: tableTokens.row.hoverBg
                })}
                style={{
                  height: tableTokens.row.height,
                  backgroundColor: rowBg, // Now only for zebra striping
                  borderBottom: tableTokens.row.borderBottom,
                }}
              >
                {visibleCols.map((col, colIndex) => {
                  const cellValue = (row as Record<string, React.ReactNode>)[col.key];
                  
                  // Determine cell-specific border (used for drilldown, and now first cell of summary)
                  let cellBorderLeft: string | undefined = undefined;
                  if (colIndex === 0 && mode === 'summary' && firstCellBorderLeft) {
                    cellBorderLeft = firstCellBorderLeft;
                  } else {
                    const cellStatus = col.statusAccessor?.(row); // Keep this for drilldown and deepDive
                    if (mode === 'drilldown' && cellStatus) {
                      cellBorderLeft = `6px solid ${chartTokens.status[cellStatus]}`;
                    }
                  }

                  const cellStyle: React.CSSProperties = {
                    padding: '0.75rem 1.5rem',
                    fontSize: tableTokens.row.fontSize,
                    color: tableTokens.row.color,
                    borderLeft: cellBorderLeft,
                    textAlign: col.align || 'left',
                  };

                  // cellRenderer override
                  if (col.cellRenderer) {
                    return (
                      <td key={col.key} style={cellStyle}>
                        <div style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {col.cellRenderer(row)}
                        </div>
                      </td>
                    );
                  }
                  
                  // For deepDive, wrap in a Badge (existing logic)
                  if (mode === 'deepDive' && col.statusAccessor?.(row)) {
                    return (
                      <td key={col.key} style={cellStyle}>
                        <div style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span>{cellValue}</span>
                        </div>
                      </td>
                    );
                  }

                  return (
                    <td key={col.key} style={cellStyle}>
                      <div style={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cellValue}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
} 