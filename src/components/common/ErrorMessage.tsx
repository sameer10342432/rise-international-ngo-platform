import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'An error occurred',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      role="alert"
      className={`p-6 rounded-2xl bg-error-container/40 border border-error/30 text-on-surface flex flex-col items-center text-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-error/15 text-error flex items-center justify-center mb-3">
        <span className="material-symbols-outlined text-[28px]">error</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary mb-1">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-label-md text-label-md hover:bg-primary/90 transition-all inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
