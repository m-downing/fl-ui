import React from 'react';
import { colors as colorTokenObject } from '@/app/components/design-system/tokens/colors';

const { colors } = colorTokenObject; // Destructure to get the actual color palette

interface ColorSwatchProps {
  colorName: string;
  hexValue: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ colorName, hexValue }) => (
  <div className="flex flex-col items-center">
    <div 
      className="w-20 h-20 rounded-md border border-neutral-300 shadow-sm mb-2"
      style={{ backgroundColor: hexValue }}
      title={`${colorName}: ${hexValue}`}
    />
    <div className="text-xs text-neutral-700">{colorName}</div>
    <div className="text-xs text-neutral-500">{hexValue}</div>
  </div>
);

interface ColorCategoryProps {
  categoryName: string;
  colorShades: Record<string, string>;
}

const ColorCategory: React.FC<ColorCategoryProps> = ({ categoryName, colorShades }) => (
  <div className="mb-8 p-4 border border-neutral-200 rounded-lg bg-white">
    <h3 className="text-xl font-medium text-neutral-700 mb-4 capitalize">{categoryName}</h3>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {Object.entries(colorShades).map(([shade, hex]) => (
        <ColorSwatch key={`${categoryName}-${shade}`} colorName={`${categoryName}-${shade}`} hexValue={hex} />
      ))}
    </div>
  </div>
);

export function ColorTokensShowcase() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-800">Reusable Color Tokens</h2>
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
      
      <ColorCategory categoryName="Primary" colorShades={colors.primary} />
      <ColorCategory categoryName="Neutral" colorShades={colors.neutral} />
      <ColorCategory categoryName="DataViz" colorShades={colors.dataViz} />
      <ColorCategory categoryName="Success" colorShades={colors.success} />
      <ColorCategory categoryName="Warning" colorShades={colors.warning} />
      <ColorCategory categoryName="Error" colorShades={colors.error} />
    </div>
  );
} 