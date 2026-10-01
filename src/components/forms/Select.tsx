import React, { forwardRef } from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options?: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, options, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          className={`w-full h-12 px-4 pr-10 rounded-xl bg-surface border appearance-none ${
            error
              ? 'border-error ring-1 ring-error/30'
              : 'border-outline-variant/60 focus:border-secondary focus:ring-2 focus:ring-secondary/20'
          } text-primary font-body-md text-body-md transition-all cursor-pointer disabled:bg-surface-container-high/40 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[20px] text-on-surface-variant">
          expand_more
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';
