import React from 'react';
import Badge from '../design-system/Badge';

export function BadgeShowcase() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-bold mb-6">Badge Examples</h2>
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
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Supply Chain Status Badges (Regular Size)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="planned">Planned</Badge>
          <Badge variant="ordered">Ordered</Badge>
          <Badge variant="manufacturing">Manufacturing</Badge>
          <Badge variant="qualityTesting">Quality Testing</Badge>
          <Badge variant="readyToShip">Ready to Ship</Badge>
          <Badge variant="inTransit">In Transit</Badge>
          <Badge variant="delivered">Delivered</Badge>
          <Badge variant="installing">Installing</Badge>
          <Badge variant="active">Active</Badge>
          <Badge variant="maintenance">Maintenance</Badge>
          <Badge variant="delayed">Delayed</Badge>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Supply Chain Status Badges (Small Size)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="planned" size="small">Planned</Badge>
          <Badge variant="ordered" size="small">Ordered</Badge>
          <Badge variant="manufacturing" size="small">Manufacturing</Badge>
          <Badge variant="qualityTesting" size="small">Quality Testing</Badge>
          <Badge variant="readyToShip" size="small">Ready to Ship</Badge>
          <Badge variant="inTransit" size="small">In Transit</Badge>
          <Badge variant="delivered" size="small">Delivered</Badge>
          <Badge variant="installing" size="small">Installing</Badge>
          <Badge variant="active" size="small">Active</Badge>
          <Badge variant="maintenance" size="small">Maintenance</Badge>
          <Badge variant="delayed" size="small">Delayed</Badge>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Priority/Risk Badges (Regular Size)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="critical">Critical</Badge>
          <Badge variant="highPriority">High Priority</Badge>
          <Badge variant="standard">Standard</Badge>
          <Badge variant="atRisk">At Risk</Badge>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Priority/Risk Badges (Small Size)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="critical" size="small">Critical</Badge>
          <Badge variant="highPriority" size="small">High Priority</Badge>
          <Badge variant="standard" size="small">Standard</Badge>
          <Badge variant="atRisk" size="small">At Risk</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage in Application</h3>
        <div className="bg-neutral-50 p-4 rounded-md">
          <pre className="text-sm">
{`// Simple badge usage (regular size)
<Badge variant="ordered">Ordered</Badge>

// Small size badge
<Badge variant="ordered" size="small">Ordered</Badge>

// With click handler
<Badge 
  variant="inTransit" 
  onClick={() => alert('Badge clicked!')}
>
  Track Shipment
</Badge>

// Priority badges are automatically uppercase
<Badge variant="critical">Critical</Badge> // Will display as "CRITICAL"`}
          </pre>
        </div>
      </div>
    </div>
  );
} 