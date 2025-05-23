import React, { ReactNode, useState, useRef, useEffect } from 'react';
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis, // For bubble charts, if needed
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartTokens } from '../tokens/charts';
import { typography } from '../tokens/typography';

/**
 * @typedef ScatterDataObject
 * @property {number} x - Value for the X-axis.
 * @property {number} y - Value for the Y-axis.
 * @property {number} [z] - Value for the Z-axis (e.g., bubble size).
 * @property {string | number} [name] - Optional name for the data point (for tooltip/legend).
 */
export interface ScatterDataObject {
  x: number;
  y: number;
  z?: number; // For bubble size
  name?: string | number;
  [key: string]: string | number | null | undefined; // Allow other properties
}

/**
 * @typedef {'summary' | 'drilldown' | 'deepDive'} DetailLevel
 */
type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

/**
 * @typedef ScatterPlotProps
 * @property {ScatterDataObject[]} data - Data for the scatter plot.
 * @property {string} [xAxisKey='x'] - Key for X-axis data.
 * @property {string} [yAxisKey='y'] - Key for Y-axis data.
 * @property {string} [zAxisKey='z'] - Key for Z-axis data (bubble size).
 * @property {string} [nameKey='name'] - Key for data point name.
 * @property {{ name: string, unit: string }} [xAxisProps] - X-axis label and unit.
 * @property {{ name: string, unit: string }} [yAxisProps] - Y-axis label and unit.
 * @property {{ name: string, range: [number, number] }} [zAxisProps] - Z-axis label and size range.
 * @property {number} [width]
 * @property {number} [height=300]
 * @property {DetailLevel} [mode='deepDive']
 * @property {string[]} [colors]
 * @property {boolean} [showLegend]
 * @property {boolean} [showAxes]
 * @property {(payload: ScatterDataObject, index: number, event: React.MouseEvent) => void} [onElementClick]
 * @property {(value: string | number, name: string, props: object) => ReactNode} [tooltipFormatter]
 * @property {boolean} [loading=false]
 * @property {ReactNode} [emptyState]
 */
interface ScatterPlotProps {
  data: ScatterDataObject[]; // Can be an array of arrays for multiple scatter series
  xAxisKey?: string;
  yAxisKey?: string;
  zAxisKey?: string;
  nameKey?: string;
  xAxisProps?: { name?: string; unit?: string };
  yAxisProps?: { name?: string; unit?: string };
  zAxisProps?: { name?: string; range?: [number, number] }; // range for bubble size
  width?: number;
  height?: number;
  mode?: DetailLevel;
  colors?: string[];
  showLegend?: boolean;
  showAxes?: boolean;
  onElementClick?: (payload: ScatterDataObject, index: number, event: React.MouseEvent) => void;
  tooltipFormatter?: (value: string | number, name: string, props: object) => ReactNode;
  loading?: boolean;
  emptyState?: ReactNode;
}

/**
 * ScatterPlot component using Recharts for themed scatter and bubble charts.
 *
 * @param {ScatterPlotProps} props
 * @returns {JSX.Element}
 */
