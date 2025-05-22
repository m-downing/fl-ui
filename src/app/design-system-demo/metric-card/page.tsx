import React from 'react';
import MetricCardExample from '@/app/components/design-system/examples/MetricCardExample';

export const metadata = {
  title: 'Metric Cards | Design System',
  description: 'Standardized metric cards for the Flow UI application',
};

export default function MetricCardDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Metric Cards</h1>
      <p className="text-lg mb-8">
        Metric Cards provide a consistent way to display key metrics and KPIs across the application.
        They support status colors, delta values, and trends to effectively communicate information.
      </p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Implementation Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Metric cards use the standardized status colors defined in <code>chartTokens.status</code></li>
          <li>The status color appears as a left border on the card</li>
          <li>Delta values can show positive or negative trends with appropriate colors</li>
          <li>Cards can be clickable to navigate to more detailed information</li>
        </ul>
      </div>
      
      <MetricCardExample />
    </div>
  );
} 