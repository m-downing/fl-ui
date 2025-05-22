import React from 'react';
import Card from '@/app/components/design-system/Card'; // Corrected import path

type ShowcaseItem =
  | 'colors'
  | 'buttons'
  | 'charts'
  | 'tables'
  | 'badges'
  | 'modals'
  | 'tooltips'
  | 'inputs'
  | 'typography'
  | 'shadows';

interface ShowcaseMenuProps {
  active: ShowcaseItem | undefined;
  onSelect: (item: ShowcaseItem) => void;
}

const menuItems: { id: ShowcaseItem; label: string }[] = [
  { id: 'colors', label: 'Color Tokens' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'charts', label: 'Charts' },
  { id: 'tables', label: 'Tables' },
  { id: 'badges', label: 'Badges' },
  { id: 'modals', label: 'Modals' },
  { id: 'tooltips', label: 'Tooltips' },
  { id: 'inputs', label: 'Inputs & Selects' },
  { id: 'typography', label: 'Typography' },
  { id: 'shadows', label: 'Shadows' },
];

export function ShowcaseMenu({ active, onSelect }: ShowcaseMenuProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="cursor-pointer"
        >
          <Card
            hoverable // Use the existing hoverable prop for cursor indication
            className={`h-full flex flex-col justify-center items-center text-center ${
              active === item.id
                ? 'ring-2 ring-primary-500 border-primary-500 bg-primary-50' // Example selection style
                : 'border-neutral-200 bg-white hover:bg-neutral-100'
            }`}
            padded={true} // Ensure padding is consistent
          >
            <span className="text-base font-medium">{item.label}</span>
          </Card>
        </div>
      ))}
    </div>
  );
} 