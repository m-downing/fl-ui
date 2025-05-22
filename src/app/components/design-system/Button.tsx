import React, { ButtonHTMLAttributes } from 'react';

/**
 * Button variants
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button sizes
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 * @interface ButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant (appearance) */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Additional class names to apply */
  className?: string;
  /** Button content */
  children: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Show loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Icon to show before text */
  leftIcon?: React.ReactNode;
  /** Icon to show after text */
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Common classes for all button variants
  const baseClasses = 
    'inline-flex items-center justify-center font-medium transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm ',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-neutral-50 shadow-sm',
    secondary: 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'text-primary-600 hover:bg-primary-50',
    danger: 'bg-error-500 hover:bg-error-700 text-neutral-50',
  };
  
  // Loading styles
  const loadingClasses = isLoading 
    ? 'cursor-wait opacity-80' 
    : '';
  
  // Disabled styles
  const disabledClasses = disabled
    ? 'opacity-60 cursor-not-allowed pointer-events-none'
    : '';
  
  // Full width styles
  const widthClasses = fullWidth
    ? 'w-full'
    : '';
  
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${loadingClasses}
        ${disabledClasses}
        ${widthClasses}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button; 