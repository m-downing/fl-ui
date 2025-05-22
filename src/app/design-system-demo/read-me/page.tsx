'use client';

import React from 'react';
import { Card } from '@/app/components/design-system';

export default function DesignSystemReadmePage() {
  return (
    <div className="container mx-auto py-8 px-6 max-w-5xl">
      <h1 className="text-3xl font-bold text-neutral-800 mb-6 font-poppins">Flow UI Design System</h1>
      
      <Card className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Overview</h2>
        <p className="mb-4">
          The Flow UI Design System provides a collection of consistent, reusable UI components built with React, TypeScript, and Tailwind CSS.
          It aims to accelerate development while ensuring a cohesive user experience across all applications.
        </p>
        <p>
          This design system combines modern development practices with JPMC's design guidelines to create
          interfaces that are both functional and visually appealing.
        </p>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Getting Started</h2>
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2 text-neutral-700">Installation</h3>
          <p className="mb-2">Add the design system to your project using the company npm registry:</p>
          <div className="bg-neutral-800 text-neutral-50 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
            <code>npm install @example/flow-ui-design-system --registry=https://artifactory.example.com/api/npm/npm</code>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-2 text-neutral-700">Basic Usage</h3>
          <p className="mb-2">Import and use components in your React application:</p>
          <div className="bg-neutral-800 text-neutral-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{`import { Button, Card, Input } from '@jpmc/flow-ui-design-system';

function MyComponent() {
  return (
    <Card title="User Information" padded bordered>
      <Input label="Full Name" placeholder="Enter your name" />
      <Button variant="primary" className="mt-4">Submit</Button>
    </Card>
  );
}`}</pre>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Tailwind CSS Integration</h2>
        <p className="mb-4">
          The Flow UI Design System is built on Tailwind CSS, a utility-first CSS framework that allows for rapid UI development.
        </p>
        
        <h3 className="text-xl font-medium mb-2 text-neutral-700">Setup</h3>
        <p className="mb-2">Add the design system's Tailwind configuration to your project:</p>
        <div className="bg-neutral-800 text-neutral-50 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
          <pre>{`// tailwind.config.js
const flowUiPreset = require('@jpmc/flow-ui-design-system/tailwind-preset');

module.exports = {
  presets: [flowUiPreset],
  // Your project-specific configurations
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jpmc/flow-ui-design-system/**/*.js',
  ],
  // You can extend the design system's theme if needed
  theme: {
    extend: {
      // Your customizations
    }
  }
};`}</pre>
        </div>
        
        <h3 className="text-xl font-medium mb-2 text-neutral-700">Using Tailwind with the Design System</h3>
        <p className="mb-4">
          You can use Tailwind utility classes alongside design system components to customize layouts and spacing:
        </p>
        <div className="bg-neutral-800 text-neutral-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
          <pre>{`<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
  <Card className="hover:shadow-lg transition-shadow">
    <h2 className="text-xl font-semibold mb-2">Custom Card</h2>
    <p className="text-neutral-600">Content with Tailwind utilities</p>
  </Card>
  
  <div className="bg-primary-50 p-4 rounded-md border border-primary-200">
    <p className="text-primary-800">Custom element using design system colors</p>
  </div>
</div>`}</pre>
        </div>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Migration Strategy</h2>
        <p className="mb-4 font-medium text-neutral-700">
          Migration to the Flow UI Design System is not a binary event.
        </p>
        
        <h3 className="text-xl font-medium mb-3 text-neutral-700">Incremental Adoption</h3>
        <p className="mb-4">
          You can integrate the design system into your existing applications gradually:
        </p>
        
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li>
            <span className="font-medium">Start with basic components:</span> Begin by replacing simple elements like buttons, inputs, and cards.
          </li>
          <li>
            <span className="font-medium">Page-by-page migration:</span> Update individual pages or sections rather than refactoring the entire application at once.
          </li>
          <li>
            <span className="font-medium">New features first:</span> Apply the design system to new features while gradually updating existing ones.
          </li>
          <li>
            <span className="font-medium">Maintain visual consistency:</span> Use the design system's color tokens and typography even in components that haven't been fully migrated.
          </li>
        </ol>
        
        <h3 className="text-xl font-medium mb-3 text-neutral-700">Coexistence Strategy</h3>
        <p className="mb-4">
          The design system is designed to coexist with your current styling approaches:
        </p>
        
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>You can use design system components alongside existing styled components.</li>
          <li>Design tokens (colors, typography, spacing) can be applied to your current components to align with the new design language.</li>
          <li>Tailwind utilities can be used with existing CSS/SCSS while transitioning.</li>
        </ul>
        
        <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-sm">
          <h4 className="font-medium text-neutral-800 mb-1">Recommendation</h4>
          <p className="text-neutral-700">
            Start by incorporating the design system's color scheme and typography into your existing components,
            then gradually replace components starting with the most frequently used ones.
          </p>
        </div>
      </Card>

      <Card className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Available Components</h2>
        <p className="mb-4">
          The design system includes the following components, each with comprehensive props for customization:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Button</h3>
            <p className="text-sm text-neutral-600 mb-2">Interactive button with multiple variants and states.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Input</h3>
            <p className="text-sm text-neutral-600 mb-2">Text input fields with validation and helper text.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Select</h3>
            <p className="text-sm text-neutral-600 mb-2">Dropdown selection component with customizable options.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Card</h3>
            <p className="text-sm text-neutral-600 mb-2">Container component for organizing content with multiple variants.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Badge</h3>
            <p className="text-sm text-neutral-600 mb-2">Label component for displaying statuses or categories.</p>
            <a href="/design-system-demo/badge" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Tooltip</h3>
            <p className="text-sm text-neutral-600 mb-2">Informational popup triggered by hover or focus.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">Modal</h3>
            <p className="text-sm text-neutral-600 mb-2">Dialog window for focused user interactions.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
          
          <div className="border border-neutral-200 rounded-md p-4">
            <h3 className="font-medium text-lg mb-2">DataTable</h3>
            <p className="text-sm text-neutral-600 mb-2">Advanced table component with sorting and filtering.</p>
            <a href="/design-system-demo" className="text-primary-600 hover:underline text-sm">View examples →</a>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-neutral-800">Design Tokens</h2>
        <p className="mb-4">
          Design tokens are the visual building blocks of the system. They can be imported and used in your application:
        </p>
        
        <div className="bg-neutral-800 text-neutral-50 p-4 rounded-md font-mono text-sm mb-6 overflow-x-auto">
          <pre>{`import { colors, typography, shadows } from '@jpmc/flow-ui-design-system';

// Use in JavaScript/TypeScript
const primaryColor = colors.colors.primary[600]; // #17314a
const bodyFont = typography.fontFamily.openSans;`}</pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Colors</h3>
            <div className="space-y-2">
              <div className="h-8 bg-primary-600 rounded flex items-center px-2 text-white text-xs">primary-600</div>
              <div className="h-8 bg-neutral-800 rounded flex items-center px-2 text-white text-xs">neutral-800</div>
              <div className="h-8 bg-success-500 rounded flex items-center px-2 text-white text-xs">success-500</div>
              <div className="h-8 bg-error-500 rounded flex items-center px-2 text-white text-xs">error-500</div>
              <div className="h-8 bg-warning-500 rounded flex items-center px-2 text-white text-xs">warning-500</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Typography</h3>
            <div className="space-y-2">
              <p className="font-poppins text-2xl">Heading (Poppins)</p>
              <p className="font-open-sans">Body (Open Sans)</p>
              <p className="text-xs">Text xs</p>
              <p className="text-sm">Text sm</p>
              <p className="text-base">Text base</p>
              <p className="text-lg">Text lg</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Spacing & Shadows</h3>
            <div className="space-y-4">
              <div className="p-2 bg-neutral-100 rounded">xs (0.25rem)</div>
              <div className="p-4 bg-neutral-100 rounded">md (1rem)</div>
              <div className="shadow-sm p-2 bg-white rounded">shadow-sm</div>
              <div className="shadow-md p-2 bg-white rounded">shadow-md</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
