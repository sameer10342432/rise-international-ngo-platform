import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

interface StatisticCardProps {
  numericValue: number;
  suffix?: string;
  prefix?: string;
  fallbackValue?: string;
  label: string;
  icon: string;
  description?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  numericValue,
  suffix = '+',
  prefix = '',
  fallbackValue,
  label,
  icon,
}) => {
  const animatedValue = useCountUp(numericValue, 1600);

  // Formatted count display
  const displayVal = fallbackValue && animatedValue === 0
    ? fallbackValue
    : `${prefix}${animatedValue.toLocaleString()}${suffix}`;

  return (
    <div className="flex flex-col items-center text-center px-3 py-2">
      <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary mb-3 border border-outline-variant/30">
        <span className="material-symbols-outlined text-[26px]">{icon}</span>
      </div>
      <span className="font-stat-metric text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-primary leading-tight">
        {displayVal}
      </span>
      <span className="font-label-md text-label-md text-on-surface-variant mt-1 font-semibold">
        {label}
      </span>
    </div>
  );
};
