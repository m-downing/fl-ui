import React, { useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal sizes
 */
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal component props
 * @interface ModalProps
 */
interface ModalProps {
  /** Modal title */
  title?: ReactNode;
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Modal content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Modal size */
  size?: ModalSize;
  /** Whether to center modal content vertically */
  centered?: boolean;
  /** Additional class for modal content */
  contentClassName?: string;
  /** Modal description for screen readers */
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
  centered = false,
  contentClassName = '',
  description,
}) => {
  // Handle escape key press
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Set up event listeners
  useEffect(() => {
    if (isOpen) {
      // Add escape key listener
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Focus trap inside modal
      const previousActiveElement = document.activeElement as HTMLElement;
      
      return () => {
        // Cleanup event listeners
        document.removeEventListener('keydown', handleEscapeKey);
        // Restore body scrolling
        document.body.style.overflow = '';
        // Restore focus
        if (previousActiveElement) {
          previousActiveElement.focus();
        }
      };
    }
  }, [isOpen, handleEscapeKey]);
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };
  
  // Don't render anything if not open
  if (!isOpen) return null;
  
  // Use portal to render modal at the end of the document body
  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex overflow-y-auto"
      style={{ alignItems: centered ? 'center' : 'flex-start' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />
      
      {/* Modal panel */}
      <div 
        className={`
          relative
          mx-auto
          my-8
          w-full
          rounded-md
          bg-white
          shadow-xl
          transition-all
          ${sizeClasses[size]}
          ${contentClassName}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-600"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Modal header */}
        {title && (
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 id="modal-title" className="text-lg font-medium text-neutral-900">
              {title}
            </h3>
            {description && (
              <p id="modal-description" className="mt-1 text-sm text-neutral-500">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Modal body */}
        <div className={`px-6 py-4 ${!title ? 'pt-8' : ''} ${!footer ? 'pb-6' : ''}`}>
          {children}
        </div>
        
        {/* Modal footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-md">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal; 