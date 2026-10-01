import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  actionText,
  actionHref,
  className = '',
}) => {
  return (
    <div className={`p-10 rounded-2xl bg-surface-container-low text-center flex flex-col items-center max-w-md mx-auto my-8 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
        <span className="material-symbols-outlined text-[36px]">{icon}</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-6">{description}</p>
      {actionText && actionHref && (
        <Link
          to={actionHref}
          className="px-6 py-3 rounded-xl bg-secondary text-white font-label-md text-label-md hover:bg-secondary/90 transition-all shadow-sm"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};
