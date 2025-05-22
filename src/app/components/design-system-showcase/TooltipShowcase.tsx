import React from 'react';
import Tooltip from '@/app/components/design-system/Tooltip';
import Button from '@/app/components/design-system/Button'; // To trigger tooltips

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

const ShowcaseSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = 
  ({ title, children, className }) => (
  <div className={`mb-8 p-6 border border-neutral-200 rounded-lg bg-white shadow-sm ${className || ''}`}>
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