import React from 'react';
// Assuming typography tokens are structured and exported from this path
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { typography } from '@/app/components/design-system/tokens/typography';

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

interface TokenDetail {
  characteristic: string;
  value: string;
  tokenRef: string;
}

interface TypographyRole {
  name: string;
  exampleText: string;
  roleContext: string;
  classes: string;
  tokenData: TokenDetail[];
}

const typographyRoles: TypographyRole[] = [
  {
    name: 'Sidebar Label',
    exampleText: 'Navigation Item',
    roleContext: 'sidebar navigation items',
    classes: 'font-poppins text-sm font-semibold leading-normal tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Poppins", tokenRef: "typography.fontFamily.poppins" },
      { characteristic: "Font Size", value: "sm", tokenRef: "typography.fontSize.sm" },
      { characteristic: "Font Weight", value: "semibold", tokenRef: "typography.fontWeight.semibold" },
      { characteristic: "Line Height", value: "normal", tokenRef: "typography.lineHeight.normal" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
  {
    name: 'Page Title (H1)',
    exampleText: 'Main Page Title',
    roleContext: 'primary page headings',
    classes: 'font-poppins text-4xl font-semibold leading-tight tracking-wide',
    tokenData: [
      { characteristic: "Font Family", value: "Poppins", tokenRef: "typography.fontFamily.poppins" },
      { characteristic: "Font Size", value: "4xl", tokenRef: "typography.fontSize['4xl']" },
      { characteristic: "Font Weight", value: "semibold", tokenRef: "typography.fontWeight.semibold" },
      { characteristic: "Line Height", value: "tight", tokenRef: "typography.lineHeight.tight" },
      { characteristic: "Letter Spacing", value: "wide", tokenRef: "typography.letterSpacing.wide" },
    ],
  },
  {
    name: 'Section Heading (H2)',
    exampleText: 'Section Title',
    roleContext: 'secondary or section-level headings',
    classes: 'font-poppins text-2xl font-semibold leading-normal tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Poppins", tokenRef: "typography.fontFamily.poppins" },
      { characteristic: "Font Size", value: "2xl", tokenRef: "typography.fontSize['2xl']" },
      { characteristic: "Font Weight", value: "semibold", tokenRef: "typography.fontWeight.semibold" },
      { characteristic: "Line Height", value: "normal", tokenRef: "typography.lineHeight.normal" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
  {
    name: 'Body Text',
    exampleText: 'This is a paragraph of body text, designed for readability and general content. It uses Open Sans.',
    roleContext: 'main content paragraphs and readable text blocks',
    classes: 'font-open-sans text-base font-normal leading-relaxed tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Open Sans", tokenRef: "typography.fontFamily.openSans" },
      { characteristic: "Font Size", value: "base", tokenRef: "typography.fontSize.base" },
      { characteristic: "Font Weight", value: "normal", tokenRef: "typography.fontWeight.normal" },
      { characteristic: "Line Height", value: "relaxed", tokenRef: "typography.lineHeight.relaxed" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
  {
    name: 'Chart Label / Table Text',
    exampleText: 'Data Point 123',
    roleContext: 'labels within charts, text in tables, and other data-dense contexts',
    classes: 'font-open-sans text-sm font-normal leading-normal tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Open Sans", tokenRef: "typography.fontFamily.openSans" },
      { characteristic: "Font Size", value: "sm", tokenRef: "typography.fontSize.sm" },
      { characteristic: "Font Weight", value: "normal", tokenRef: "typography.fontWeight.normal" },
      { characteristic: "Line Height", value: "normal", tokenRef: "typography.lineHeight.normal" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
  {
    name: 'MetricCard Value',
    exampleText: '1,234.56',
    roleContext: 'prominent numerical values in metric cards or dashboards',
    classes: 'font-poppins text-3xl font-bold leading-tight tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Poppins", tokenRef: "typography.fontFamily.poppins" },
      { characteristic: "Font Size", value: "3xl", tokenRef: "typography.fontSize['3xl']" },
      { characteristic: "Font Weight", value: "bold", tokenRef: "typography.fontWeight.bold" },
      { characteristic: "Line Height", value: "tight", tokenRef: "typography.lineHeight.tight" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
  {
    name: 'MetricCard Label',
    exampleText: 'Total Revenue',
    roleContext: 'descriptive labels for values in metric cards',
    classes: 'font-poppins text-base font-medium leading-normal tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Poppins", tokenRef: "typography.fontFamily.poppins" },
      { characteristic: "Font Size", value: "base", tokenRef: "typography.fontSize.base" },
      { characteristic: "Font Weight", value: "medium", tokenRef: "typography.fontWeight.medium" },
      { characteristic: "Line Height", value: "normal", tokenRef: "typography.lineHeight.normal" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
  {
    name: 'Caption / Footnote',
    exampleText: '*Note: Data updated as of yesterday.',
    roleContext: 'footnotes, captions, and other ancillary information',
    classes: 'font-open-sans text-xs font-normal leading-normal tracking-normal',
    tokenData: [
      { characteristic: "Font Family", value: "Open Sans", tokenRef: "typography.fontFamily.openSans" },
      { characteristic: "Font Size", value: "xs", tokenRef: "typography.fontSize.xs" },
      { characteristic: "Font Weight", value: "normal", tokenRef: "typography.fontWeight.normal" },
      { characteristic: "Line Height", value: "normal", tokenRef: "typography.lineHeight.normal" },
      { characteristic: "Letter Spacing", value: "normal", tokenRef: "typography.letterSpacing.normal" },
    ],
  },
];

export function TypographyShowcase() {
  return (
    <div className="space-y-12">
      <div className="border-b pb-6 mb-6">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-3xl font-semibold">Typography System</h2>
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
        <p className="text-lg text-gray-700">
          Our design system uses Poppins for headings and UI elements, and Open Sans for body text and data display.
        </p>
      </div>

      {/* Typography Scale Overview */}
      <div className="mb-10">
        <h3 className="text-xl font-medium mb-4">Typography Scale</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">xs (12px)</div>
            <div className="text-xs">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">sm (14px)</div>
            <div className="text-sm">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">base (16px)</div>
            <div className="text-base">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">lg (18px)</div>
            <div className="text-lg">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">xl (20px)</div>
            <div className="text-xl">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">2xl (24px)</div>
            <div className="text-2xl">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">3xl (30px)</div>
            <div className="text-3xl">The quick brown fox jumps over the lazy dog</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-2 text-sm text-gray-500">4xl (36px)</div>
            <div className="text-4xl">The quick brown fox jumps over the lazy dog</div>
          </div>
        </div>
      </div>

      {/* Typography Roles */}
      <div>
        <h3 className="text-2xl font-medium mb-6">Typography Roles</h3>
        <div className="space-y-12">
          {typographyRoles.map((role) => (
            <div key={role.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Example Side */}
                <div className="flex-1">
                  <h4 className="text-lg font-medium mb-2 text-gray-700">{role.name}</h4>
                  <div className="mb-2 text-sm text-gray-500">Example:</div>
                  <div className={`${role.classes} p-6 min-h-[120px] flex items-center bg-neutral-50 border border-neutral-200 rounded-md`}>
                    {role.exampleText}
                  </div>
                </div>
                
                {/* Details Side */}
                <div className="flex-1">
                  <div className="mb-3 text-gray-700">
                    <span className="font-medium">Usage:</span> {role.roleContext}
                  </div>
                  
                  <div className="mb-3">
                    <div className="font-medium mb-1 text-gray-700">Properties:</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {role.tokenData.map((td) => (
                        <div key={td.characteristic} className="flex">
                          <span className="text-gray-600 min-w-[120px]">{td.characteristic}:</span>
                          <span className="text-gray-900 font-medium">{td.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Tailwind:</span>
                    <code className="ml-2 p-1 bg-gray-100 text-gray-800 rounded text-xs">{role.classes}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 