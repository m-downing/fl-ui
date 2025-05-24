import React from 'react';
import { 
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  Button,
  SelectChangeEvent
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface FilterBarProps {
  timeRange: string;
  region: string;
  priority: string;
  onTimeRangeChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onMoreFiltersClick?: () => void;
  showMoreFilters?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  timeRange,
  region,
  priority,
  onTimeRangeChange,
  onRegionChange,
  onPriorityChange,
  showMoreFilters = true,
}) => {
  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    onTimeRangeChange(event.target.value as string);
  };

  const handleRegionChange = (event: SelectChangeEvent) => {
    onRegionChange(event.target.value as string);
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    onPriorityChange(event.target.value as string);
  };

  return (
    <div className="flex items-center space-x-3">
      <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
        <InputLabel>Time Range</InputLabel>
        <MuiSelect
          value={timeRange}
          onChange={handleTimeRangeChange}
          label="Time Range"
        >
          <MenuItem value="select">Select</MenuItem>
          <MenuItem value="30days">Last 30 Days</MenuItem>
          <MenuItem value="3months">Last 3 Months</MenuItem>
          <MenuItem value="6months">Last 6 Months</MenuItem>
          <MenuItem value="1year">Last Year</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </MuiSelect>
      </FormControl>
      
      <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
        <InputLabel>Region</InputLabel>
        <MuiSelect
          value={region}
          onChange={handleRegionChange}
          label="Region"
        >
          <MenuItem value="all">All Regions</MenuItem>
          <MenuItem value="nam">North America</MenuItem>
          <MenuItem value="emea">EMEA</MenuItem>
          <MenuItem value="apac">APAC</MenuItem>
          <MenuItem value="latam">LATAM</MenuItem>
        </MuiSelect>
      </FormControl>

      <FormControl variant="outlined" size="small" style={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <MuiSelect
          value={priority}
          onChange={handlePriorityChange}
          label="Priority"
        >
          <MenuItem value="all">All Priorities</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </MuiSelect>
      </FormControl>
      
      {showMoreFilters && (
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          size="medium"
        >
          More Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar; 