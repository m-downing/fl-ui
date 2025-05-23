import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

// Define the DetailLevel type to match DataTable
type DetailLevel = 'summary' | 'drilldown' | 'deepDive';

export interface TableToggleProps {
  mode: DetailLevel;
  onChange: (mode: DetailLevel) => void;
  showDeepDive?: boolean;
  className?: string;
}

export const TableToggle: React.FC<TableToggleProps> = ({
  mode,
  onChange,
  showDeepDive = false,
  className,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={clsx('flex items-center', className)}>
      {/* Toggle buttons for Summary and Drill Down */}
      <div className="flex rounded-md overflow-hidden border border-gray-300">
        <button
          className={clsx(
            'px-4 py-2 text-sm font-medium',
            mode === 'summary'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          )}
          onClick={() => onChange('summary')}
        >
          Summary
        </button>
        <button
          className={clsx(
            'px-4 py-2 text-sm font-medium border-l border-gray-300',
            mode === 'drilldown'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          )}
          onClick={() => onChange('drilldown')}
        >
          Drill Down
        </button>
      </div>

      {/* Optional Deep Dive button with rocket icon */}
      {showDeepDive && (
        <button
          className={clsx(
            'ml-2 p-2 rounded-md',
            mode === 'deepDive' ? 'bg-blue-100' : 'bg-transparent'
          )}
          onClick={() => onChange('deepDive')}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          title="Deep Dive"
        >
          <Image
            src={isHovering ? '/icons/ui/rocket-hover.svg' : '/icons/ui/rocket.svg'}
            width={28}
            height={28}
            alt="Deep Dive"
          />
        </button>
      )}
    </div>
  );
};

export default TableToggle;
