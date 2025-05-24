import React from 'react';
import Tooltip from '@/app/components/design-system/Tooltip';
import Button from '@/app/components/design-system/Button'; // To trigger tooltips

const ShowcaseSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className={`mb-8 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm`}>
    <h3 className="text-lg font-medium text-neutral-700 mb-4">{title}</h3>
    <div className="flex flex-wrap items-center justify-around gap-8 py-4">
      {/* Increased gap and padding for better visibility of tooltips */}
      {children}
    </div>
  </div>
);

export function TooltipShowcase() {
  const longContent = (
    <div className="text-left">
      <p className="font-semibold mb-1">Detailed Information</p>
      <ul className="list-disc list-inside text-xs">
        <li>Supports rich content like lists.</li>
        <li>And <strong>bold</strong> or <em>italic</em> text.</li>
        <li>Great for providing extra context.</li>
      </ul>
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Tooltips</h2>
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
      <p className="text-sm text-neutral-600 mb-6">
        Tooltips provide contextual information when users hover over or focus on an element. 
        They support various positions, custom content, and optional arrows.
      </p>

      <ShowcaseSection title="Positions">
        <Tooltip content="Tooltip on top (default)">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip on the right" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
        <Tooltip content="Tooltip on the bottom" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip on the left" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
      </ShowcaseSection>

      <ShowcaseSection title="Content & Width">
        <Tooltip content="Short and sweet!">
          <Button>Simple Text</Button>
        </Tooltip>
        <Tooltip content={longContent} position="bottom" width="220px">
          <Button>Rich Content (Width: 220px)</Button>
        </Tooltip>
        <Tooltip content="This tooltip has a longer delay before appearing." delay={1000} position="top">
          <Button>Delayed (1s)</Button>
        </Tooltip>
      </ShowcaseSection>
      
      <ShowcaseSection title="Arrow & Styling">
        <Tooltip content="No arrow here" arrow={false} position="right">
          <Button variant="secondary">No Arrow</Button>
        </Tooltip>
        <Tooltip 
          content="Custom styled tooltip!" 
          position="bottom" 
          className="!bg-success-600 !text-white shadow-lg !rounded-lg !py-2 !px-3"
          arrow // Explicitly true, arrow will take custom bg if not styled separately
        >
          <Button variant="primary">Custom Class</Button>
        </Tooltip>
        <Tooltip content="Disabled tooltip" disabled>
          <Button variant="outline" disabled>Disabled Trigger</Button>
        </Tooltip>
         <Tooltip content="This trigger is not disabled, but the tooltip is." disabled>
          <Button variant="outline">Enabled Trigger (Tooltip Disabled)</Button>
        </Tooltip>
      </ShowcaseSection>
    </div>
  );
} 