export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xAxisKey = 'x',
  yAxisKey = 'y',
  zAxisKey = 'z',
  nameKey = 'name',
  xAxisProps,
  yAxisProps,
  zAxisProps,
  width,
  height = 300,
  mode = 'deepDive',
  colors: customColors,
  showLegend: propShowLegend,
  showAxes: propShowAxes,
  tooltipFormatter,
  onElementClick,
  loading = false,
  emptyState = <p>No data available for this chart.</p>,
}) => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store the ref value in a variable for the cleanup function
    const currentRef = chartRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  if (loading) {
    return <div style={{ width: width || '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: typography.fontFamily.body, color: chartTokens.axis.color }}>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <div style={{ width: width || '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: typography.fontFamily.body, color: chartTokens.axis.color }}>{emptyState}</div>;
  }

  let chartColors: string[];
  let currentShowLegend = true;
  let currentShowAxes = true;
  let showGrid = true;
  let gridDashArray = chartTokens.grid.dashArray;

  switch (mode) {
    case 'summary':
      chartColors = Object.values(chartTokens.status);
      currentShowLegend = false;
      currentShowAxes = false;
      showGrid = false;
      break;
    case 'drilldown':
      chartColors = chartTokens.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : true;
      currentShowAxes = propShowAxes !== undefined ? propShowAxes : true;
      gridDashArray = '8 8';
      showGrid = true;
      break;
    case 'deepDive':
    default:
      chartColors = chartTokens.series;
      currentShowLegend = propShowLegend !== undefined ? propShowLegend : true;
      currentShowAxes = propShowAxes !== undefined ? propShowAxes : true;
      showGrid = true;
      break;
  }

  if (customColors && customColors.length > 0) {
    chartColors = customColors;
  }

  // Use the first color from chartColors for the scatter points
  const fillColor = chartColors[0];

  return (
    <div ref={chartRef} style={{ width: width || '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {currentShowAxes && showGrid && (
            <CartesianGrid stroke={chartTokens.grid.stroke} strokeDasharray={gridDashArray} />
          )}
          {currentShowAxes && (
            <XAxis
              type="number"
              dataKey={xAxisKey}
              name={xAxisProps?.name || xAxisKey}
              unit={xAxisProps?.unit}
              stroke={chartTokens.axis.stroke}
              tick={{ fontSize: chartTokens.axis.fontSize, fill: chartTokens.axis.color, fontFamily: chartTokens.axis.fontFamily }}
              axisLine={{ strokeWidth: chartTokens.axis.strokeWidth }}
              tickLine={{ stroke: chartTokens.axis.stroke }}
            />
          )}
          {currentShowAxes && (
            <YAxis
              type="number"
              dataKey={yAxisKey}
              name={yAxisProps?.name || yAxisKey}
              unit={yAxisProps?.unit}
              stroke={chartTokens.axis.stroke}
              tick={{ fontSize: chartTokens.axis.fontSize, fill: chartTokens.axis.color, fontFamily: chartTokens.axis.fontFamily }}
              axisLine={{ strokeWidth: chartTokens.axis.strokeWidth }}
              tickLine={{ stroke: chartTokens.axis.stroke }}
            />
          )}
          {zAxisKey && (
            <ZAxis
              type="number"
              dataKey={zAxisKey}
              range={zAxisProps?.range || [50, 500]}
              name={zAxisProps?.name || zAxisKey}
            />
          )}
          {mode !== 'summary' && (
            <Tooltip
              formatter={tooltipFormatter}
              contentStyle={{
                backgroundColor: chartTokens.tooltip.bg,
                color: chartTokens.tooltip.color,
                borderRadius: chartTokens.tooltip.borderRadius,
                padding: chartTokens.tooltip.padding,
                fontSize: chartTokens.tooltip.fontSize,
                fontFamily: typography.fontFamily.body,
                border: 'none'
              }}
              cursor={{ strokeDasharray: '3 3' }}
              itemStyle={{ color: chartTokens.tooltip.color }}
              labelFormatter={(label) => nameKey && data[0][nameKey] ? `${data[0][nameKey]}` : `Point (${label})`}
            />
          )}
          {currentShowLegend && mode !== 'summary' && (
            <Legend wrapperStyle={{ fontSize: chartTokens.axis.fontSize, fontFamily: chartTokens.axis.fontFamily }} />
          )}
          <Scatter
            name={nameKey && data[0][nameKey] ? data[0][nameKey] as string : "Dataset"}
            data={data}
            fill={fillColor}
            onClick={onElementClick ? (payload: ScatterDataObject, idx: number, event: React.MouseEvent) => onElementClick(payload, idx, event) : undefined}
            isAnimationActive={isInView} // Only animate when in view
            animationBegin={0}
            animationDuration={1000}
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot; 