import React, { SelectHTMLAttributes, forwardRef } from 'react';

/**
 * Option item for Select component
 */
export interface SelectOption {
  /** Option value */
  value: string;
  /** Option display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

/**
 * Select sizes
 */
type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Select component props
 * @interface SelectProps
 * @extends {Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>}
 */
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select options array */
  options: SelectOption[];
  /** Select label */
  label?: string;
  /** Helper text to display below the select */
  helperText?: string;
  /** Error message to display below the select */
  error?: string;
  /** Select size */
  size?: SelectSize;
  /** Additional class names to apply to the select container */
  containerClassName?: string;
  /** Additional class names to apply to the select element */
  className?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Whether the select should fill its container */
  fullWidth?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      helperText,
      error,
      size = 'md',
      containerClassName = '',
      className = '',
      placeholder,
      fullWidth = false,
      disabled = false,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a random id if not provided
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
    // Container classes
    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;
    
    // Select size classes
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
    };
    
    // Select base classes
    const baseClasses = `
      block
      w-full
      appearance-none
      rounded-sm
      border
      border-neutral-300
      bg-white
      px-3
      pr-8
      focus:border-primary-600
      focus:outline-none
      focus:ring-2
      focus:ring-primary-600
      focus:ring-opacity-30
      disabled:bg-neutral-100
      disabled:text-neutral-500
      disabled:cursor-not-allowed
    `;
    
    // Error state classes
    const errorClasses = error
      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
      : '';
    
    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-neutral-900"
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        
        {/* Select wrapper with custom dropdown icon */}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            className={`
              ${baseClasses}
              ${sizeClasses[size]}
              ${errorClasses}
              ${className}
            `}
            required={required}
            {...props}
          >
            {/* Optional placeholder */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            
            {/* Render all options */}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <div
            id={error ? `${selectId}-error` : `${selectId}-helper`}
            className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-neutral-500'}`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 