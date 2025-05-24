// src/app/components/shared/ComingSoon.tsx

import React from 'react';

interface ComingSoonProps {
  header?: string;
  message?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  header = "Coming Soon", 
  message = "This feature is currently under development."
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <div className="w-24 h-24 mb-8 rounded-full bg-primary-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold mb-2 text-neutral-800">{header}</h2>
      <p className="text-neutral-600 max-w-lg mb-8">{message}</p>
      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
        Return to Dashboard
      </button>
    </div>
  );
};

export default ComingSoon;
