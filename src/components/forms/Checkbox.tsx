import React, { forwardRef } from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, id, error, ...props }, ref) => {
    return (
      <label htmlFor={id} className="inline-flex items-start gap-3 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`mt-1 w-5 h-5 rounded border ${
            error ? 'border-error' : 'border-outline-variant'
          } text-secondary focus:ring-secondary/30 transition-all cursor-pointer ${className}`}
          {...props}
        />
        <span className="font-body-md text-body-sm sm:text-body-md text-on-surface select-none group-hover:text-primary transition-colors">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
