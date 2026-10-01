import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string | null;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  required,
  helpText,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="font-label-md text-label-md text-primary flex items-center justify-between">
        <span>
          {label}
          {required && <span className="text-secondary ml-1" aria-hidden="true">*</span>}
        </span>
      </label>
      {children}
      {helpText && !error && (
        <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">{helpText}</span>
      )}
      {error && (
        <span id={`${id}-error`} role="alert" className="font-body-sm text-body-sm text-error text-xs flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};
