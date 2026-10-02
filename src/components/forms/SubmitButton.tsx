import React from 'react';

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'dark';
  icon?: string;
  text?: string;
  children?: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading = false,
  loading = false,
  loadingText = 'Submitting...',
  variant = 'secondary',
  icon,
  text,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const effectiveLoading = isLoading || loading;
  const content = children || text || 'Submit';

  const variantStyles = {
    secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-md',
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-md',
    dark: 'bg-primary-container text-white hover:bg-primary-container/90',
  };

  return (
    <button
      type="submit"
      disabled={effectiveLoading || disabled}
      aria-busy={effectiveLoading ? 'true' : undefined}
      className={`px-8 py-4 rounded-xl font-label-lg text-label-lg transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {effectiveLoading ? (
        <>
          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined text-[20px]">{icon}</span>}
          <span>{content}</span>
        </>
      )}
    </button>
  );
};
