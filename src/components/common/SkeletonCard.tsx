import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm animate-pulse border border-outline-variant/30 flex flex-col">
      <div className="h-56 bg-surface-container-high w-full" />
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="h-4 bg-surface-container-high rounded w-1/4 mb-3" />
          <div className="h-6 bg-surface-container-high rounded w-3/4 mb-3" />
          <div className="space-y-2">
            <div className="h-4 bg-surface-container-high rounded w-full" />
            <div className="h-4 bg-surface-container-high rounded w-5/6" />
          </div>
        </div>
        <div className="h-5 bg-surface-container-high rounded w-1/3 mt-2" />
      </div>
    </div>
  );
};
