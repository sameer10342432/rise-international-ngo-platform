import React from 'react';
import { DonationFrequency } from '../../types';

interface DonationSummaryProps {
  amount: number;
  frequency: DonationFrequency;
  purpose: string;
}

export const DonationSummary: React.FC<DonationSummaryProps> = ({
  amount,
  frequency,
  purpose,
}) => {
  return (
    <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <span className="font-body-sm text-body-sm text-on-surface-variant text-xs block">
          Donation Summary
        </span>
        <span className="font-headline-sm text-lg text-primary font-bold">
          ${amount} {frequency === 'monthly' ? '/ month' : 'one-time'}
        </span>
      </div>
      <div className="sm:text-right">
        <span className="font-body-sm text-body-sm text-on-surface-variant text-xs block">
          Designated Purpose
        </span>
        <span className="font-label-md text-label-md text-secondary font-bold">
          {purpose}
        </span>
      </div>
    </div>
  );
};
