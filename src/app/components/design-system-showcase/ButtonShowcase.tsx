import React from 'react';
import Button from '@/app/components/design-system/Button'; // Corrected import path

// A simple SVG icon for demonstration purposes
const PlusIcon = (
  <svg 
    className="w-4 h-4"
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ArrowRightIcon = (
  <svg 
    className="w-4 h-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const ShowcaseSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8 p-4 border border-neutral-200 rounded-lg bg-white">
    <h3 className="text-xl font-medium text-neutral-700 mb-4">{title}</h3>
    <div className="flex flex-wrap items-center gap-4">
      {children}
    </div>
  </div>
);

export function ButtonShowcase() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Buttons</h2>
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

      <ShowcaseSection title="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </ShowcaseSection>

      <ShowcaseSection title="Sizes">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium (Default)</Button>
        <Button variant="primary" size="lg">Large</Button>
      </ShowcaseSection>

      <ShowcaseSection title="States">
        <Button variant="primary" isLoading>Loading</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="secondary" isLoading disabled>Loading & Disabled</Button>
      </ShowcaseSection>
      
      <ShowcaseSection title="With Icons">
        <Button variant="primary" leftIcon={PlusIcon}>Left Icon</Button>
        <Button variant="secondary" rightIcon={ArrowRightIcon}>Right Icon</Button>
        <Button variant="outline" leftIcon={PlusIcon} rightIcon={ArrowRightIcon}>Both Icons</Button>
        <Button variant="ghost" leftIcon={PlusIcon} isLoading>Icon & Loading</Button>
      </ShowcaseSection>
      
      <ShowcaseSection title="Full Width">
        <Button variant="primary" fullWidth>Primary Full Width</Button>
        <Button variant="outline" fullWidth>Outline Full Width</Button>
      </ShowcaseSection>

      <ShowcaseSection title="Custom Styling (via className)">
         <Button variant="outline" className="border-2 border-dashed border-secondary-500 text-secondary-600 hover:bg-secondary-50">
          Custom Dashed Button
        </Button>
      </ShowcaseSection>
    </div>
  );
} 