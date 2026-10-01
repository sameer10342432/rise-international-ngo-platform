import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  label = 'Loading...',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`} role="status">
      <div
        className={`${sizeMap[size]} border-surface-container-high border-t-secondary rounded-full animate-spin`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
      {label && <p className="mt-3 text-sm text-on-surface-variant font-medium">{label}</p>}
    </div>
  );
};
