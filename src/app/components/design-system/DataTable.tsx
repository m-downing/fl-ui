import React, { useRef, useEffect } from 'react';
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
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const customScrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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

  // Custom scrollbar functionality
  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const customScrollbar = customScrollbarRef.current;
    const thumb = thumbRef.current;
    
    if (!tableContainer || !customScrollbar || !thumb || mode === 'summary') return;

    const updateThumbPosition = () => {
      if (!tableContainer || !thumb || !customScrollbar) return;
      
      const { scrollWidth, clientWidth, scrollLeft } = tableContainer;
      const trackWidth = customScrollbar.clientWidth;
      
      // Only show scrollbar if content is wider than container
      if (scrollWidth <= clientWidth) {
        customScrollbar.style.display = 'none';
        return;
      } else {
        customScrollbar.style.display = 'block';
      }
      
      // Calculate thumb width - it should be proportional to the visible area
      const thumbWidthPercentage = (clientWidth / scrollWidth) * 100;
      thumb.style.width = `${Math.max(thumbWidthPercentage, 10)}%`; // Min 10% width
      
      // Calculate thumb position
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      const maxLeft = trackWidth - thumb.clientWidth;
      thumb.style.left = `${scrollPercentage * maxLeft}px`;
    };
    
    const onMouseDown = (e: MouseEvent) => {
      if (e.target !== thumb) return;
      
      e.preventDefault();
      isDragging.current = true;
      startX.current = e.clientX - thumb.getBoundingClientRect().left;
      scrollLeft.current = tableContainer.scrollLeft;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !tableContainer || !thumb || !customScrollbar) return;
      
      e.preventDefault();
      const x = e.clientX - customScrollbar.getBoundingClientRect().left;
      const walkX = x - startX.current;
      
      const trackWidth = customScrollbar.clientWidth;
      const thumbWidth = thumb.clientWidth;
      
      // Calculate how much to scroll
      const scrollRatio = (tableContainer.scrollWidth - tableContainer.clientWidth) / (trackWidth - thumbWidth);
      tableContainer.scrollLeft = scrollLeft.current + (walkX * scrollRatio);
    };
    
    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    // Update thumb on scroll
    tableContainer.addEventListener('scroll', updateThumbPosition);
    
    // Setup mouse events for dragging
    customScrollbar.addEventListener('mousedown', onMouseDown);
    
    // Initial update
    updateThumbPosition();
    
    // Clean up
    return () => {
      tableContainer.removeEventListener('scroll', updateThumbPosition);
      customScrollbar.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [mode]);

  const isAdvancedMode = mode === 'drilldown' || mode === 'deepDive';

  // The Badge component is used below. Ensure it is defined and imported if necessary.
  // For example: import { Badge } from '../components/Badge'; // Adjust path as needed

  return (
    <>
      {isAdvancedMode && (
        <div 
          ref={customScrollbarRef}
          className="relative h-2 mb-1 bg-gray-100 rounded cursor-pointer select-none"
          style={{ 
            marginLeft: '8px',
            marginRight: '8px',
            display: 'none', // Initially hidden, will be shown by JS if needed
          }}
        >
          <div 
            ref={thumbRef}
            className="absolute top-0 h-full bg-primary-200 rounded cursor-grab active:cursor-grabbing hover:bg-primary-300"
            style={{ left: 0 }}
          />
        </div>
      )}
      <div
        ref={tableContainerRef}
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
    </>
  );
} 