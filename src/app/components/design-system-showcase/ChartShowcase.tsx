import React from 'react';
import {
  LineChart, 
  BarChart, 
  PieChart, 
  ScatterPlot,
  ProgressTracker,
  MetricCard
} from '@/app/components/design-system/charts';
import { ChartDataObject as LineBarChartDataObject } from '@/app/components/design-system/charts/LineChart';
import { ScatterDataObject } from '@/app/components/design-system/charts/ScatterPlot';
// PieChart data is typically { name: string, value: number }

const ChartContainer: React.FC<{ title: string; description: string; children: React.ReactNode; className?: string; gridCols?: number }> = 
  ({ title, description, children, className, gridCols }) => (
  <div className={`mb-12 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm ${className || ''}`}>
    <h3 className="text-xl font-semibold text-neutral-700 mb-1">{title}</h3>
    <p className="text-sm text-neutral-600 mb-4">{description}</p>
    <div className={`mt-4 ${gridCols ? `grid grid-cols-1 sm:grid-cols-${gridCols} gap-6` : ''}`}>{children}</div>
  </div>
);

// --- Sample Data ---
const sampleLineData: LineBarChartDataObject[] = [
  { name: 'Jan', actual: 4000, forecast: 2400, remaining: 2400 },
  { name: 'Feb', actual: 3000, forecast: 1398, remaining: 2210 },
  { name: 'Mar', actual: 2000, forecast: 9800, remaining: 2290 },
  { name: 'Apr', actual: 2780, forecast: 3908, remaining: 2000 },
  { name: 'May', actual: 1890, forecast: 4800, remaining: 2181 },
  { name: 'Jun', actual: 2390, forecast: 3800, remaining: 2500 },
  { name: 'Jul', actual: 3490, forecast: 4300, remaining: 2100 },
];

const sampleBarData: LineBarChartDataObject[] = [
  { name: 'APAC', Compute: 120, Storage: 90, Network: 40 },
  { name: 'EMEA', Compute: 150, Storage: 110, Network: 50 },
  { name: 'NAM', Compute: 100, Storage: 130, Network: 60 },
  { name: 'LATAM', Compute: 180, Storage: 70, Network: 30 },
];

// Special data for horizontal bar chart to ensure it works properly
const horizontalBarData = [
  { name: 'Frankfurt', value: 120 },
  { name: 'Singapore', value: 150 },
  { name: 'New York', value: 100 },
  { name: 'London', value: 180 }
];

const samplePieData = [
  { name: 'Compute Racks', value: 400 },
  { name: 'Storage Racks', value: 300 },
  { name: 'Network Racks', value: 300 },
  { name: 'Security Appliances', value: 200 },
  { name: 'Power Distribution', value: 278 },
  { name: 'Cooling Infrastructure', value: 189 },
];

const sampleScatterData: ScatterDataObject[] = Array.from({ length: 50 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 500 + 50, // For bubble size
  name: `Rack ${i + 1}`
}));

const sampleSingleSeriesScatterData: ScatterDataObject[] = Array.from({ length: 30 }, () => ({
  x: Math.floor(Math.random() * 100) + 1,
  y: Math.floor(Math.random() * 100) + 1,
}));


