import React from 'react';
import { colors as colorTokenObject } from '@/app/components/design-system/tokens/colors';

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
      
      <ColorCategory categoryName="Primary" colorShades={colors.primary} />
      <ColorCategory categoryName="Neutral" colorShades={colors.neutral} />
      <ColorCategory categoryName="DataViz" colorShades={colors.dataViz} />
      <ColorCategory categoryName="Success" colorShades={colors.success} />
      <ColorCategory categoryName="Warning" colorShades={colors.warning} />
      <ColorCategory categoryName="Error" colorShades={colors.error} />
    </div>
  );
} 