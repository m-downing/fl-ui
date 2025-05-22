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