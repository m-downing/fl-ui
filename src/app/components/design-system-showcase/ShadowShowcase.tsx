import React, { useState } from 'react';
import { shadows } from '@/app/components/design-system/tokens/shadows';
import { Badge } from '@/app/components/design-system';
import { MetricCard, ProgressTracker, PieChart } from '@/app/components/design-system/charts';

// Information icon for README button
const InfoIcon = (
  <svg 
    className="w-5 h-5" 
    fill="currentColor" 
    viewBox="0 0 330 330" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M165 0C74.019 0 0 74.02 0 165.001 0 255.982 74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001C300 239.44 239.439 300 165 300z" />
    <path d="M164.998 70c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991 11.026 0 19.996-8.968 19.996-19.991 0-11.033-8.97-20.009-19.996-20.009zM165 140c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15z" />
  </svg>
);

interface ShadowDefinition {
  name: keyof typeof shadows;
  value: string;
  tailwindClass: string;
}

// Assuming these Tailwind classes correspond to your shadow tokens
const shadowDefinitions: ShadowDefinition[] = [
  { name: 'sm', value: shadows.sm, tailwindClass: 'shadow-sm' },
  { name: 'md', value: shadows.md, tailwindClass: 'shadow-md' },
  { name: 'lg', value: shadows.lg, tailwindClass: 'shadow-lg' },
  // If you had an 'xl' or '2xl' in your tokens, they would be:
  // { name: 'xl', value: shadows.xl, tailwindClass: 'shadow-xl' },
  // { name: '2xl', value: shadows.xl, tailwindClass: 'shadow-2xl' },
  // If you had an 'inner' shadow:
  // { name: 'inner', value: shadows.inner, tailwindClass: 'shadow-inner' },
];

// Sample data for PieChart
const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 200 },
];

export function ShadowShowcase() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold">Shadows</h2>
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
      <p className="text-neutral-600 mb-6">
        Showcase for shadow tokens defined in the design system. Each example demonstrates applying shadows
        directly to design system components.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* First Shadow - MetricCard with shadow-sm */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs mb-4">
            {/* Apply shadow directly to the MetricCard by extending its style */}
            <div 
              className="rounded-lg overflow-hidden" 
              style={{ boxShadow: shadows.sm }}
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
            <p className="text-xs text-neutral-600">Tailwind: <code>.shadow-sm</code></p>
            <p className="font-medium text-neutral-800 mt-1">Token: <code>shadows.sm</code></p>
            <p className="text-xs text-neutral-500 mt-1 break-all">CSS: <code>{shadows.sm}</code></p>
          </div>
        </div>

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