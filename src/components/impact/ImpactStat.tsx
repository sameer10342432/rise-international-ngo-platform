import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

interface ImpactStatProps {
  numericValue: number;
  suffix?: string;
  prefix?: string;
  fallbackValue?: string;
  title: string;
  description: string;
}

export const ImpactStat: React.FC<ImpactStatProps> = ({
  numericValue,
  suffix = '+',
  prefix = '',
  fallbackValue,
  title,
  description,
}) => {
  const animatedValue = useCountUp(numericValue, 1600);
  const displayVal = fallbackValue && animatedValue === 0
    ? fallbackValue
    : `${prefix}${animatedValue.toLocaleString()}${suffix}`;

  return (
    <div className="p-6 rounded-2xl bg-surface-container-lowest/5 backdrop-blur-md border border-white/10 hover:bg-surface-container-lowest/10 transition-colors">
      <span className="font-stat-metric text-3xl sm:text-4xl text-secondary-fixed font-bold leading-none block">
        {displayVal}
      </span>
      <h4 className="font-headline-sm text-lg sm:text-headline-sm text-white mt-2 font-bold">
        {title}
      </h4>
      <p className="font-body-sm text-body-sm text-surface-container-high/70 mt-1 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
