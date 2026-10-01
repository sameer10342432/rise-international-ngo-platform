import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={error ? 'true' : undefined}
        className={`w-full p-4 rounded-xl bg-surface border ${
          error
            ? 'border-error ring-1 ring-error/30'
            : 'border-outline-variant/60 focus:border-secondary focus:ring-2 focus:ring-secondary/20'
        } text-primary font-body-md text-body-md transition-all placeholder:text-on-surface-variant/60 disabled:bg-surface-container-high/40 disabled:cursor-not-allowed resize-y ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