export function ChartShowcase() {
  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <h2 className="text-3xl font-bold text-neutral-800">Data Center Supply Chain Visualization</h2>
        <div className="inline-flex items-center gap-0.5 text-xs border border-neutral-200 rounded px-2 py-1 hover:bg-neutral-50 cursor-pointer bg-neutral-100 mr-4">
          <svg 
            className="w-3.5 h-3.5" 
            fill="currentColor" 
            viewBox="0 0 330 330" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165 0C74.019 0 0 74.02 0 165.001 0 255.982 74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001C300 239.44 239.439 300 165 300z" />
            <path d="M164.998 70c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991 11.026 0 19.996-8.968 19.996-19.991 0-11.033-8.97-20.009-19.996-20.009zM165 140c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15z" />
          </svg>
          <span className="font-semibold">README</span>
        </div>
      </div>
      <p className="text-base text-neutral-600 mb-10">
        These visualization components help track and analyze the data center infrastructure supply chain. 
        They provide insights into server rack forecasting, ordering patterns, geographic distribution, and capacity tracking.
        Each component can be configured with different modes (summary, drilldown, deepDive) to adjust level of detail shown.
      </p>

      {/* MetricCard Showcase */}
      <ChartContainer
        title="Key Infrastructure Metrics"
        description="At-a-glance view of critical supply chain KPIs for data center infrastructure planning and management."
        gridCols={3} // Suggests a grid layout for multiple cards
      >
        <MetricCard label="Global Inventory Value" value="$1,250,300" delta={12.5} trend="up" status="success" />
        <MetricCard label="Racks in Transit" value="845" delta={-2.1} trend="down" status="warning" />
        <MetricCard label="Power Utilization" value="75.7%" status="neutral" />
        <MetricCard label="Supply Chain Incidents" value="5" delta={3} trend="up" status="error" />
        <MetricCard label="Avg. Deployment Time" value="12 days" delta={-15} trend="down" status="success" />
        <MetricCard label="Pending Orders" value="312" />
      </ChartContainer>

      {/* ProgressTracker Showcase */}
      <ChartContainer
        title="Deployment Progress Tracking"
        description="Monitor installation and deployment progress of various data center infrastructure components across global facilities."
        gridCols={4} // Suggests a grid layout for multiple trackers
      >
        <ProgressTracker value={75} label="Frankfurt Expansion" status="success" mode="deepDive" />
        <ProgressTracker value={33} label="Singapore Phase 2" status="primary" mode="deepDive" />
        <ProgressTracker value={90} label="NYC West Migration" status="warning" mode="drilldown" size={80} strokeWidth={8}/>
        <ProgressTracker value={15} label="London Retrofit" status="error" mode="summary" size={60} />
        <ProgressTracker value={60} label="APAC Capacity" valueFormatter={(val, max) => `${val}/${max} Racks`} showValueAsTooltip={true} />
        <ProgressTracker value={100} label="Tokyo Network Upgrade" status="success" />
        <ProgressTracker value={25} label="Q3 Procurement Goals" mode="drilldown" />
        <ProgressTracker value={50} label="Inventory Onboarding" loading={true} mode="summary" />
      </ChartContainer>

      {/* Line Chart Showcase */}
      <ChartContainer
        title="Server Capacity Trends"
        description="Track actual vs forecasted server rack capacity over time. Visualize trends and identify capacity planning insights across reporting periods."
      >
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-4">Capacity Planning Analysis (Deep Dive)</h4>
        <LineChart data={sampleLineData} dataKey={['forecast', 'actual']} xAxisKey="name" height={300} />
        
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-6">Monthly Rack Deployments (Drilldown)</h4>
        <LineChart data={sampleLineData} dataKey="actual" xAxisKey="name" height={250} mode="drilldown" colors={['#82ca9d']} />
        
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-6">Quarterly Capacity Trend (Summary)</h4>
        <LineChart data={sampleLineData} dataKey="remaining" xAxisKey="name" height={150} mode="summary" colors={['#ff7300']} />
      </ChartContainer>

      {/* Bar Chart Showcase */}
      <ChartContainer
        title="Regional Infrastructure Distribution"
        description="Compare infrastructure allocation across global regions and categories. Identify regional capacity needs and deployment patterns."
      >
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-4">Regional Rack Type Distribution (Deep Dive)</h4>
        <BarChart data={sampleBarData} dataKey={['Compute', 'Storage', 'Network']} xAxisKey="name" height={300} />
        
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-6">Data Center Capacity by Location (Drilldown)</h4>
        <div className="w-full">
          <BarChart 
            data={horizontalBarData} 
            dataKey="value" 
            xAxisKey="name"  
            height={300} 
            mode="drilldown" 
            colors={['#8884d8']} 
          />
        </div>
      </ChartContainer>

      {/* Pie Chart Showcase */}
      <ChartContainer
        title="Infrastructure Component Breakdown"
        description="Visualize the proportional distribution of different rack types and infrastructure components across the global data center network."
      >
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-4">Global Infrastructure Portfolio (Donut with Labels)</h4>
        <PieChart data={samplePieData} dataKey="value" nameKey="name" height={350} mode="deepDive" />
        
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-6">Equipment Type Distribution (Basic Donut)</h4>
        <PieChart data={samplePieData} dataKey="value" nameKey="name" height={300} mode="drilldown" />
      </ChartContainer>

      {/* Scatter Plot Showcase */}
      <ChartContainer
        title="Data Center Performance Analysis"
        description="Analyze relationships between power consumption, cooling efficiency, and rack density across global data centers."
      >
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-4">Power vs Cooling Analysis (Deep Dive with Z-Axis)</h4>
        <ScatterPlot 
          data={sampleScatterData} 
          xAxisKey="x" 
          yAxisKey="y" 
          zAxisKey="z" 
          nameKey="name" 
          height={350}
          xAxisProps={{ name: 'Power Usage (kW)', unit: 'kW' }}
          yAxisProps={{ name: 'Cooling Efficiency', unit: '%' }}
          zAxisProps={{ name: 'Rack Density', range: [50, 800] }}
        />
        
        <h4 className="text-md font-medium text-neutral-700 mb-2 mt-6">Capacity vs Utilization (Drilldown)</h4>
        <ScatterPlot 
          data={sampleSingleSeriesScatterData} 
          xAxisKey="x" 
          yAxisKey="y" 
          height={300} 
          mode="drilldown" 
          colors={['#ff7300']}
        />
      </ChartContainer>
      
      <p className="mt-12 text-sm text-neutral-500 text-center">
        These visualization components enable the Supply Chain Management team to effectively monitor, analyze, and plan data center infrastructure deployments across our global financial network.
      </p>
    </div>
  );
}