import React from 'react';
import Button from './Button';
import Select from './Select';

interface FilterBarProps {
  timeRange: string;
  region: string;
  onTimeRangeChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onMoreFiltersClick?: () => void;
  timeRangeOptions?: Array<{ value: string; label: string }>;
  regionOptions?: Array<{ value: string; label: string }>;
  showMoreFilters?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  timeRange,
  region,
  onTimeRangeChange,
  onRegionChange,
  onMoreFiltersClick = () => {},
  timeRangeOptions = [
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' },
  ],
  regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'nam', label: 'North America' },
    { value: 'emea', label: 'EMEA' },
    { value: 'apac', label: 'APAC' },
    { value: 'latam', label: 'LATAM' },
  ],
  showMoreFilters = true,
}) => {
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTimeRangeChange(event.target.value);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRegionChange(event.target.value);
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="w-40">
        <div className="relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <Select
            label="Time Range"
            value={timeRange}
            onChange={handleTimeRangeChange}
            options={timeRangeOptions.map(option => ({
              value: option.value,
              label: option.label
            }))}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="w-36">
        <Select
          label="Region"
          value={region}
          onChange={handleRegionChange}
          options={regionOptions.map(option => ({
            value: option.value,
            label: option.label
          }))}
        />
      </div>
      
      {showMoreFilters && (
        <Button
          variant="outline"
          size="md"
          onClick={onMoreFiltersClick}
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            More Filters
          </span>
        </Button>
      )}
    </div>
  );
};

export default FilterBar; 