import React from 'react';
import Badge from '../design-system/Badge';

export function BadgeShowcase() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-bold mb-6">Badge Examples</h2>
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