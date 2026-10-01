import React from 'react';
import { DonationFrequency } from '../../types';

interface DonationFrequencySelectorProps {
  frequency: DonationFrequency;
  onChange: (freq: DonationFrequency) => void;
}

export const DonationFrequencySelector: React.FC<DonationFrequencySelectorProps> = ({
  frequency,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="inline-flex p-1.5 rounded-full bg-surface-container-low border border-outline-variant/30" role="group" aria-label="Donation frequency">
        <button
          type="button"
          onClick={() => onChange('once')}
          className={`px-8 py-2.5 rounded-full font-label-md text-label-md transition-all ${
            frequency === 'once'
              ? 'bg-secondary text-white shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
          aria-pressed={frequency === 'once'}
        >
          One-Time
        </button>
        <button
          type="button"
          onClick={() => onChange('monthly')}
          className={`px-8 py-2.5 rounded-full font-label-md text-label-md transition-all ${
            frequency === 'monthly'
              ? 'bg-secondary text-white shadow-sm font-bold'
              : 'text-on-surface-variant hover:text-on-surface font-medium'
          }`}
          aria-pressed={frequency === 'monthly'}
        >
          Monthly
        </button>
      </div>
    </div>
  );
};
