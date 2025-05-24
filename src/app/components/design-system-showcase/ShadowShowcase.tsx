import React, { useState } from 'react';
import { shadows } from '@/app/components/design-system/tokens/shadows';
import { Badge } from '@/app/components/design-system';
import { MetricCard, ProgressTracker, PieChart } from '@/app/components/design-system/charts';

// Sample data for PieChart
const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 200 },
];

const ShadowCard: React.FC<{ shadowName: string; shadowValue: string }> = ({ shadowName, shadowValue }) => (
  <div className="flex flex-col items-center">
    <div className="w-full max-w-xs mb-4">
      {/* Apply shadow directly to the MetricCard by extending its style */}
      <div 
        className="rounded-lg overflow-hidden" 
        style={{ boxShadow: shadowValue }}
      >
        <MetricCard 
          label="Revenue Target" 
          value="$1.2M" 
          delta={12} 
          trend="up" 
          status="success" 
        />
      </div>
    </div>
    <div className="text-sm text-center max-w-xs w-full py-2">
      <p className="text-xs text-neutral-600">Tailwind: <code>.shadow-{shadowName}</code></p>
      <p className="font-medium text-neutral-800 mt-1">Token: <code>shadows.{shadowName}</code></p>
      <p className="text-xs text-neutral-500 mt-1 break-all">CSS: <code>{shadowValue}</code></p>
    </div>
  </div>
);

export function ShadowShowcase() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold">Shadows</h2>
        <div className="inline-flex items-center gap-0.5 text-xs border border-neutral-200 rounded px-2 py-1 hover:bg-neutral-50 cursor-pointer bg-neutral-100 mr-4">
          <svg 
            className="w-4 h-4" 
            fill="none"
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span className="font-semibold">README</span>
        </div>
      </div>
      <p className="text-neutral-600 mb-6">
        Showcase for shadow tokens defined in the design system. Each example demonstrates applying shadows
        directly to design system components.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* First Shadow - MetricCard with shadow-sm */}
        <ShadowCard shadowName="sm" shadowValue={shadows.sm} />

        {/* Second Shadow - Hoverable ProgressTracker with shadow-md */}
        <div className="flex flex-col items-center">
          <div 
            className="w-full max-w-xs mb-4 p-6 bg-white rounded-lg flex flex-col items-center transition-all duration-300 cursor-pointer"
            style={{ 
              boxShadow: hoveredItem === 'md' ? '0 8px 16px rgba(0, 0, 0, 0.15)' : shadows.md,
              transform: hoveredItem === 'md' ? 'translateY(-4px)' : 'none'
            }}
            onMouseEnter={() => setHoveredItem('md')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ProgressTracker 
              value={75} 
              max={100} 
              status="primary" 
              label="" 
              mode="deepDive"
            />
            <Badge variant="standard" className='mt-4'>Deployment Completion</Badge>
          </div>
          <div className="text-sm text-center max-w-xs w-full py-2">
            <p className="text-xs text-neutral-600">Tailwind: <code>.shadow-md</code></p>
            <p className="font-medium text-neutral-800 mt-1">Token: <code>shadows.md</code></p>
            <p className="text-xs text-neutral-500 mt-1 break-all">CSS: <code>{shadows.md}</code></p>
          </div>
        </div>

        {/* Third Shadow - PieChart with shadow-lg and border */}
        <div className="flex flex-col items-center">
          <div 
            className="w-full max-w-xs mb-4 p-4 bg-white rounded-lg border-2 border-primary-200"
            style={{ boxShadow: shadows.lg }}
          >
            <PieChart 
              data={pieChartData} 
              height={180}
              mode="summary"
              showLegend={false}
            />
          </div>
          <div className="text-sm text-center max-w-xs w-full py-2">
            <p className="text-xs text-neutral-600">Tailwind: <code>.shadow-lg</code></p>
            <p className="font-medium text-neutral-800 mt-1">Token: <code>shadows.lg</code></p>
            <p className="text-xs text-neutral-500 mt-1 break-all">CSS: <code>{shadows.lg}</code></p>
          </div>
        </div>
      </div>
      {Object.keys(shadows).length === 0 && (
         <p className="text-sm text-neutral-500 col-span-full mt-4">
           No shadow tokens found or imported. Please ensure <code>shadows.ts</code> is correctly defined and exported.
         </p>
      )}
    </div>
  );
} 