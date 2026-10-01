import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error ? 'true' : undefined}
        className={`w-full h-12 px-4 rounded-xl bg-surface border ${
          error
            ? 'border-error ring-1 ring-error/30'
            : 'border-outline-variant/60 focus:border-secondary focus:ring-2 focus:ring-secondary/20'
        } text-primary font-body-md text-body-md transition-all placeholder:text-on-surface-variant/60 disabled:bg-surface-container-high/40 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
