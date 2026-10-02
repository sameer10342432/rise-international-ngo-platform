import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbCrumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbCrumb[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm text-on-surface-variant ${className}`}
    >
      <Link
        to="/"
        className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span className="material-symbols-outlined text-[16px] text-outline-variant">
              chevron_right
            </span>
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-semibold truncate max-w-xs" aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
