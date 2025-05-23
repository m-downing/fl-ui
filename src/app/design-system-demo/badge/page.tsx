import React from 'react';
import BadgeExample from '@/app/components/design-system/examples/BadgeExample';

export const metadata = {
  title: 'Badge System | Design System',
  description: 'Standardized badge system for the Flow UI application',
};

export default function BadgeDemoPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Badge System</h1>
      <p className="text-lg mb-8">
        The badge system provides a consistent way to display status, priority, and other information across the application.
        This standardized approach ensures that developers don&apos;t need to think about styling or color choices.
      </p>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Implementation Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All badge variants are defined in <code>src/app/components/design-system/tokens/colors.ts</code></li>
          <li>Badge styling is standardized: medium size, rounded corners, semibold text</li>
          <li>Supply Chain Status badges display as written</li>
          <li>Priority/Risk badges are automatically displayed in UPPERCASE</li>
          <li>Badges can handle click events when needed</li>
          <li>No need for custom styling - just choose the appropriate variant</li>
        </ul>
      </div>
      
      <BadgeExample />
    </div>
  );
} 