import React from 'react';
import Badge from '../Badge';

const BadgeExample: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Badge Examples</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Supply Chain Status Badges</h3>
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
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Priority/Risk Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="critical">Critical</Badge>
          <Badge variant="highPriority">High Priority</Badge>
          <Badge variant="standard">Standard</Badge>
          <Badge variant="atRisk">At Risk</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage in Application</h3>
        <div className="bg-neutral-50 p-4 rounded-md">
          <pre className="text-sm">
{`// Simple badge usage
<Badge variant="ordered">Ordered</Badge>

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
};

export default BadgeExample; 