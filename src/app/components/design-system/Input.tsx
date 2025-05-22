import React, { InputHTMLAttributes, forwardRef } from 'react';

/**
 * Input sizes
 */
type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input props
 * @interface InputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>}
 */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display below the input */
  error?: string;
  /** Input size */
  size?: InputSize;
  /** Left icon or element */
  leftElement?: React.ReactNode;
  /** Right icon or element */
  rightElement?: React.ReactNode;
  /** Additional class names to apply to the input container */
  containerClassName?: string;
  /** Additional class names to apply to the input element */
  className?: string;
  /** Whether the input should fill its container */
  fullWidth?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      leftElement,
      rightElement,
      containerClassName = '',
      className = '',
      fullWidth = false,
      disabled = false,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    // Generate a random id if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // Container classes
    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      ${containerClassName}
    `;
    
    // Input size classes
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
    };
    
    // Input base classes
    const baseClasses = `
      block
      w-full
      rounded-sm
      border
      border-neutral-300
      bg-white
      px-3
      placeholder-neutral-400
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
    
    // Left/right element padding adjustment
    const leftPadding = leftElement ? 'pl-9' : '';
    const rightPadding = rightElement ? 'pr-9' : '';
    
    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-neutral-900"
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        
        {/* Input wrapper with relative positioning for icons */}
        <div className="relative">
          {/* Left element or icon */}
          {leftElement && (
            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
              {leftElement}
            </div>
          )}
          
          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              ${baseClasses}
              ${sizeClasses[size]}
              ${leftPadding}
              ${rightPadding}
              ${errorClasses}
              ${className}
            `}
            required={required}
            {...props}
          />
          
          {/* Right element or icon */}
          {rightElement && (
            <div className="absolute right-0 inset-y-0 flex items-center pr-3 pointer-events-none">
              {rightElement}
            </div>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <div
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={`mt-1 text-sm ${error ? 'text-error-500' : 'text-neutral-500'}`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 