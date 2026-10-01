import React from 'react';
import { primaryImpactStats } from '../../data/impactStats';
import { StatisticCard } from './StatisticCard';

export const ImpactStatsBar: React.FC = () => {
  return (
    <section className="relative z-20 max-w-content mx-auto px-6 lg:px-12 -mt-14 w-full">
      <div className="bg-surface-container-lowest rounded-2xl shadow-level-2 border border-outline-variant/30 p-6 lg:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {primaryImpactStats.map((stat, idx) => (
            <div
              key={stat.id}
              className={idx === primaryImpactStats.length - 1 ? 'col-span-2 md:col-span-1' : ''}
            >
              <StatisticCard
                numericValue={stat.numericValue}
                suffix={stat.suffix}
                prefix={stat.prefix}
                fallbackValue={stat.value}
                label={stat.label}
                icon={stat.icon}
                description={stat.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
